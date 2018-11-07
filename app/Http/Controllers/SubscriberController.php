<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscriber;

class SubscriberController extends Controller
{
    public function getSubscriberList(Request $request)
    {
    	error_log('get subscriber list');

    	$validator = Validator::make($request->all(), [
            'all' => 'boolean',
            'count' => 'integer',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        if ($request->get('all') == true) {
     		$result = Subscriber::get();
     		return result()->json(compact('result'));
        }

        $count = (int) $request->get('count');
        if (is_null($count)) {
        	$count = 15;
        }

        $result = Subscriber::paginate($count);
        return response()->json(compact('result'));
    }
}
