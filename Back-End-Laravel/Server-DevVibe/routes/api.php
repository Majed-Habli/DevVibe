<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::group(['prefix'=>'user'], function (){
    Route::group(['prefix' => 'developer'], function(){

    });
});

Route::group(['prefix' => 'guest'], function(){
    Route::get('unauthorized', [AuthController::class, 'unauthorized'])->name('unauthorized');
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
});