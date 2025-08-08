import React from 'react';
import { Head } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';

interface DashboardStats {
    total_products: number;
    low_stock_products: number;
    total_categories: number;
    today_sales: number;
    this_month_sales: number;
    total_sales_count: number;
}

interface StockMovement {
    id: number;
    type: string;
    quantity: number;
    notes?: string;
    created_at: string;
    product: {
        name: string;
        code: string;
    };
    user: {
        name: string;
    };
}

interface Sale {
    id: number;
    invoice_number: string;
    total_amount: number;
    payment_method: string;
    created_at: string;
    cashier: {
        name: string;
    };
    items: Array<{
        quantity: number;
        product_name: string;
    }>;
}

interface LowStockProduct {
    id: number;
    name: string;
    code: string;
    stock_quantity: number;
    min_stock_level: number;
    category: {
        name: string;
    };
}

interface Props {
    stats: DashboardStats;
    recentActivities: {
        stock_movements?: StockMovement[];
        recent_sales?: Sale[];
    };
    lowStockProducts: LowStockProduct[];
    userRole: string | null;
    [key: string]: unknown;
}

export default function Dashboard({ stats, recentActivities, lowStockProducts, userRole }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppShell>
            <Head title="Dashboard" />
            
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <Heading title="📊 Dashboard UMKM" />
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Role: <span className="capitalize font-medium">{userRole?.replace('_', ' ')}</span>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Total Produk</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {stats.total_products}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📦</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Stok Menipis</p>
                                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                                    {stats.low_stock_products}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">⚠️</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Kategori</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {stats.total_categories}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">🏷️</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Penjualan Hari Ini</p>
                                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                    {formatCurrency(stats.today_sales)}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {stats.total_sales_count} transaksi
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">Penjualan Bulan Ini</p>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {formatCurrency(stats.this_month_sales)}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">📈</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Low Stock Alert */}
                    {lowStockProducts.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <span className="mr-2">⚠️</span>
                                    Stok Menipis
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {lowStockProducts.map((product) => (
                                        <div key={product.id} className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {product.name}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {product.code} • {product.category.name}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                                                    {product.stock_quantity}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Min: {product.min_stock_level}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Recent Stock Movements */}
                    {recentActivities.stock_movements && recentActivities.stock_movements.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <span className="mr-2">📝</span>
                                    Aktivitas Stok Terbaru
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {recentActivities.stock_movements.map((movement) => (
                                        <div key={movement.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {movement.product.name}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {movement.user.name} • {formatDate(movement.created_at)}
                                                </p>
                                                {movement.notes && (
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                                        {movement.notes}
                                                    </p>
                                                )}
                                            </div>
                                            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                                                movement.type === 'in' 
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                                    : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                            }`}>
                                                {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Recent Sales */}
                    {recentActivities.recent_sales && recentActivities.recent_sales.length > 0 && (
                        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                                    <span className="mr-2">🛒</span>
                                    Penjualan Terbaru
                                </h3>
                            </div>
                            <div className="p-6">
                                <div className="space-y-4">
                                    {recentActivities.recent_sales.map((sale) => (
                                        <div key={sale.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900 dark:text-white">
                                                    {sale.invoice_number}
                                                </p>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {sale.cashier.name} • {formatDate(sale.created_at)}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    {sale.items.reduce((sum, item) => sum + item.quantity, 0)} items • {sale.payment_method.toUpperCase()}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-green-600 dark:text-green-400">
                                                    {formatCurrency(sale.total_amount)}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            🚀 Aksi Cepat
                        </h3>
                    </div>
                    <div className="p-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {(userRole === 'shop_owner' || userRole === 'cashier') && (
                                <a
                                    href="/pos"
                                    className="flex flex-col items-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-transparent hover:border-blue-200 dark:hover:border-blue-700 transition-colors"
                                >
                                    <span className="text-2xl mb-2">🛒</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">POS</span>
                                </a>
                            )}
                            {(userRole === 'shop_owner' || userRole === 'warehouse_manager') && (
                                <>
                                    <a
                                        href="/products"
                                        className="flex flex-col items-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border-2 border-transparent hover:border-green-200 dark:hover:border-green-700 transition-colors"
                                    >
                                        <span className="text-2xl mb-2">📦</span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">Produk</span>
                                    </a>
                                    <a
                                        href="/categories"
                                        className="flex flex-col items-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border-2 border-transparent hover:border-purple-200 dark:hover:border-purple-700 transition-colors"
                                    >
                                        <span className="text-2xl mb-2">🏷️</span>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">Kategori</span>
                                    </a>
                                </>
                            )}
                            {userRole === 'shop_owner' && (
                                <a
                                    href="/reports"
                                    className="flex flex-col items-center p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border-2 border-transparent hover:border-orange-200 dark:hover:border-orange-700 transition-colors"
                                >
                                    <span className="text-2xl mb-2">📊</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">Laporan</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}