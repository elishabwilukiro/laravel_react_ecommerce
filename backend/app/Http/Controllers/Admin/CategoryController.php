<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category = Category::where('archive','0')->orderBy('created_at','DESC')->get();
        return response()->json([
            'status'    =>  200,
            'data'      => $category
        ],200);
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
        $validator = Validator::make($request->all(),[
            'name'   =>  'required|string',
            'status' =>  'nullable'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' =>  400,
                'errors' =>  $validator->errors(),
            ], 400);
        }

        $category = Category::create([
            'name'   =>  $request->name,
            'status' =>  $request->status
        ]);
        return response()->json([
            'status' => 200,
            'data'   => $category,
            'message'=> 'Category created successfully'   
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $category = Category::find($id);
        
        if(!$category == null){
            return response()->json([
                'status' => 200,
                'data'   => $category, 
            ],200);
        }else{
            return response()->json([
                'status' => 404,
                'data'   => [],
                'message'=> 'Record not found.'   
            ],404);

        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $category = Category::find($id);

        if(!$category == null){
            return response()->json([
                'status' => 200,
                'data'   => $category,
            ],200);
        }else{
           return response()->json([
                'status' => 404,
                'data'   => [],
                'message' => 'Record not found.'
           ],400);  
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $category =  Category::find($id);

        if($category == null){
           return response()->json([
                'status' => 404,
                'data'   => [],
                'message' => 'Record not found.'
           ],404);  
        }  

        $validator = Validator::make($request->all(),[
            'name'      =>  'required|string',
            'status'    =>  'nullable'
        ]);

        if($validator->fails()){
            return response()->json([
                'status'    =>  400,
                'errors'    =>  $validator->errors(),
            ], 400);
        }

        $category->name = $request->name;
        $category->status = $request->status;
        $category->save();

        return response()->json([
            'status' => 200,
            'data'   => $category,
            'message'=> 'Category updates successfully'   
        ]);
        
      
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $category = Category::find($id);

        if($category == null){
            return response()->json([
                'status'    =>  404,
                'data'      =>  [],
                'message'   =>  'Record not found.',
            ], 404);
        }

        $category->update(['archive' => '1']);
        
        return response()->json([
            'status'    =>  200,
            'data'      =>  $category,
            'message'   =>  'Category deleted successfully'
        ],200);
    }
}
