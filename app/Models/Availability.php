<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Availability extends Model
{
    protected $primaryKey = 'availabilityid';
	public $timestamps = false;

	protected $casts [
		'dashboardid' => 'int',
	];

	protected $dates [
		'begindate',
		'enddate',
	];

	protected $fillable [
		'dashboardid',
		'begindate',
		'enddate',
	];

	public function dashboard()
	{
		return $this->belongsTo(\App\Model\Dashboard::class, 'dashboardid');
	}
}
