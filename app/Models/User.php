<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 17 Oct 2018 00:32:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use Illuminate\Notifications\Notifiable;
use Illuminate\Auth\Authenticatable;
// use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Contracts\Auth\CanResetPassword as CanResetPasswordContract;
use Tymon\JWTAuth\Contracts\JWTSubject;

/**
 * Class User
 * TODO: Docs say all Eloquent models must extend Eloquent.
 *       Cannot figure out how to mesh this with Authenticatable.
 *       May cause issues, so revisit.
 * 
 * @property int $userid
 * @property string $email
 * @property int $permissions
 * @property string $password
 * @property string $profilepic
 * @property string $occupation
 * @property string $organization
 * @property string $phone
 * 
 * @property \Illuminate\Database\Eloquent\Collection $pairings
 *
 * @package App\Models
 */
class User extends Eloquent implements JWTSubject, AuthenticatableContract, CanResetPasswordContract
{
	use Notifiable, Authenticatable;

	protected $primaryKey = 'userid';
	public $timestamps = true;

	protected $casts = [
		'permissions' => 'int',
	];

	protected $hidden = [
		'password',
		'remember_token',
	];

	protected $fillable = [
		'email',
		'permissions',
		'password',
		'name',
		'profilepic',
		'occupation',
		'organization',
		'phone',
	];

	public function pairings()
	{
		return $this->hasMany(\App\Models\Pairing::class, 'menteeid');
	}

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function getEmailForPasswordReset()
    {
    	return $this->email;
    }

    public function sendPasswordResetNotification($token)
    {

    }
}
