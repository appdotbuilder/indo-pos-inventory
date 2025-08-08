import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import Heading from '@/components/heading';
import { Button } from '@/components/ui/button';

interface Category {
    id: number;
    name: string;
    description: string | null;
    status: string;
    products_count: number;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface CategoriesPagination {
    data: Category[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: PaginationLink[];
}

interface Props {
    categories: CategoriesPagination;
    filters: {
        search?: string;
        status?: string;
    };
    [key: string]: unknown;
}

export default function CategoriesIndex({ categories, filters }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        const status = formData.get('status') as string;

        router.get(route('categories.index'), {
            search: search || undefined,
            status: status || undefined,
        });
    };

    return (
        <AppShell>
            <Head title="Manajemen Kategori" />
            
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Heading title="🏷️ Manajemen Kategori" />
                    <Link href={route('categories.create')}>
                        <Button>Tambah Kategori</Button>
                    </Link>
                </div>

                {/* Filters */}
                <form onSubmit={handleSearch} className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Cari Kategori
                            </label>
                            <input
                                type="text"
                                name="search"
                                defaultValue={filters.search || ''}
                                placeholder="Nama atau deskripsi kategori..."
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Status
                            </label>
                            <select
                                name="status"
                                defaultValue={filters.status || ''}
                                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="">Semua Status</option>
                                <option value="active">Aktif</option>
                                <option value="inactive">Tidak Aktif</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <Button type="submit" className="w-full">
                                Filter
                            </Button>
                        </div>
                    </div>
                </form>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.data.map(category => (
                        <div key={category.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                                    <span className="text-2xl">🏷️</span>
                                </div>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    category.status === 'active'
                                        ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                        : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                                }`}>
                                    {category.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                                </span>
                            </div>
                            
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                {category.name}
                            </h3>
                            
                            {category.description && (
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                                    {category.description}
                                </p>
                            )}
                            
                            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                                <span>{category.products_count} produk</span>
                                <span>{formatDate(category.created_at)}</span>
                            </div>
                            
                            <div className="flex space-x-2">
                                <Link
                                    href={route('categories.show', category.id)}
                                    className="flex-1 px-3 py-2 text-center text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30"
                                >
                                    Lihat
                                </Link>
                                <Link
                                    href={route('categories.edit', category.id)}
                                    className="flex-1 px-3 py-2 text-center text-sm font-medium text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30"
                                >
                                    Edit
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {categories.data.length === 0 && (
                    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">🏷️</span>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                            Belum ada kategori
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Mulai dengan membuat kategori pertama untuk produk Anda.
                        </p>
                        <Link href={route('categories.create')}>
                            <Button>Tambah Kategori</Button>
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {categories.last_page > 1 && (
                    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 px-6 py-3">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-700 dark:text-gray-300">
                                Menampilkan {((categories.current_page - 1) * categories.per_page) + 1} hingga {Math.min(categories.current_page * categories.per_page, categories.total)} dari {categories.total} kategori
                            </div>
                            <div className="flex space-x-1">
                                {categories.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => link.url && router.get(link.url)}
                                        disabled={!link.url}
                                        className={`px-3 py-1 text-sm rounded ${
                                            link.active
                                                ? 'bg-blue-600 text-white'
                                                : link.url
                                                ? 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                                                : 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}