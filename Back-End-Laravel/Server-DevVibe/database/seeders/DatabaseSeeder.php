<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        DB::table('user_types')->insert([
            'title' => "Admin",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('user_types')->insert([
            'title' => "Developer",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('user_types')->insert([
            'title' => "Recruiter",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "PHP",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "Html",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "CSS",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "Java",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "C#",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "C++",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "Python",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "Laravel",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "React",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "React-native",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "Angular",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "Flutter",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "Android Studio",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "Bootstrap",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "Figma",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "MySQL",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "Express.js",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "Node.js",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "TypeScript",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "JavaScript",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('skills')->insert([
            'name' => "Git",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('blocked_users')->insert([
            'user_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 2,
            'user_name' => 'Ahmad habli',
            'email' => 'ahmad@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 2,
            'user_name' => 'Ali habli',
            'email' => 'Ali@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 2,
            'user_name' => 'Alaa Samya',
            'email' => 'alaa@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 2,
            'user_name' => 'Jomaa Allawi',
            'email' => 'Joumaa@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 2,
            'user_name' => 'Omar Accoume',
            'email' => 'Omar@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 2,
            'user_name' => 'Thouraya Nabawe',
            'email' => 'thouraya@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 2,
            'user_name' => 'Mike Taisen',
            'email' => 'Mike@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
        
        DB::table('users')->insert([
            'user_type_id' => 2,
            'user_name' => 'Jules Moon',
            'email' => 'Jules@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 2,
            'user_name' => 'Hioumi Faiez',
            'email' => 'Hioumi@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 2,
            'user_name' => 'Marry Anne',
            'email' => 'Marry@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);


        DB::table('users')->insert([
            'user_type_id' => 2,
            'user_name' => 'Micheal Kile',
            'email' => 'micheal@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 2,
            'user_name' => 'James lias',
            'email' => 'james@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 3,
            'user_name' => 'Alex Farrow',
            'email' => 'alex@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 3,
            'user_name' => 'Fiona Kaleb',
            'email' => 'fiona@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 3,
            'user_name' => 'Fissure baraa',
            'email' => 'Fissure@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 3,
            'user_name' => 'Nabil Hamza',
            'email' => 'nabil@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 3,
            'user_name' => 'Barry Alan',
            'email' => 'berry@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
        
        DB::table('users')->insert([
            'user_type_id' => 3,
            'user_name' => 'Sam Aloha',
            'email' => 'sam@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 3,
            'user_name' => 'Shawn Matiaz',
            'email' => 'Shawn@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 3,
            'user_name' => 'Diaz Anderson',
            'email' => 'diaz@gmail.com',
            'password' => Hash::make('12345'),
            'country' => 'KE',
            'profile_image_url' => '',
            'view_count' => 0,
            'has_access' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('user_skills')->insert([
            'user_id' => 3,
            'skill_id' => 2,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
        DB::table('user_skills')->insert([
            'user_id' => 3,
            'skill_id' => 7,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
        DB::table('user_skills')->insert([
            'user_id' => 7,
            'skill_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
        DB::table('user_skills')->insert([
            'user_id' => 7,
            'skill_id' => 5,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
        DB::table('user_skills')->insert([
            'user_id' => 20,
            'skill_id' => 11,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
        DB::table('user_skills')->insert([
            'user_id' => 11,
            'skill_id' => 13,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
        DB::table('user_skills')->insert([
            'user_id' => 15,
            'skill_id' => 18,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
        DB::table('user_skills')->insert([
            'user_id' => 18,
            'skill_id' => 3,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
        DB::table('user_skills')->insert([
            'user_id' => 9,
            'skill_id' => 11,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
        DB::table('user_skills')->insert([
            'user_id' => 10,
            'skill_id' => 3,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
        DB::table('user_skills')->insert([
            'user_id' => 15,
            'skill_id' => 12,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
        DB::table('user_skills')->insert([
            'user_id' => 6,
            'skill_id' => 3,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
        DB::table('user_skills')->insert([
            'user_id' => 8,
            'skill_id' => 1,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
        DB::table('user_skills')->insert([
            'user_id' => 9,
            'skill_id' => 9,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
        DB::table('user_skills')->insert([
            'user_id' => 18,
            'skill_id' => 14,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);
        DB::table('user_skills')->insert([
            'user_id' => 14,
            'skill_id' => 3,
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

    }
}
