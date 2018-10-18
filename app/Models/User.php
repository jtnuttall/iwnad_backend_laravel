<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 17 Oct 2018 00:32:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;
use Laravel\Passport\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

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
class User extends Authenticatable
{
	use HasApiTokens, Notifiable;

	protected $primaryKey = 'userid';
	public $timestamps = false;

	protected $casts = [
		'permissions' => 'int'
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
}
