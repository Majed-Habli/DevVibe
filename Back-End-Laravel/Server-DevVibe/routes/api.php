<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AnalyticsController;
// use App\Http\Controllers\WatcherController;
// use App\Http\Controllers\WatcherController;

Route::group(['prefix'=>'user'], function (){
    Route::group(['prefix' => 'developer'], function(){
        Route::get('/profile/{id?}', [UserController::class, 'profile']);
        Route::post('/add_skills', [UserController::class, 'addSkills']);
        Route::get('/view_user_skills/{id?}', [UserController::class, 'viewUserSkills']);
        Route::get('/view_all_skills/{search?}', [UserController::class, 'viewAllSkills']);
        Route::post('/upload_profile_pic', [UserController::class, 'uploadProfilePic']);
        Route::post('/update-details', [UserController::class, 'updateDetails']);
        Route::post('upload_user_images', [UserController::class, 'uploadUserImages']);
        Route::post('remove_skills', [UserController::class, 'removeSkills']);
        Route::get('retrieve_user_images/{id?}', [UserController::class, 'retrieveUserImages']);
        Route::post('swipe', [UserController::class, 'swipe']);
        Route::get('view_matches', [UserController::class, 'viewMatches']);
        Route::get('view_interested', [UserController::class, 'viewInterested']);
        Route::get('analysis', [UserController::class, 'analysis']);
    });
    Route::group(['prefix' => 'admin'], function(){
        Route::get('new_developers', [AnalyticsController::class, 'newDevelopers']);
    });

});

Route::group(['prefix' => 'guest'], function(){
    Route::get('unauthorized', [AuthController::class, 'unauthorized'])->name('unauthorized');
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});