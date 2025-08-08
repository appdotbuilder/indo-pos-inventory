<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = [
            [
                'name' => 'shop_owner',
                'display_name' => 'Shop Owner',
                'description' => 'Full access to all modules including inventory, POS, reports, and user management',
                'permissions' => [
                    'inventory.view',
                    'inventory.create',
                    'inventory.update',
                    'inventory.delete',
                    'pos.view',
                    'pos.create',
                    'reports.view',
                    'users.view',
                    'users.create',
                    'users.update',
                    'users.delete',
                    'categories.view',
                    'categories.create',
                    'categories.update',
                    'categories.delete',
                ]
            ],
            [
                'name' => 'warehouse_manager',
                'display_name' => 'Warehouse Manager',
                'description' => 'Access to inventory management, stock operations, and inventory reports',
                'permissions' => [
                    'inventory.view',
                    'inventory.create',
                    'inventory.update',
                    'inventory.delete',
                    'reports.inventory',
                    'categories.view',
                    'categories.create',
                    'categories.update',
                    'categories.delete',
                ]
            ],
            [
                'name' => 'cashier',
                'display_name' => 'Cashier',
                'description' => 'Access to POS module for sales, payments, and returns',
                'permissions' => [
                    'pos.view',
                    'pos.create',
                    'inventory.view',
                ]
            ],
        ];

        foreach ($roles as $roleData) {
            Role::updateOrCreate(
                ['name' => $roleData['name']],
                $roleData
            );
        }
    }
}