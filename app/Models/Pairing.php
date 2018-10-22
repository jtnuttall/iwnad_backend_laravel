<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 17 Oct 2018 00:32:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Pairing
 * 
 * @property int $pairingid
 * @property int $mentorid
 * @property int $menteeid
 * 
 * @property \App\Models\User $user
 * @property \Illuminate\Database\Eloquent\Collection $dashboards
 *
 * @package App\Models
 */
class Pairing extends Eloquent
{
	protected $primaryKey = 'pairingid';
	public $timestamps = false;

	protected $casts = [
		'mentorid' => 'int',
		'menteeid' => 'int'
	];

	protected $fillable = [
		'mentorid',
		'menteeid'
	];

	// protected $mentorid;
	// protected $menteeid;

	public function user()
	{
		return $this->belongsTo(\App\Models\User::class, 'menteeid');
	}

	public function dashboards()
	{
		return $this->hasMany(\App\Models\Dashboard::class, 'pairingid');
	}
}
