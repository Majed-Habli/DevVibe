<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Skill;
use App\Models\UserSkill;
use App\Models\DeveloperDetail;
use DB;

class AnalyticsController extends Controller
{
    //
    function newDevelopers(){

        $user = User::all()->where('has_access', false)->where('user_type_id', '=', 2);

        return response()->json([
            'status' => 'success',
            'data' => $user
        ]);
    }

    function newRecruiters(){

        $user = User::all()->where('has_access', false)->where('user_type_id', '=', 3);

        return response()->json([
            'status' => 'success',
            'data' => $user
        ]);
    }

    function oldDevelopers(){

        $user = User::all()->where('has_access', true)->where('user_type_id', '=', 2);

        return response()->json([
            'status' => 'success',
            'data' => $user
        ]);
    }

    function oldRecruiters(){

        $user = User::all()->where('has_access', true)->where('user_type_id', '=', 3);

        return response()->json([
            'status' => 'success',
            'data' => $user
        ]);
    }

    function analytics(){

        $users_count = User::all()->count();

        $developers_count = User::all()->where('user_type_id', '=', 2)->count();
        $recruiters_count = User::all()->where('user_type_id', '=', 3)->count();
        $male_count = DeveloperDetail::where('gender', '=', 'male')->count();
        $female_count = DeveloperDetail::where('gender', '=', 'female')->count();
        $countries = User::all()->pluck('country');

        $popular_stacks = UserSkill::with('Skill')->select('skill_id', DB::raw('COUNT(skill_id) as count'))->groupBy('skill_id')->orderBy('count', 'desc')->take(10)->get();

        return response()->json([
            'status' => 'success',
            'users_count' => $users_count,
            'developer_count' => $developers_count,
            'recruiters_count' => $recruiters_count,
            'male_count' => $male_count,
            'female_count' => $female_count,
            'countries' => $countries,
            'popular' => $popular_stacks,
        ]);
    }
}
