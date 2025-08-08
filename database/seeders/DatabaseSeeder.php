<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            CategorySeeder::class,
        ]);

        // Create default shop owner
        $shopOwner = User::factory()->create([
            'name' => 'Shop Owner',
            'email' => 'owner@umkm.com',
        ]);

        // Create warehouse manager
        $warehouseManager = User::factory()->create([
            'name' => 'Warehouse Manager',
            'email' => 'warehouse@umkm.com',
        ]);

        // Create cashier
        $cashier = User::factory()->create([
            'name' => 'Cashier',
            'email' => 'cashier@umkm.com',
        ]);

        // Assign roles
        $shopOwnerRole = \App\Models\Role::where('name', 'shop_owner')->first();
        $warehouseManagerRole = \App\Models\Role::where('name', 'warehouse_manager')->first();
        $cashierRole = \App\Models\Role::where('name', 'cashier')->first();

        $shopOwner->roles()->attach($shopOwnerRole);
        $warehouseManager->roles()->attach($warehouseManagerRole);
        $cashier->roles()->attach($cashierRole);
    }
}
