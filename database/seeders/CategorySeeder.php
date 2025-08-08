<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'Makanan & Minuman',
                'description' => 'Produk makanan dan minuman',
                'status' => 'active'
            ],
            [
                'name' => 'Elektronik',
                'description' => 'Produk elektronik dan gadget',
                'status' => 'active'
            ],
            [
                'name' => 'Pakaian',
                'description' => 'Pakaian dan aksesoris fashion',
                'status' => 'active'
            ],
            [
                'name' => 'Rumah Tangga',
                'description' => 'Peralatan dan perlengkapan rumah tangga',
                'status' => 'active'
            ],
            [
                'name' => 'Kesehatan & Kecantikan',
                'description' => 'Produk kesehatan dan kecantikan',
                'status' => 'active'
            ],
            [
                'name' => 'Alat Tulis Kantor',
                'description' => 'Alat tulis dan perlengkapan kantor',
                'status' => 'active'
            ],
        ];

        foreach ($categories as $categoryData) {
            Category::updateOrCreate(
                ['name' => $categoryData['name']],
                $categoryData
            );
        }
    }
}