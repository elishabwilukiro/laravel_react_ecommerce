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
use App\Http\Controllers\Front\AccountController;
use App\Http\Controllers\Front\OrderController;
use App\Http\Controllers\Front\ProductController as FrontProductController;

Route::post('admin/login', [AuthController::class, 'Authenticate']);
Route::get('latest-products',[FrontProductController::class,'latestProducts']);
Route::get('featured-products',[FrontProductController::class,'featuredProducts']);
Route::get('brand-products',[FrontProductController::class,'getBrand']);
Route::get('category-products',[FrontProductController::class,'getCategory']);
Route::get('shop-products',[FrontProductController::class,'shopProducts']);
Route::get('shop-product/{id}',[FrontProductController::class,'shopProduct']);
Route::post('account/register', [AccountController::class,'register']);
Route::post('account/login',[AccountController::class,'authenticate']);

Route::group(['middleware'=>['auth:sanctum','checkUserRole']], function(){
    Route::post('save-order',[OrderController::class,'saveOrder']);
});


Route::group(['middleware'=>['auth:sanctum','checkAdminRole']], function(){
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