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
            $table->string('title')->nullable();
            $table->double('price',10,2)->nullable()->default(0.00);
            $table->double('compare_price',10,2)->nullable()->default(0.00);
            $table->text('description')->nullable();
            $table->text('short_description')->nullable();
            $table->string('image')->nullable();
            $table->integer('qty')->nullable();
            $table->string('barcode')->nullable();
            $table->enum('status',['0','1'])->default(0);
            $table->enum('archive',['0','1'])->default(0);
            $table->enum('is_featured',['yes','no'])->default('no');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->foreignId('brand_id')->constrained()->onDelete('cascade');
            $table->timestamps();
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
