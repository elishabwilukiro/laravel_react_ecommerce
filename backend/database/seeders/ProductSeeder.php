<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('products')->insert([
            [
                'title' => 'Laptop Dell XPS',
                'price' => 1200,
                'brand_id' => 2,
                'category_id' => 2,
                'is_featured' => 'no',
                'description' => 'High performance laptop',
                'sku' => 'SKU-1001',
                'qty' => 10,
                'status' => '0',
                'archive' => '0',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Wireless Mouse',
                'price' => 25,
                'brand_id' => 2,
                'category_id' => 2,
                'is_featured' => 'no',
                'description' => 'Ergonomic wireless mouse',
                'sku' => 'SKU-1002',
                'qty' => 50,
                'status' => '0',
                'archive' => '0',
                'created_at' => now(),
                'updated_at' => now()
            ],
            [
                'title' => 'Mechanical Keyboard',
                'price' => 90,
                'brand_id' => 2,
                'category_id' => 3,
                'is_featured' => 'no',
                'description' => 'RGB mechanical keyboard',
                'sku' => 'SKU-1003',
                'qty' => 30,
                'status' => '0',
                'archive' => '0',
                'created_at' => now(),
                'updated_at' => now()
            ]
        ]);
    }
}
