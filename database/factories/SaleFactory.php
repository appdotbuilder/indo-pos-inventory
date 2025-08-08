<?php

namespace Database\Factories;

use App\Models\Sale;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class SaleFactory extends Factory
{
    protected $model = Sale::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = $this->faker->randomFloat(2, 10000, 500000);
        $discountAmount = $this->faker->randomFloat(2, 0, $subtotal * 0.2);
        $taxAmount = ($subtotal - $discountAmount) * 0.11; // 11% PPN
        $totalAmount = $subtotal - $discountAmount + $taxAmount;
        $amountPaid = $totalAmount + $this->faker->randomFloat(2, 0, 50000);
        $changeAmount = $amountPaid - $totalAmount;

        return [
            'invoice_number' => 'INV-' . date('Ymd') . '-' . $this->faker->unique()->numberBetween(1000, 9999),
            'cashier_id' => User::factory(),
            'customer_name' => $this->faker->optional()->name(),
            'subtotal' => $subtotal,
            'discount_amount' => $discountAmount,
            'tax_amount' => $taxAmount,
            'total_amount' => $totalAmount,
            'payment_method' => $this->faker->randomElement(['cash', 'card', 'transfer', 'qris']),
            'amount_paid' => $amountPaid,
            'change_amount' => $changeAmount,
            'status' => $this->faker->randomElement(['completed', 'refunded', 'partial_refund']),
        ];
    }
}