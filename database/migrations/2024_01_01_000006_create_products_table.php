<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique()->comment('Product barcode/SKU');
            $table->string('name');
            $table->text('description')->nullable();
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->decimal('purchase_price', 15, 2)->comment('Purchase price in IDR');
            $table->decimal('selling_price', 15, 2)->comment('Selling price in IDR');
            $table->integer('stock_quantity')->default(0);
            $table->integer('min_stock_level')->default(10)->comment('Low stock threshold');
            $table->string('unit')->default('pcs')->comment('Unit of measurement');
            $table->string('image_path')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamps();
            
            $table->index('code');
            $table->index('name');
            $table->index('category_id');
            $table->index('status');
            $table->index('stock_quantity');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};