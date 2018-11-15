<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resource extends Model
{
	protected $primaryKey = 'resourceid';
	public $timestamps = false;

	protected $casts = [
		'phaseid' => 'int',
	];

	protected $fillable = [
		'name',
		'link',
		'phaseid',
	];


	public function module()
	{
		return $this->belongsTo(\App\Models\Phase::class, 'phaseid');
	}
}
