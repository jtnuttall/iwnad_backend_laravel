<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Subscriber;
use Illuminate\Support\Facades\Validator;

class SubscriberController extends Controller
{
	public function addSubscriber(Request $request)
	{
		error_log('add new subscriber');

		$validator = Validator::make($request->all(), [
            'email' => 'required|email|max:250|unique:subscribers'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $subscriber = new Subscriber();
        $subscriber->email = $request->get('email');
        $subscriber->save();

        return response()->json([
        	'status' => 'subscriber added'
        ], 200);
	}

    public function getSubscribers(Request $request)
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
     		return response()->json(compact('result'));
        }

        $count = (int) $request->get('count');
        if (is_null($count)) {
        	$count = 15;
        }

        $result = Subscriber::paginate($count);
        return response()->json(compact('result'));
    }
}
