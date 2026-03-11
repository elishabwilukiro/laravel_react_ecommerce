<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;


class TempImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
            'image' => 'required|image|mimes:jpeg,jpg,png,gif',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ],400);
        }

        // Store image
        $tempImage = new TempImage();
        $tempImage->name = 'Dummy name';
        $tempImage->save();

        $image = $request->file('image');
        $imageName = time().".".$image->extension();
        $image->move(public_path('uploads/temp/'),$imageName);

        $tempImage->name = $imageName;
        $tempImage->save();

        // save image thumbnail
        $manager = new ImageManager(Driver::class);
        $img = $manager->read(public_path('uploads/temp/' . $imageName));
        $img->coverDown(400, 450);
        $img->save(public_path('uploads/temp/thumb/' . $imageName));

        return response()->json([
            'status' => 200,
            'data'  => $tempImage,
            'message'=> 'Image uploaded successfully'
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show(TempImage $tempImage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(TempImage $tempImage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TempImage $tempImage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TempImage $tempImage)
    {
        //
    }
}
