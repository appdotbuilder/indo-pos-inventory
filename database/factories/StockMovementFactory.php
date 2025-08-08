<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\StockMovement;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class StockMovementFactory extends Factory
{
    protected $model = StockMovement::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $stockBefore = $this->faker->numberBetween(0, 100);
        $quantity = $this->faker->numberBetween(1, 50);
        $type = $this->faker->randomElement(['in', 'out']);
        $stockAfter = $type === 'in' ? $stockBefore + $quantity : max(0, $stockBefore - $quantity);

        return [
            'product_id' => Product::factory(),
            'user_id' => User::factory(),
            'type' => $type,
            'quantity' => $quantity,
            'stock_before' => $stockBefore,
            'stock_after' => $stockAfter,
            'notes' => $this->faker->optional()->sentence(),
            'reference' => $this->faker->optional()->regexify('[A-Z0-9]{10}'),
        ];
    }
}