<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 17 Oct 2018 00:32:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class User
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
class User extends Eloquent
{
	protected $primaryKey = 'userid';
	public $timestamps = false;

	protected $casts = [
		'permissions' => 'int'
	];

	protected $hidden = [
		'password'
	];

	protected $fillable = [
		'email',
		'permissions',
		'password',
		'profilepic',
		'occupation',
		'organization',
		'phone'
	];

	public function pairings()
	{
		return $this->hasMany(\App\Models\Pairing::class, 'menteeid');
	}
}
