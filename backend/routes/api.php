<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\BrandController;
use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\Admin\SizeController;
use App\Http\Controllers\Admin\TempImageController;

Route::post('/admin/login', [AuthController::class, 'Authenticate']);

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::group(['middleware'=>'auth:sanctum'], function(){
    // Route::get('categories', [CategoryController::class,'index']);
    // Route::get('categories/{id}', [CategoryController::class,'show']);
    // Route::put('categories/{id}', [CategoryController::class,'update']);
    // Route::delete('categories/{id}', [CategoryController::class,'destroy']);
    // Route::post('categories', [CategoryController::class,'store']);

    Route::get('dashboard',[DashboardController::class,'index']);
    Route::get('sizes',[SizeController::class,'index']);
    Route::post('temp-images',[TempImageController::class,'store']);
    Route::resource('brands',BrandController::class);
    Route::resource('categories',CategoryController::class);
    Route::resource('products',ProductController::class);
});