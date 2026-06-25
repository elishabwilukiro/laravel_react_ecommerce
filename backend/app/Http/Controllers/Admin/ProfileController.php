<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function profile(Request $request, $id)
    {
        $user = Auth::user();

        return response()->json([
            'status' => 200,
            'data' => $user,
        ], 200);
        
    }
    
}
