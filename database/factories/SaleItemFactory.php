<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Database\Eloquent\Factories\Factory;

class SaleItemFactory extends Factory
{
    protected $model = SaleItem::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $price = $this->faker->randomFloat(2, 5000, 100000);
        $quantity = $this->faker->numberBetween(1, 10);
        $discountAmount = $this->faker->randomFloat(2, 0, $price * 0.1);
        $subtotal = $quantity * ($price - $discountAmount);

        return [
            'sale_id' => Sale::factory(),
            'product_id' => Product::factory(),
            'product_name' => $this->faker->words(3, true),
            'price' => $price,
            'quantity' => $quantity,
            'discount_amount' => $discountAmount,
            'subtotal' => $subtotal,
        ];
    }
}