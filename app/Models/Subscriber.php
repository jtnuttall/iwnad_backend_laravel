<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    protected $primaryKey = 'subscriberid';
    public $timestamps = false;

    protected $fillable [
    	'email'
    ];
}
