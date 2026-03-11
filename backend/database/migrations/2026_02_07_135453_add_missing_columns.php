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
        if(Schema::hasTable('categories')) {
            if(!Schema::hasColumn('categories','archive')){
                Schema::table('categories', function(Blueprint $table){
                    $table->enum('archive',['0','1'])->default(0)->after('status');
                });
            }
        }

        if(Schema::hasTable('brands')) {
            if(!Schema::hasColumn('brands','archive')){
                Schema::table('brands', function(Blueprint $table){
                    $table->enum('archive',['0','1'])->default(0)->after('status');
                });
            }
        }
        if(Schema::hasTable('users')) {
            if(!Schema::hasColumn('users','archive')){
                Schema::table('users', function(Blueprint $table){
                    $table->enum('status',['0','1'])->default(0);
                    $table->enum('archive',['0','1'])->default(0)->after('status');
                });
            }
        }
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
