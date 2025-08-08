<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use App\Models\StockMovement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class POSController extends Controller
{
    /**
     * Display the POS interface.
     */
    public function index()
    {
        $products = Product::with('category')
            ->active()
            ->where('stock_quantity', '>', 0)
            ->get();

        return Inertia::render('pos/index', [
            'products' => $products,
        ]);
    }

    /**
     * Process a sale transaction.
     */
    public function store(Request $request)
    {
        $request->validate([
            'items' => 'required|array|min:1',
            'items.*.product_id' => 'required|exists:products,id',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'items.*.discount' => 'nullable|numeric|min:0',
            'customer_name' => 'nullable|string|max:255',
            'payment_method' => 'required|in:cash,card,transfer,qris',
            'amount_paid' => 'required|numeric|min:0',
            'discount_amount' => 'nullable|numeric|min:0',
        ]);

        return DB::transaction(function () use ($request) {
            $items = $request->input('items');
            $subtotal = 0;
            $saleItems = [];

            // Validate stock availability and calculate subtotal
            foreach ($items as $item) {
                $product = Product::findOrFail($item['product_id']);
                
                if ($product->stock_quantity < $item['quantity']) {
                    throw new \Exception("Insufficient stock for product: {$product->name}");
                }

                $itemSubtotal = $item['quantity'] * ($item['price'] - ($item['discount'] ?? 0));
                $subtotal += $itemSubtotal;

                $saleItems[] = [
                    'product' => $product,
                    'quantity' => $item['quantity'],
                    'price' => $item['price'],
                    'discount' => $item['discount'] ?? 0,
                    'subtotal' => $itemSubtotal,
                ];
            }

            $discountAmount = $request->input('discount_amount', 0);
            $taxAmount = ($subtotal - $discountAmount) * 0.11; // 11% PPN
            $totalAmount = $subtotal - $discountAmount + $taxAmount;
            $amountPaid = $request->input('amount_paid');
            $changeAmount = $amountPaid - $totalAmount;

            if ($amountPaid < $totalAmount) {
                throw new \Exception('Amount paid is insufficient.');
            }

            // Generate invoice number
            $invoiceNumber = 'INV-' . date('Ymd') . '-' . str_pad(
                (string)(Sale::whereDate('created_at', today())->count() + 1),
                4,
                '0',
                STR_PAD_LEFT
            );

            // Create sale record
            $sale = Sale::create([
                'invoice_number' => $invoiceNumber,
                'cashier_id' => auth()->id(),
                'customer_name' => $request->input('customer_name'),
                'subtotal' => $subtotal,
                'discount_amount' => $discountAmount,
                'tax_amount' => $taxAmount,
                'total_amount' => $totalAmount,
                'payment_method' => $request->input('payment_method'),
                'amount_paid' => $amountPaid,
                'change_amount' => $changeAmount,
                'status' => 'completed',
            ]);

            // Create sale items and update stock
            foreach ($saleItems as $saleItem) {
                $product = $saleItem['product'];

                // Create sale item
                SaleItem::create([
                    'sale_id' => $sale->id,
                    'product_id' => $product->id,
                    'product_name' => $product->name,
                    'price' => $saleItem['price'],
                    'quantity' => $saleItem['quantity'],
                    'discount_amount' => $saleItem['discount'],
                    'subtotal' => $saleItem['subtotal'],
                ]);

                // Update product stock
                $stockBefore = $product->stock_quantity;
                $stockAfter = $stockBefore - $saleItem['quantity'];
                
                $product->update(['stock_quantity' => $stockAfter]);

                // Create stock movement record
                StockMovement::create([
                    'product_id' => $product->id,
                    'user_id' => auth()->id(),
                    'type' => 'out',
                    'quantity' => $saleItem['quantity'],
                    'stock_before' => $stockBefore,
                    'stock_after' => $stockAfter,
                    'notes' => 'Sale transaction',
                    'reference' => $sale->invoice_number,
                ]);
            }

            return Inertia::render('pos/receipt', [
                'sale' => $sale->load('items'),
                'success' => 'Sale completed successfully!',
            ]);
        });
    }


}