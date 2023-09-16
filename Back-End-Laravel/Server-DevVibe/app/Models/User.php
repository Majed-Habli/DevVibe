<?php

namespace App\Models;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;
use Carbon\Carbon;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

     /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function UserType(){
        return $this->hasOne(UserType::class, 'id');
    }

    public function Images(){
        return $this->hasMany(Image::class, 'user_id');
    }

    public function Skills(){
        return $this->hasMany(UserSkill::class, 'user_id');
    }

    public function Swipes(){
        return $this->hasMany(Swipe::class, 'user_id');
    }

    public function Matched(){
        return $this->hasMany(UserMatch::class, 'user_one_id'); // belongs ?
    }

    public function DevDetails(){
        return $this->hasOne(DeveloperDetail::class, 'user_id');
    }

    public function RecDetails(){
        return $this->hasOne(RecruiterDetail::class, 'user_id');
    }

    public function Blocked(){
        return $this->belongsTo(BlockedUser::class, 'user_id');
    }

    public function scopeMonthToDate($query, $column = 'created_at')
    {
        return $query->whereBetween($column, [Carbon::now()->startOfMonth(), Carbon::now()]);
    }

    // public function SentMessages(){
    //     return $this->hasMany(Message::class, 'sender_id');
    // }

    // public function ReceivedMessages(){
    //     return $this->hasMany(Message::class, 'receiver_id');
    // }

}