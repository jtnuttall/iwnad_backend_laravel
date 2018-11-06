<?php

/**
 * Created by Reliese Model.
 * Date: Wed, 17 Oct 2018 00:32:40 +0000.
 */

namespace App\Models;

use Reliese\Database\Eloquent\Model as Eloquent;

/**
 * Class Doclink
 * 
 * @property int $doclinkid
 * @property string $link
 * @property int $dashboardid
 * @property int $moduleid
 * 
 * @property \App\Models\Dashboard $dashboard
 * @property \App\Models\Phase $phase
 *
 * @package App\Models
 */
class Doclink extends Eloquent
{
	protected $primaryKey = 'doclinkid';
	public $timestamps = false;

	protected $casts = [
		'dashboardid' => 'int',
		'moduleid' => 'int',
	];

	protected $fillable = [
		'link',
		'dashboardid',
		'moduleid',
	];

	public function dashboard()
	{
		return $this->belongsTo(\App\Models\Dashboard::class, 'dashboardid');
	}

	public function module()
	{
		return $this->belongsTo(\App\Models\Module::class, 'moduleid');
	}
}
