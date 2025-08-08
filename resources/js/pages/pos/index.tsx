import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    code: string;
    name: string;
    selling_price: number;
    stock_quantity: number;
    unit: string;
    category: {
        name: string;
    };
}

interface CartItem {
    product_id: number;
    name: string;
    price: number;
    quantity: number;
    discount: number;
    subtotal: number;
}

interface Props {
    products: Product[];
    [key: string]: unknown;
}

export default function POSIndex({ products }: Props) {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [customerName, setCustomerName] = useState('');
    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'transfer' | 'qris'>('cash');
    const [amountPaid, setAmountPaid] = useState<number>(0);
    const [discountAmount, setDiscountAmount] = useState<number>(0);

    const { setData, post, processing, reset } = useForm();

    // Filter products based on search and category
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            product.code.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || product.category.name === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Get unique categories
    const categories = Array.from(new Set(products.map(p => p.category.name)));

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + item.subtotal, 0);
    const finalTotal = subtotal - discountAmount;
    const changeAmount = Math.max(0, amountPaid - finalTotal);

    const addToCart = (product: Product) => {
        const existingItem = cart.find(item => item.product_id === product.id);
        
        if (existingItem) {
            if (existingItem.quantity < product.stock_quantity) {
                updateCartItem(product.id, existingItem.quantity + 1);
            }
        } else {
            const newItem: CartItem = {
                product_id: product.id,
                name: product.name,
                price: product.selling_price,
                quantity: 1,
                discount: 0,
                subtotal: product.selling_price,
            };
            setCart([...cart, newItem]);
        }
    };

    const updateCartItem = (productId: number, quantity: number, discount: number = 0) => {
        setCart(cart.map(item => 
            item.product_id === productId
                ? { ...item, quantity, discount, subtotal: quantity * (item.price - discount) }
                : item
        ));
    };

    const removeFromCart = (productId: number) => {
        setCart(cart.filter(item => item.product_id !== productId));
    };

    const clearCart = () => {
        setCart([]);
        setCustomerName('');
        setAmountPaid(0);
        setDiscountAmount(0);
        reset();
    };

    const processSale = () => {
        setData({
            items: cart.map(item => ({
                product_id: item.product_id,
                quantity: item.quantity,
                price: item.price,
                discount: item.discount,
            })),
            customer_name: customerName,
            payment_method: paymentMethod,
            amount_paid: amountPaid,
            discount_amount: discountAmount,
        });

        post(route('pos.store'));
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <AppShell>
            <Head title="Point of Sale (POS)" />
            
            <div className="space-y-6">
                <Heading title="🛒 Point of Sale (POS)" />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Products Panel */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Search and Filter */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                            <div className="flex gap-4 mb-4">
                                <input
                                    type="text"
                                    placeholder="Cari produk atau kode..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                >
                                    <option value="all">Semua Kategori</option>
                                    {categories.map(category => (
                                        <option key={category} value={category}>
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Products Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                            {filteredProducts.map(product => (
                                <div
                                    key={product.id}
                                    onClick={() => addToCart(product)}
                                    className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 cursor-pointer hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                                >
                                    <div className="text-center">
                                        <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto mb-3 flex items-center justify-center">
                                            <span className="text-2xl">📦</span>
                                        </div>
                                        <h3 className="font-medium text-gray-900 dark:text-white text-sm mb-1 line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                            {product.code}
                                        </p>
                                        <p className="font-bold text-blue-600 dark:text-blue-400 mb-1">
                                            {formatCurrency(product.selling_price)}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                            Stok: {product.stock_quantity} {product.unit}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cart and Checkout Panel */}
                    <div className="space-y-4">
                        {/* Cart */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    Keranjang Belanja
                                </h3>
                            </div>
                            <div className="p-4 max-h-96 overflow-y-auto">
                                {cart.length === 0 ? (
                                    <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                                        Keranjang kosong
                                    </p>
                                ) : (
                                    <div className="space-y-3">
                                        {cart.map(item => (
                                            <div key={item.product_id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <div className="flex-1">
                                                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                                                        {item.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        {formatCurrency(item.price)}
                                                    </p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <button
                                                        onClick={() => updateCartItem(item.product_id, Math.max(1, item.quantity - 1), item.discount)}
                                                        className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="w-8 text-center text-sm font-medium text-gray-900 dark:text-white">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateCartItem(item.product_id, item.quantity + 1, item.discount)}
                                                        className="w-6 h-6 rounded bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500"
                                                    >
                                                        +
                                                    </button>
                                                    <button
                                                        onClick={() => removeFromCart(item.product_id)}
                                                        className="w-6 h-6 rounded bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/40"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Checkout Form */}
                        {cart.length > 0 && (
                            <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        Checkout
                                    </h3>
                                </div>
                                <div className="p-4 space-y-4">
                                    {/* Customer Name */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Nama Pelanggan (Opsional)
                                        </label>
                                        <input
                                            type="text"
                                            value={customerName}
                                            onChange={(e) => setCustomerName(e.target.value)}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        />
                                    </div>

                                    {/* Payment Method */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Metode Pembayaran
                                        </label>
                                        <select
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value as 'cash' | 'card' | 'transfer' | 'qris')}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                        >
                                            <option value="cash">Tunai</option>
                                            <option value="card">Kartu</option>
                                            <option value="transfer">Transfer</option>
                                            <option value="qris">QRIS</option>
                                        </select>
                                    </div>

                                    {/* Discount */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Diskon
                                        </label>
                                        <input
                                            type="number"
                                            value={discountAmount}
                                            onChange={(e) => setDiscountAmount(Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            min="0"
                                            max={subtotal}
                                        />
                                    </div>

                                    {/* Amount Paid */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Jumlah Dibayar
                                        </label>
                                        <input
                                            type="number"
                                            value={amountPaid}
                                            onChange={(e) => setAmountPaid(Number(e.target.value))}
                                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                            min={finalTotal}
                                        />
                                    </div>

                                    {/* Summary */}
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                                            <span className="text-gray-900 dark:text-white">{formatCurrency(subtotal)}</span>
                                        </div>
                                        {discountAmount > 0 && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">Diskon:</span>
                                                <span className="text-red-600 dark:text-red-400">-{formatCurrency(discountAmount)}</span>
                                            </div>
                                        )}
                                        <div className="flex justify-between font-bold text-lg">
                                            <span className="text-gray-900 dark:text-white">Total:</span>
                                            <span className="text-gray-900 dark:text-white">{formatCurrency(finalTotal)}</span>
                                        </div>
                                        {amountPaid >= finalTotal && (
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-600 dark:text-gray-400">Kembalian:</span>
                                                <span className="text-green-600 dark:text-green-400">{formatCurrency(changeAmount)}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex space-x-2">
                                        <Button
                                            onClick={clearCart}
                                            variant="outline"
                                            className="flex-1"
                                        >
                                            Clear
                                        </Button>
                                        <Button
                                            onClick={processSale}
                                            disabled={processing || amountPaid < finalTotal}
                                            className="flex-1"
                                        >
                                            {processing ? 'Memproses...' : 'Bayar'}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppShell>
    );
}