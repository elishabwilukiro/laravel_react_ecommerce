<?php

namespace Database\Seeders;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class SizeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('sizes')->insert([
            [
                'name' => 'XS',
                'status' => '0',
                'archive' => '0',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'S',
                'status' => '0',
                'archive' => '0',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'M',
                'status' => '0',
                'archive' => '0',
                'create_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'L',
                'status' => '0',
                'archive' => '0',
                'create_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'XL',
                'status' => '0',
                'archive' => '0',
                'create_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'name' => 'XXL',
                'status' => '0',
                'archive' => '0',
                'create_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
