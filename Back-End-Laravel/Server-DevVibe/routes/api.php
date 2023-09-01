<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::group(['prefix'=>'user'], function (){
    Route::group(['prefix' => 'developer'], function(){
        Route::get('/profile', [UserController::class, 'profile']);
        Route::post('/add_skills', [UserController::class, 'addSkills']);
        Route::get('/view_user_skills', [UserController::class, 'viewUserSkills']);
    });
});

Route::group(['prefix' => 'guest'], function(){
    Route::get('unauthorized', [AuthController::class, 'unauthorized'])->name('unauthorized');
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});