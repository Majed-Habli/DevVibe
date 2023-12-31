<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AnalyticsController;

Route::group(['prefix'=>'user'], function (){
    Route::group(['prefix' => 'developer'], function(){
        Route::get('/profile/{id?}', [UserController::class, 'profile']);
        Route::post('/add_skills', [UserController::class, 'addSkills']);
        Route::get('/view_user_skills/{id?}', [UserController::class, 'viewUserSkills']);
        Route::get('/view_all_skills/{search?}', [UserController::class, 'viewAllSkills']);
        Route::post('/upload_profile_pic', [UserController::class, 'uploadProfilePic']);
        Route::post('/update-details', [UserController::class, 'updateDetails']);
        Route::post('upload_user_images', [UserController::class, 'uploadUserImages']);
        Route::post('upload_user_resume', [UserController::class, 'uploadUserResume']);
        Route::post('remove_skills', [UserController::class, 'removeSkills']);
        Route::post('delete_user_image', [UserController::class, 'deleteUserImage']);
        Route::get('retrieve_user_images/{id?}', [UserController::class, 'retrieveUserImages']);
        Route::post('swipe', [UserController::class, 'swipe']);
        Route::get('view_matches', [UserController::class, 'viewMatches']);
        Route::get('view_interested', [UserController::class, 'viewInterested']);
        Route::get('analysis', [UserController::class, 'analysis']);
        Route::get('display_users', [UserController::class, 'displayUsers']);
    });

    Route::group(['prefix' => 'admin'], function(){
        Route::get('new_developers/{search?}', [AnalyticsController::class, 'newDevelopers']);
        Route::get('new_recruiters/{search?}', [AnalyticsController::class, 'newRecruiters']);
        Route::get('old_recruiters/{search?}', [AnalyticsController::class, 'oldRecruiters']);
        Route::get('old_developers/{search?}', [AnalyticsController::class, 'oldDevelopers']);
        Route::get('analytics', [AnalyticsController::class, 'analytics']);
        Route::post('give_access', [AnalyticsController::class, 'giveAccess']);
        Route::post('deny_access', [AnalyticsController::class, 'denyAccess']);
        Route::get('blocked_users/{search?}', [AnalyticsController::class, 'blockedUsers']);
        Route::post('is_blocked', [AnalyticsController::class, 'isBlocked']);
        Route::post('delete_skill', [AnalyticsController::class, 'deleteSkill']);
        Route::post('insert_skill', [AnalyticsController::class, 'insertSkill']);
        Route::post('edit_skill', [AnalyticsController::class, 'editSkill']);
        Route::post('stats', [AnalyticsController::class, 'stats']);
    });

});

Route::group(['prefix' => 'guest'], function(){
    Route::get('unauthorized', [AuthController::class, 'unauthorized'])->name('unauthorized');
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/logout', [AuthController::class, 'logout']);
});
Route::post('sendNotificationrToUser', [UserController::class, 'sendNotificationrToUser']);
