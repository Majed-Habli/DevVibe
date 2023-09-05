<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecruiterDetail extends Model
{
    use HasFactory;

    public function User(){
        return $this->belongsTo(user::class, 'id');
    }
}
