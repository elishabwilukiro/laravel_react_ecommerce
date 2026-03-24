<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class AccountController extends Controller
{
    public function register(Request $request){
        $rules = [
            'name' => 'required|string|min:3',
            'email' => 'required|string|email|unique:users,email',
            'password' => 'required|string|min:5',
        ];

        $validator = Validator::make($request->all(), $rules);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ],400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->name),
            'email_verified_at' => Carbon::now(),
            'remember_token' => Str::random(10),
            'role' => 'customer',
            'status' => '0',
            'archive' => '0',
        ]);

        return response()->json([
            'status' => 200,
            'data'  => $user,
            'message' => 'Your have registered successfully'
        ], 200);
    }

    public function authenticate(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'email'     => 'required|email',
            'password'  => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ],400);
        }

        if(Auth::attempt(['email'=>$request->email,'password'=>$request->password])){
            
            $user = User::find(Auth::user()->id);

            if($user->role == 'customer'){
                
                $token = $user->createToken('token')->plainTextToken;

                return response()->json([
                    'status' => 200,
                    'token' => $token,
                    'id'    => $user->id,
                    'name'  => $user->name
                ],200);
            }
        }else{
            return response()->json([
                'status' => 401,
                'message' => 'Incorrect email or password'
            ],401);
        }

        
    }
}
