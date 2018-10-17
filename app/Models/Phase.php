<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 17 Oct 2018 00:32:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Phase
 * 
 * @property int $phaseid
 * @property string $name
 * 
 * @property \Illuminate\Database\Eloquent\Collection $dashboards
 * @property \Illuminate\Database\Eloquent\Collection $doclinks
 *
 * @package App\Models
 */
class Phase extends Eloquent
{
	protected $primaryKey = 'phaseid';
	public $timestamps = false;

	protected $fillable = [
		'name'
	];

	public function dashboards()
	{
		return $this->hasMany(\App\Models\Dashboard::class, 'currentphaseid');
	}

	public function doclinks()
	{
		return $this->hasMany(\App\Models\Doclink::class, 'phaseid');
	}
}
