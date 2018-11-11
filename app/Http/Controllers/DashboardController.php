<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use Auth;
use App\Models\User;
use App\Models\Pairing;
use App\Models\Dashboard;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Validator;

class DashboardController extends Controller
{
    public function getDashboards(Request $request)
    {
    	error_log('dashboard request');

    	$validator = Validator::make($request->all(), [
            'email' => 'string|email',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        //$user = Auth::user();
        //$maybeuser = User::where('email', $request->get('email'));


       /* if ($user->userid != $maybeuser->userid) {
        	if ($user->permissions != env('ADMIN_PERMISSIONS')) {
        		return response()->json(['status' => 'forbidden'], 403);
        	}
        	else {
        		$user = $maybeuser;
        	}
        }
*/
        $user = User::where('email', $request->get('email'))->first();

        /** 
         * TODO 
         * There's probably a query for the following. Unsure what it
         * is at the moment. Obviously getting each pair for the user
         * and then manually constructing the dashboards collection
         * seems wrong.
         */
        $pairings = Pairing::where('mentorid', $user->userid)
        					->orWhere('menteeid', $user->userid)
        					->get();

        $dashboards = new Collection();
        foreach ($pairings as $pair) {
        	$dashboards->push(
        		Dashboard::where('pairingid', $pair->pairingid)->first()
        	);
        }

        return response()->json(compact('dashboards'));
    }
}
