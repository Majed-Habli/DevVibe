<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserMatch extends Model
{
    use HasFactory;

    // public function User(){
    //     return $this->BelongsTo(User::class, 'user_one_id'); // belongsToMany ?
    // }

    public function Messages(){
        return $this->hasMany(Message::class, 'match_id'); // belongs ?
    }
}
