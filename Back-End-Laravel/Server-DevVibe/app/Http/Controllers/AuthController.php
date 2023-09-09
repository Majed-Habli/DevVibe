<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Models\User;
use App\Models\BlockedUser;

class AuthController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login','register']]);
    }

    public function Unauthorized(Request $request) {
        return response()->json([
            'status' => 'error',
            'message' => 'Unauthorized'
        ], 200);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);

        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();

        $is_blocked = BlockedUser::where('user_id', $user->id)->first();

        if($is_blocked){
            return response()->json([
                'error' => 'You are blocked.'
            ], 403);
        }
        $user->token = $token;

        return response()->json([
                'status' => 'success',
                'user' => $user,
            ]);

    }

    public function register(Request $request){
        $request->validate([
            'user_name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        $user = new User; 
        $user->user_type_id = $request->user_type_id;
        $user->user_name = $request->user_name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        $user->country = $request->country;
        // $user->gender = $request->gender;
        $user->profile_image_url = $request->profile_image_url;

        $user->save();

        $token = Auth::login($user);
        $user->token = $token;

        if($user){

            $folder_name = $user->id;
            $path = 'users/' . $folder_name;
            $path_user_profile_pics = $path . '/profile_pic';
            $path_user_pics = $path . '/user_images';
            $path_user_resume = $path . '/user_resume';
            
            if(!Storage::disk('public')->exists($path)){
                Storage::disk('public')->makeDirectory($path);

                if(Storage::disk('public')->exists($path)){
                    Storage::disk('public')->makeDirectory($path_user_profile_pics);
                    Storage::disk('public')->makeDirectory($path_user_resume);
                    Storage::disk('public')->makeDirectory($path_user_pics);
                }
            }
        }

        return response()->json([
            'status' => 'Success',
            'data' => $user
        ]);
    }

    public function logout()
    {
        Auth::logout();
        return response()->json([
            'status' => 'success',
            'message' => 'Successfully logged out',
        ]);
    }

    public function refresh()
    {
        return response()->json([
            'status' => 'success',
            'user' => Auth::user(),
            'authorisation' => [
                'token' => Auth::refresh(),
                'type' => 'bearer',
            ]
        ]);
    }

}
