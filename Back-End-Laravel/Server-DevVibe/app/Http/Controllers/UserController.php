<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserSkill;
// use App\Models\Skill;
// use App\Models\User;
use Auth;

class UserController extends Controller
{
    function profile(){

        $user = Auth::User();

        return response()->json([
            'status' => 'success',
            'data' => $user
        ]);
    }

    function addSkills(Request $request){

        $user = Auth::id();
        $dataArray = json_decode($request->input('user_skills'), true);

        foreach($dataArray as $data){
            $user_skills = new UserSkill;
            $user_skills->user_id = $user;
            $user_skills->skill_id = $data;

            $user_skills->save();
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
        // $courses = $user->EnrolledCourses()->with(['AttendanceByStudent' => function ($query) use ($user_id) {
    }
}
