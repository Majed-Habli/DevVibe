<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->integer('user_type');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('email')->unique();
            $table->string('password')->nullable();
            $table->string('resume')->nullable();
            $table->string('description');
            $table->string('profile_image_url');
            $table->boolean('has_access')->default(false);
            $table->timestamps();
        });

        Schema::create('user_types', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->timestamps();
        });

        Schema::create('images', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('image_url');
            $table->timestamps();
        });

        Schema::create('skills', function (Blueprint $table) {
            $table->id();
            $table->integer('name');
            $table->timestamps();
        });

        Schema::create('user_skills', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('skill_id');
            $table->timestamps();
        });

        Schema::create('swipes', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->integer('swiped_user_id');
            $table->boolean('is_liked')->default(false);
            $table->timestamps();
        });

        Schema::create('matchs', function (Blueprint $table) {
            $table->id();
            $table->integer('user_one_id');
            $table->integer('user_two_id');
            $table->timestamps();
        });

        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->integer('match_id');
            $table->integer('user_one_id');
            $table->integer('user_two_id');
            $table->text('message');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
        Schema::dropIfExists('user_types');
        Schema::dropIfExists('images');
        Schema::dropIfExists('skills');
        Schema::dropIfExists('user_skills');
        Schema::dropIfExists('swipes');
        Schema::dropIfExists('matchs');
        Schema::dropIfExists('messages');
    }
};
