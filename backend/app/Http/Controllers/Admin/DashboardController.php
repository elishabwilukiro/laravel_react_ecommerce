<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $totalBrand = Brand::where('archive','0')->count();
        $totalCategory = Category::where('archive','0')->count();
        $totalUser = User::where('archive','0')->count();
        $totalProduct = User::where('archive','0')->count();

        return response()->json([
            'status' => 200,
            'data'  => [
                'totalUser' => $totalUser,
                'totalBrand' => $totalBrand,
                'totalCategory' => $totalCategory,
                'totalProduct' => $totalProduct,
            ],
        ], 200);
    }
}
