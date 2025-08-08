import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="UMKM Inventory & POS System">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
                {/* Header */}
                <header className="w-full border-b border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
                    <div className="mx-auto max-w-7xl px-6 py-4">
                        <nav className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600"></div>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">UMKM Pro</span>
                            </div>
                            <div className="flex items-center space-x-4">
                                {auth.user ? (
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={route('login')}
                                            className="text-sm font-medium text-gray-700 transition-colors hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400"
                                        >
                                            Masuk
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                                        >
                                            Daftar Gratis
                                        </Link>
                                    </>
                                )}
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <main className="flex-1">
                    <div className="mx-auto max-w-7xl px-6 py-16">
                        <div className="text-center">
                            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                🏪 Sistem Inventory & POS
                                <span className="block text-blue-600 dark:text-blue-400 mt-2">
                                    untuk UMKM Indonesia
                                </span>
                            </h1>
                            <p className="mx-auto max-w-3xl text-xl text-gray-600 dark:text-gray-300 mb-8">
                                Kelola inventory, proses penjualan, dan analisa bisnis Anda dengan mudah. 
                                Dirancang khusus untuk kebutuhan Usaha Mikro, Kecil, dan Menengah di Indonesia.
                            </p>
                            {!auth.user && (
                                <div className="flex justify-center space-x-4 mb-12">
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-blue-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700 shadow-lg"
                                    >
                                        Mulai Gratis Sekarang
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg border-2 border-blue-600 px-8 py-4 text-lg font-semibold text-blue-600 transition-colors hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                    >
                                        Demo Login
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:bg-gray-800/60 dark:border-gray-700">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 dark:bg-green-900/20">
                                    <span className="text-2xl">📦</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Manajemen Inventory
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Kelola stok produk, kategori, dan dapatkan notifikasi stok menipis secara otomatis
                                </p>
                            </div>

                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:bg-gray-800/60 dark:border-gray-700">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 dark:bg-blue-900/20">
                                    <span className="text-2xl">🛒</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Point of Sale (POS)
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Interface kasir yang intuitif dengan support pembayaran tunai, kartu, transfer, dan QRIS
                                </p>
                            </div>

                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:bg-gray-800/60 dark:border-gray-700">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 dark:bg-purple-900/20">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Laporan & Analitik
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Laporan penjualan harian, bulanan, analisa profit, dan performa bisnis
                                </p>
                            </div>

                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:bg-gray-800/60 dark:border-gray-700">
                                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 dark:bg-orange-900/20">
                                    <span className="text-2xl">👥</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Multi-User & Role
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Sistem role untuk Pemilik Toko, Manajer Gudang, dan Kasir dengan akses berbeda
                                </p>
                            </div>

                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:bg-gray-800/60 dark:border-gray-700">
                                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 dark:bg-red-900/20">
                                    <span className="text-2xl">🔔</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Notifikasi Otomatis
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Alert otomatis untuk stok menipis, penjualan harian, dan aktivitas penting lainnya
                                </p>
                            </div>

                            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200 dark:bg-gray-800/60 dark:border-gray-700">
                                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 dark:bg-indigo-900/20">
                                    <span className="text-2xl">📱</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Responsive Design
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300">
                                    Akses dari desktop, tablet, atau smartphone dengan tampilan yang optimal
                                </p>
                            </div>
                        </div>

                        {/* Demo Accounts */}
                        <div className="bg-white/60 backdrop-blur-sm rounded-xl p-8 border border-gray-200 dark:bg-gray-800/60 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
                                🎯 Demo Akun - Coba Sekarang!
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center p-4 bg-blue-50 rounded-lg dark:bg-blue-900/20">
                                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">👑 Shop Owner</h3>
                                    <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">Akses penuh semua fitur</p>
                                    <p className="text-xs font-mono bg-white px-2 py-1 rounded dark:bg-gray-800">
                                        owner@umkm.com
                                    </p>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded-lg dark:bg-green-900/20">
                                    <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">📦 Warehouse Manager</h3>
                                    <p className="text-sm text-green-700 dark:text-green-300 mb-2">Kelola inventory & stok</p>
                                    <p className="text-xs font-mono bg-white px-2 py-1 rounded dark:bg-gray-800">
                                        warehouse@umkm.com
                                    </p>
                                </div>
                                <div className="text-center p-4 bg-purple-50 rounded-lg dark:bg-purple-900/20">
                                    <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">🛒 Cashier</h3>
                                    <p className="text-sm text-purple-700 dark:text-purple-300 mb-2">Akses POS & penjualan</p>
                                    <p className="text-xs font-mono bg-white px-2 py-1 rounded dark:bg-gray-800">
                                        cashier@umkm.com
                                    </p>
                                </div>
                            </div>
                            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
                                Password untuk semua demo akun: <code className="bg-gray-200 px-2 py-1 rounded text-xs dark:bg-gray-700">password</code>
                            </p>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t border-gray-200 bg-white/80 backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/80">
                    <div className="mx-auto max-w-7xl px-6 py-8">
                        <div className="text-center">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                © 2024 UMKM Pro - Sistem Inventory & POS untuk UMKM Indonesia
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                                Built with ❤️ untuk kemajuan UMKM Indonesia
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}