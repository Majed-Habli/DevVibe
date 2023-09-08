<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

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
}
