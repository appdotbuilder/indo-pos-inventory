<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Sale;
use App\Models\StockMovement;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Display the dashboard.
     */
    public function index()
    {
        $user = auth()->user();
        
        // Get dashboard statistics
        $stats = [
            'total_products' => Product::active()->count(),
            'low_stock_products' => Product::active()->lowStock()->count(),
            'total_categories' => Category::active()->count(),
            'today_sales' => Sale::whereDate('created_at', Carbon::today())->sum('total_amount'),
            'this_month_sales' => Sale::whereMonth('created_at', Carbon::now()->month)
                                    ->whereYear('created_at', Carbon::now()->year)
                                    ->sum('total_amount'),
            'total_sales_count' => Sale::whereDate('created_at', Carbon::today())->count(),
        ];

        // Get recent activities based on user role
        $recentActivities = [];
        
        if ($user->hasAnyRole(['shop_owner', 'warehouse_manager'])) {
            $recentActivities['stock_movements'] = StockMovement::with(['product', 'user'])
                ->latest()
                ->take(5)
                ->get();
        }

        if ($user->hasAnyRole(['shop_owner', 'cashier'])) {
            $recentActivities['recent_sales'] = Sale::with(['cashier', 'items'])
                ->latest()
                ->take(5)
                ->get();
        }

        // Get low stock alerts for warehouse managers and shop owners
        $lowStockProducts = [];
        if ($user->hasAnyRole(['shop_owner', 'warehouse_manager'])) {
            $lowStockProducts = Product::with('category')
                ->active()
                ->lowStock()
                ->orderBy('stock_quantity')
                ->take(10)
                ->get();
        }

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recentActivities' => $recentActivities,
            'lowStockProducts' => $lowStockProducts,
            'userRole' => $user->roles->first()->name ?? null,
        ]);
    }
}