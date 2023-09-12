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
            $table->integer('user_type_id');
            $table->string('user_name');
            $table->string('email')->unique();
            $table->string('password')->nullable();
            $table->string('country');
            // $table->string('gender');
            // $table->string('resume')->nullable();
            // $table->string('description')->nullable();
            // $table->string('company_name')->nullable();
            $table->string('profile_image_url')->nullable();
            $table->boolean('has_access')->default(false);
            $table->integer('view_count')->default(0);
            $table->integer('device_token')->nullable();
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
            $table->string('name');
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

        Schema::create('user_matches', function (Blueprint $table) {
            $table->id();
            $table->integer('user_one_id');
            $table->integer('user_two_id');
            $table->timestamps();
        });

        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->integer('match_id');
            $table->integer('sender_id');
            $table->integer('receiver_id');
            $table->text('message');
            $table->timestamps();
        });

        Schema::create('developer_details', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('gender')->nullable();
            $table->string('resume')->nullable();
            $table->string('description')->nullable();
            $table->string('github_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->timestamps();
        });

        Schema::create('recruiter_details', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('company_name')->nullable();
            $table->string('description')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->timestamps();
        });

        Schema::create('blocked_users', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
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
        Schema::dropIfExists('user_matchs');
        Schema::dropIfExists('messages');
        Schema::dropIfExists('developer_details');
        Schema::dropIfExists('recruiter_details');
        Schema::dropIfExists('blocked_users');
    }
};
