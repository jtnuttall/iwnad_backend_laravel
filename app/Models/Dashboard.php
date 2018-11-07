<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 17 Oct 2018 00:32:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Dashboard
 * 
 * @property int $dashboardid
 * @property \Carbon\Carbon $meetingtime
 * @property int $parentdashboardid
 * @property int $pairingid
 * @property int $currentphaseid
 * @property int $currentphasestatus
 * 
 * @property \App\Models\Pairing $pairing
 * @property \App\Models\Phase $phase
 * @property \Illuminate\Database\Eloquent\Collection $doclinks
 *
 * @package App\Models
 */
class Dashboard extends Eloquent
{
	protected $primaryKey = 'dashboardid';
	public $timestamps = false;

	protected $casts = [
		'pairingid' => 'int',
		'currentphaseid' => 'int',
		'currentphasestatus' => 'int',
		// 'requestorid' => 'int',
	];

	protected $dates = [
		'meetingtime'
	];

	protected $fillable = [
		'pairingid',
		'currentphaseid',
		'currentphasestatus',
		// 'requestorid',
		'meetingtime',
	];

	public function pairing()
	{
		return $this->belongsTo(\App\Models\Pairing::class, 'pairingid');
	}

	public function phase()
	{
		return $this->belongsTo(\App\Models\Phase::class, 'currentphaseid');
	}

	public function doclinks()
	{
		return $this->hasMany(\App\Models\Doclink::class, 'dashboardid');
	}

	public function availabilities()
	{
		return $this->hasMany(\App\Models\Availability::class, 'dashboardid');
	}

	public function modules()
	{
		return $this->hasMany(\App\Models\Module::class, 'dashboardid');
	}
}
