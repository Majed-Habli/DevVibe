<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserSkill;
use App\Models\Skill;
use App\Models\User;
use App\Models\Image;
use App\Models\Swipe;
use App\Models\UserMatch;
use App\Models\DeveloperDetail;
use Illuminate\Support\Str;
use Auth;

class UserController extends Controller
{
    function profile($id = Null){

        if(!$id){

            $user = Auth::User();
            $user_id = Auth::id();
        }else{

            $user_id = $id;
            $user = User::where('id', '=',$user_id)->first();
            $user_type = $user->user_type_id;
        }

        $user_type = $user->user_type_id;
    
            if($user_type == 2){
                $user_details = $user->with('DevDetails')->where('id', '=', $user_id)->get();
            }else{
                $user_details = $user->with('RecDetails')->where('id', '=', $user_id)->get();
            }
    
            return response()->json([
                'status' => 'success',
                'data' => $user_details
            ]);

        return response()->json(['status' => 'failes', 'user'=> $id]);

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

                $user_details->gender = $request->gender;
                $user_details->github_url = $request->github_url;
                $user_details->description = $request->description;
                $user_details->linkedin_url = $request->linkedin_url;
                $user_details->save();

            }else{
    
                $user_details = new DeveloperDetail;
                $user_details->user_id = $user_id;
                $user_details->gender = $request->gender;
                $user_details->github_url = $request->github_url;
                $user_details->description = $request->description;
                $user_details->linkedin_url = $request->linkedin_url;
                $user_details->save();
            }
        }else{

            $user_details = RecruiterDetail::where('user_id', '=', $user_id)->first();

            if($user_details){

                $user_details->company_name = $request->company_name;
                $user_details->description = $request->description;
                $user_details->save();

            }else{
    
                $user_details = new RecruiterDetail;
                $user_details->user_id = $user_id;
                $user_details->description = $request->description;
                $user_details->company_name = $request->company_name;
                $user_details->linkedin_url = $request->linkedin_url;
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
            'status' => 'success'
        ]);
    }

    function removeSkills(Request $request){

        $user = Auth::user();
        $dataArray = json_decode($request->input('user_skills'), true);

        foreach($dataArray as $data){

            $is_existing = $user->Skills()->where('skill_id',$data)->first();

            if($is_existing){

                $user_skills = $user->Skills()->where('skill_id',$data)->delete();
            }
            
        }

        return response()->json([
            'status' => 'successfully deleted skills',
        ]);
    }

    function viewUserSkills($id = Null){

        if(!$id){

            $user = Auth::user();
        }else{
            $user = User::where('id', '=', $id)->first();
        }


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

    function uploadUserResume(Request $request){
        
        $user_id = Auth::id();
        $path = public_path('storage/users/' . $user_id . '/user_resume');
        
        $resume = $request->resume;
        $type = $request->type;
        $resume_name = Str::random(10).'.'.$type;
        \File::put($path . '/' . $resume_name, base64_decode($resume));

        $user_record = DeveloperDetail::where('user_id', '=', $user_id)->first();

        if($user_record){

            $user_record->resume = $resume_name;
            $user_record->save();
        }else{

            $user_record = new DeveloperDetail;
            $user_record->user_id = $user_id;
            $user_record->resume = $resume_name;
            $user_record->save();
        }

        return response()->json([
            'status' => 'success',
            'view' => $user_record,
            'storage path' => Storage_path(),
            'path' => $path
        ]);

    }

    function retrieveUserImages($id = Null){

        if($id){
            $user = User::where('id', '=', $id)->first();
        }else{

            $user = Auth::user();
        }
        
        $user_images = $user->Images()->get();
        return response()->json([
            'status' => 'success',
            'data' => $user_images
        ]);
    }

    function deleteUserImage(Request $request){

        $user_id = Auth::id();

        $image_id = $request->image_id;
        
        $image = Image::where('id', '=', $image_id)->first();
        $image_url = $image->image_url;

        $image_path = public_path('storage/users/' . $user_id . '/user_images'. '/'. $image_url);

        if (\File::exists($image_path)) {
            unlink($image_path);
        }

        $image->delete();

        return response()->json([
            'status' => 'success'
        ]);
    }

    function swipe(Request $request){

        $user = Auth::user();
        $user_id = Auth::id();
        $swiped_user_id = $request->swiped_user_id;

        $swipe_exists = $user->Swipes()->where('swiped_user_id', $swiped_user_id)->first();

        if(!$swipe_exists){

            $swipe = new Swipe;
            $swipe->user_id = $user_id;
            $swipe->swiped_user_id = $swiped_user_id;
            $swipe->is_liked = $request->is_liked;
            $swipe->save();
    
            $is_swiped = Swipe::where(function ($query) use ($user_id, $swiped_user_id){
                $query->where('user_id', $user_id)->where('swiped_user_id', $swiped_user_id)->where('is_liked', true);
            })->orWhere(function ($query) use ($user_id, $swiped_user_id){
                $query->where('user_id', $swiped_user_id)->where('swiped_user_id', $user_id)->where('is_liked', true);
            })->count() == 2;

            if($is_swiped){

                $match = new UserMatch;
                $match->user_one_id = $user_id;
                $match->user_two_id = $swiped_user_id;
                $match->save();
            }
    
            return response()->json([
                'status' => 'success',
                'data' => $is_swiped
            ]);

        }
        return response()->json([
            'status' => 'already',
        ]);

    }

    function viewMatches(){

        $user_id = Auth::id();

        $my_matches = UserMatch::where(function ($query) use ($user_id){
            $query->where('user_one_id', $user_id)->orWhere('user_two_id', $user_id);
        })->get();

        return response()->json([
            'status' => 'success',
            'data' => $my_matches,
        ]);
    }

    function viewInterested(){

        $user_id = Auth::id();

        // $is_interested = Swipe::whereNot(function ($query) use ($user_id){
        //     $query->where('user_id', $user_id);
        // })->where(function ($query) use ($user_id){
        //     $query->where('swiped_user_id', $user_id)
        //     ->where('is_liked', 1);
        // })->get();

        $is_interested = Swipe::where(function ($query) use ($user_id){
            $query->where('swiped_user_id', $user_id)
            ->where('is_liked', 1);
        })->whereNotIn('user_id', function ($query) use ($user_id){
            $query->select('swiped_user_id')->from('swipes')->where('user_id', $user_id);
        })->get();

        return response()->json([
            'status' => 'success',
            'data' => $is_interested,
            'my id' => $user_id
        ]);
    }

    function analysis(){

        $user = Auth::user();
        $user_id = Auth::id();

        $matched_count = $user->Matched()->where('user_one_id', '=', $user_id)->orWhere('user_two_id', '=', $user_id)->get()->count();

        $skipped_count = Swipe::where('swiped_user_id', '=', $user_id)->where('is_liked', '=', 0)->get()->count();

        $liked_count = Swipe::where('swiped_user_id', '=', $user_id)->where('is_liked', '=', 1)->get()->count();

        // $matched_count = UserMatch::where('user_one_id', '=', $user_id)->orWhere('user_two_id', '=', $user_id)->get()->count();

        // $matched_count = UserMatch::where('user_one_id', '=', $user_id)->orWhere('user_two_id', '=', $user_id)->get()->count();

        return response()->json([
            'status' => 'success',
            'matched count' => $matched_count,
            'skipped count' => $skipped_count,
            'liked count' => $liked_count,
            'ana'=> $user_id
        ]);
    }

    function displayUsers(){

        $user = Auth::user();
        $user_id = Auth::id();
        $user_type = $user->user_type_id;

        $swiped_user = $user->Swipes()->pluck('swiped_user_id')->toArray('swiped_user_id');

        $compare_user = User::whereNotIn('id',function ($query) use ($swiped_user){
            $query->select('id')->from('users')->whereIn('id', $swiped_user);
        })->where('user_type_id', '!=', $user_type)->where('user_type_id', '!=', 1)->where('id', '!=', $user_id)->paginate(2);

        return response()->json([
            'status' => 'success',
            // 'user' => $user_id,
            // 'data' => $swiped_user,
            'compare' => $compare_user
        ]);
    }
}
