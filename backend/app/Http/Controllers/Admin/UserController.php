<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $user = User::where('archive','0')
            ->orderBy('created_at','desc')
            ->get();

        return response()->json([
            'status' =>  200,
            'data'   =>  $user,
        ],200);
    }


    public function show(Request $request, string $id)
    {
        $user = User::find($id);
        
        if(!$user == null){
            return response()->json([
                'status' => 200,
                'data'   => $user, 
            ],200);
        }else{
            return response()->json([
                'status' => 404,
                'data'   => [],
                'message'=> 'Record not found.'   
            ],404);

        }
    }

    public function update(Request $request, string $id)
    {
        $user = User::find($id);
        if($user == null){
            return response()->json([
                'status' => 404,
                'data'   => [],
                'message'=> 'Record not found.'
            ],404);
        }

        $validator = Validator::make($request->all(),[
            'name'   => 'required',
            'email'   => 'required',
            'role'   => 'required',
            'status' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ],400);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->role = $request->role;
        $user->status = $request->status;
        $user->save();

        return response()->json([
            'status' => 200,
            'data'   => $user,
            'message'=> 'User Updated Successfully'
        ], 200);
    }

    public function destroy(string $id)
    {
        $user = User::find($id);

        if($user == null){
            return response([
                'status' => 404,
                'data'   => [],
                'message'=> 'Record Not Found'
            ],404);
        }

        if($user->id==Auth::user()->id){
            return response([
                'status' => 400,
                'data'   => [],
                'message'=> "You Can't Delete Your Own Account"
            ],400);
        }

        $user->archive = '1';
        $user->save();

        return response([
            'status' => 200,
            'data'   => $user,
            'message'=> 'User Delete Successfully',
        ],200);

    }

}
