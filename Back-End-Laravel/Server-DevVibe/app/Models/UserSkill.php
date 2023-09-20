<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserSkill extends Model
{
    use HasFactory;

    public function User(){
        return $this->belongsTo(User::class, 'id');
    }

    public function Skill(){
        return $this->belongsTo(Skill::class, 'skill_id');
    }
}
