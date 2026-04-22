<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Size;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductSize;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = Product::with(['category','brand'])    
            ->where('archive','0')
            ->orderBy('created_at','DESC')
            ->get();

        return response()->json([
            'status' => 200,
            'data'   => $product,
        ], 200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $rules = [
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'brand_id' => 'nullable|exists:brands,id',
            'category_id' => 'required|exists:categories,id',
            'qty' => 'required|numeric',
            'sku' => 'required|string|max:100|unique:products,sku',
            'short_description' => 'nullable|string',
            'description' => 'nullable|string',
            'compare_price' => 'nullable|numeric',
            'barcode' => 'required|string',
            'is_featured' => 'required|in:no,yes',
            'status' => 'required|in:0,1',
        ];
        
        $validator = Validator::make($request->all(),$rules);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ],400);
        }

        $product = Product::create([
            'title' => $request->title,
            'price' => $request->price,
            'brand_id' => $request->brand_id,
            'category_id' => $request->category_id,
            'short_description' => $request->short_description,
            'description' => $request->description,
            'compare_price' => $request->compare_price,
            'is_featured' => $request->is_featured,
            'barcode' => $request->barcode,
            'qty' => $request->qty,
            'sku' => $request->sku,
            'status' => $request->status,
        ]); 

        // Save product sizes
        if(!empty($request->sizes)){
            foreach($request->sizes as $sizeId){
                ProductSize::create([
                    'product_id' => $product->id,
                    'size_id' => $sizeId
                ]);
            }
        }

        // Save Product Images
        $manager = new ImageManager(Driver::class);
        if(!empty($request->gallery)){
            foreach($request->gallery as $key => $tempImageId){

                $tempImage = TempImage::find($tempImageId);

                if (!$tempImage) continue;

                // For Large Thumbnail
                $extArray = explode('.',$tempImage->name);
                $ext = end($extArray);

                $imageName = $product->id.'-'.time().'.'.$ext; //  1-7893799837.jpg
                $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->scaleDown(1200);
                $img->save(public_path('uploads/products/large/' . $imageName));    

                // For Small Thumbnail
                $img = $manager->read(public_path('uploads/temp/' . $tempImage->name));
                $img->coverDown(400,460);
                $img->save(public_path('uploads/products/small/' . $imageName));    

                // Product image
                ProductImage::create([
                    'image' => $imageName,
                    'product_id' => $product->id  
                ]);

                // first image as main product image
                if($key == 0){
                    $product->image = $imageName;
                    $product->save();
                }
            }
        }
        
        if($product){
            return response()->json([
                'status' => 200,
                'data'   => $product,
                'message'=> 'Product created successfully',
            ],200);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::find($id);
        if(!$product == null){
            return response()->json([
                'status' => 200,
                'data'   => $product,
            ], 200);
        }else{
            return response()->json([
                'status' => 404,
                'data'   => [],
                'message'=> 'Record not found'
            ], 404);

        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $product = Product::find($id);
        
        if(!$product){
            return response()->json([
                'status' => 404,
                'data'   => [],
                'message'=> 'Record not found'
            ],404);
        }
        $rules = [
            'title' => 'required|string|max:255',
            'price' => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'sku' => 'required|string|max:100|unique:products,sku,'.$id,
            'status' => 'required|in:0,1',
        ];
        
        $validator = Validator::make($request->all(),$rules);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ],400);
        }

        $product->update([
            'title' => $request->title,
            'price' => $request->price,
            'category_id' => $request->category_id,
            'description' => $request->description,
            'sku' => $request->sku,
            'status' => $request->status,
        ]); 
        
        if($product){
            return response()->json([
                'status' => 200,
                'data'   => $product,
                'message'=> 'Product updated successfully',
            ],200);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        
        if(!$product){
            return response()->json([
                'status'    =>  404,
                'data'      =>  [],
                'message'   =>  'Record not found.',
            ], 404);
        }

        $product->update(['archive' => '1']); 
        
        return response()->json([
            'status'    =>  200,
            'data'      =>  $product,
            'message'   =>  'Product deleted successfully'
        ],200);
    }
}
