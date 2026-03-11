<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $brand = Brand::where('archive','0')->orderBy('created_at','desc')->get();
        return response()->json([
            'status' =>  200,
            'data'   =>  $brand,
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
            'name'  =>  'required|string',
            'status'=>  'nullable',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' =>  400,
                'errors' =>  $validator->errors(),
            ],400);
        }

        $brand = Brand::create([
            'name'  =>  $request->name,
            'status'=>  $request->status
        ]);

        return response()->json([
            'status' => 200,
            'data'   => $brand,
            'message'=> 'Brand created successfully'   
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $brand = Brand::find($id);
        if($brand == null){
            return response()->json([
                'status' => 404,
                'data'   => [],
                'message'=> 'Record not found.'
            ],404);
        }else{
            return response()->json([
                'status' => 200,
                'data'   => $brand,
            ],200);
        }
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $brand = Brand::find($id);
        if($brand == null){
            return response()->json([
                'status' => 404,
                'data'   => [],
                'message'=> 'Record not found.'
            ],404);
        }

        $validator = Validator::make($request->all(),[
            'name'   => 'required',
            'status' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ],400);
        }

        $brand->name = $request->name;
        $brand->status = $request->status;
        $brand->save();

        return response()->json([
            'status' => 200,
            'data'   => $brand,
            'message'=> 'Brand updated successfully'
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $brand = Brand::find($id);
        if($brand == null){
            return response([
                'status' => 404,
                'data'   => [],
                'message'=> 'Record not found'
            ],404);
        }

        $brand->archive = '1';
        $brand->save();

        return response([
            'status' => 200,
            'data'   => $brand,
            'message'=> 'Brand delete successfully',
        ],200);

    }
}
