<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    
    public function profile()
    {
        $user =  Auth::user();

        if(!$user) {
            return response()->json([
                'status'    =>  401,
                'message'   =>  'Unauthorized'
            ], 401);

        } 
            
        return response()->json([
            'status'    =>  200,
            'user'      =>  $user
        ], 200); 

    }
    
}
