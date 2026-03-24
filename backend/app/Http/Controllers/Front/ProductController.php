<?php

namespace App\Http\Controllers\front;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function latestProducts()
    {
        $latestProduct = Product::query()
            ->where('status', '0')
            ->where('archive', '0')
            ->where('is_featured', 'no')
            ->orderBy('created_at','DESC')
            // ->limit(4)
            ->get();
            
        return response()->json([
            'status' => 200,
            'data' => $latestProduct,
        ],200);
    }

    public function featuredProducts()
    {
        $featuredProduct = Product::query()
            ->where('status', '0')
            ->where('archive', '0')
            ->where('is_featured', 'yes')
            ->orderBy('created_at','DESC')
            // ->limit(8)
            ->get();

        return response()->json([
            'status' => 200,
            'data' => $featuredProduct,
        ],200);
    }

    public function getBrand()
    {
        $getBrand = Brand::orderBy('name','ASC') 
            ->where('archive','0')
            ->where('status','0')
            ->get();

        return response()->json([
            'status' => 200,
            'data'   => $getBrand,
        ], 200);
    }

    public function getCategory()
    {
        $getCategory = Category::query()    
            ->where('archive','0')
            ->where('status','0')
            ->orderBy('name','ASC')
            ->get();

        return response()->json([
            'status' => 200,
            'data'   => $getCategory,
        ], 200);
    }
    public function shopProducts(Request $request)
    {
        $products = Product::query()
            ->where('status','0')
            ->where('archive','0')
            ->orderBy('created_at','DESC');

        // Filter by brands
        if($request->filled('brand')){
            $brandArray = array_filter(explode(',', $request->brand));
            $products = $products->whereIn('brand_id', $brandArray);
        }

        // Filter by categories
        if($request->filled('category')){
            $categoryArray = array_filter(explode(',', $request->category));
            $products = $products->whereIn('category_id', $categoryArray);
        }        

        $products = $products->limit(9)->get();    

        return response()->json([
            'status' => 200,
            'data'   => $products,
        ],200);

    }
    public function shopProduct($id)
    {
        $product = Product::with([
                'product_images',
                'product_sizes.size'
            ])->find($id);

        if(!empty($product)){
            return response()->json([
                'status' => 200,
                'data'  => $product,
            ],200);

        }else{
            return response()->json([
                'status' => 404,
                'data'   => [],
                'message'=> 'Record not found'
            ],404);
        }
    }

}
