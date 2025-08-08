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
        Schema::create('stock_movements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('product_id')->constrained()->onDelete('cascade');
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['in', 'out'])->comment('Stock movement type: in or out');
            $table->integer('quantity')->comment('Movement quantity');
            $table->integer('stock_before')->comment('Stock before movement');
            $table->integer('stock_after')->comment('Stock after movement');
            $table->text('notes')->nullable();
            $table->string('reference')->nullable()->comment('Reference ID from sales or adjustments');
            $table->timestamps();
            
            $table->index(['product_id', 'type']);
            $table->index('user_id');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stock_movements');
    }
};