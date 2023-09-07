<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserSkill;
use App\Models\Skill;
use App\Models\User;
use App\Models\Image;
use App\Models\DeveloperDetail;
use Illuminate\Support\Str;
use Auth;

class UserController extends Controller
{
    function profile(){

        $user = Auth::User();
        $user_id = Auth::id();

        $user_type = $user->user_type_id;

        if($user_type == 2){
            $user_details = $user->with('DevDetails')->where('id', '=', $user_id)->get();
        }else{
            $user_details = $user->RecDetails()->get();
        }

        return response()->json([
            'status' => 'success',
            // 'data' => $user,
            'data' => $user_details
        ]);
    }

    function updateDetails(Request $request){

        $user = Auth::user();
        $user_id = Auth::id();

        $user->user_name = $request->user_name;
        $user->save();

        $user_type = $user->user_type_id;

        If($user_type == 2){

            $user_details = DeveloperDetail::where('user_id', '=', $user_id)->first();

            if($user_details){

                $user_details->description = $request->description;
                $user_details->save();

            }else{
    
                $user_details = new DeveloperDetail;
                $user_details->user_id = $user_id;
                $user_details->description = $request->description;
                $user_details->gender = $request->gender;
                $user_details->save();
            }
        }else{

            $user_details = RecruiterDetail::where('user_id', '=', $user_id)->first();

            if($user_details){

                $user_details->description = $request->description;
                $user_details->save();

            }else{
    
                $user_details = new RecruiterDetail;
                $user_details->user_id = $user_id;
                $user_details->description = $request->description;
                $user_details->company_name = $request->company_name;
                $user_details->save();
            }
        }


        return response()->json([
            'status' => 'success',
            'data' => $user_details
        ]);

    }

    function addSkills(Request $request){

        //sending the ids of skills as an array json encode

        $user = Auth::user();
        $dataArray = json_decode($request->input('user_skills'), true);

        foreach($dataArray as $data){

            $is_existing = $user->Skills()->where('skill_id',$data)->first();

            if(!$is_existing){

                $user_skills = new UserSkill;
                $user_skills->user_id = $user->id;
                $user_skills->skill_id = $data;
    
                $user_skills->save();

                // return response()->json(['status' => 'added'. $data]);
            }
            // else{

            //     return response()->json([
            //         'status' => $data .'already in user skill set.',
            //         'user existing' => $is_existing
            //     ]);
            // }
        }

        return response()->json([
            'status' => 'success',
        ]);
    }

    function viewUserSkills(){

        $user = Auth::user();

        $skills = $user->Skills()->with('Skill')->get();
        return response()->json([
            'status' => 'success',
            'data' => $skills
        ]);
    }

    function viewAllSkills($search = NULL){

        if($search == " "){
            $skill = Skill::all();

            return response()->json([
                'status' => 'success',
                'data' => $skill
            ]);
        }else{
            $skill = Skill::where('name', 'LIKE', "%$search%")->get();
    
            return response()->json([
                'status' => 'success',
                'data' => $skill
            ]);
        }
    }

    function uploadProfilePic(Request $request){
        
        $user_id = Auth::id();
        $path = public_path('storage/users/' . $user_id . '/profile_pic');

        $image = $request->image;
        $type = $request->type;
        $image_name = Str::random(10).'.'.$type;
        \File::put($path . '/' . $image_name, base64_decode($image));

        $user = Auth::user();
        $user->profile_image_url = $image_name;
        $user->save();

        return response()->json([
            'status' => 'success',
            'view' => $user,
            'storage path' => Storage_path(),
            'path' => $path
        ]);

    }

    function uploadUserImages(Request $request){
        
        $user_id = Auth::id();
        $path = public_path('storage/users/' . $user_id . '/user_images');
        
        $image = $request->image;
        $type = $request->type;
        $image_name = Str::random(10).'.'.$type;
        \File::put($path . '/' . $image_name, base64_decode($image));

        $user = new Image;
        $user->user_id = $user_id;
        $user->image_url = $image_name;
        $user->save();

        return response()->json([
            'status' => 'success',
            'view' => $user,
            'storage path' => Storage_path(),
            'path' => $path
        ]);

    }
}
