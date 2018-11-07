<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
	protected $primaryKey = 'moduleid';
	public $timestamps = false;

	protected $casts = [
		'phaseid' => 'int',
		'dashboardid' => 'int',
	];

	protected $fillable = [
		'phaseid',
		'dashboardid',
	];

	public function phase() 
	{
		return $this->belongsTo(\App\Models\Phase::class, 'phaseid');
	}

	public function dashboard()
	{
		return $this->belongsTo(\App\Models\Dashboard::class, 'dashboardid');
	}
}
