<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\User;
use App\Models\Pairing;
use App\Models\Dashboard;
use App\Models\Module;
use App\Models\Phase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PairingController extends Controller
{
   private function createDashboard($pairingid){

        error_log('trying to create dashboard');

        $dashboard = Dashboard::create([
            'pairingid' => $pairingid,
            'currentphaseid'=> Phase::first()->value('phaseid'),
            'currentphasestatus' => 0,
        ]);

        $allPhases = Phase::all();

        foreach($allPhases as $phase){
        Module::create([
            'phaseid' => $phase->phaseid,
            'dashboardid' => $dashboard->value('dashboardid'),
        ]);
        }
    }
    
    public function pair(Request $request)
    {
        error_log('user pair request');

        $validator = Validator::make($request->all(), [
            'mentor' => 'required|string|email',
            'mentee' => 'required|string|email',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $mentorEmail = $request->get('mentor');
        $menteeEmail = $request->get('mentee');

        $mentor = User::where('email', $mentorEmail)->first();
        if (is_null($mentor)) {
            error_log('no such email "'.$mentorEmail.'" in DB');
            return response()->json([
            	'status' => 'nonexistent_mentor'
            ], 400);
        }
        if ($mentor->permissions != env('MENTOR_PERMISSIONS')) {
            error_log('email '.$mentorEmail.' is not a mentor email');
            return response()->json([
            	'status' => 'invalid_mentor'
            ], 400);
        }

        $mentee = User::where('email', $menteeEmail)->first();
        if (is_null($mentee)) {
            error_log('no such email "'.$menteeEmail.'" in DB');
            return response()->json([
            	'status' => 'nonexistent_mentee'
            ], 400);
        }
        if ($mentee->permissions != env('MENTEE_PERMISSIONS')) {
            error_log('email '.$menteeEmail.' is not a mentee email');
            return response()->json([
            	'status' => 'invalid_mentee'
            ], 400);
        }

        error_log(
            'both users exist and are of the correct type: '
            .'construct new pairing'
        );

        $pairing = new Pairing();
        $pairing->mentorid = $mentor->userid;
        $pairing->menteeid = $mentee->userid;
        $pairing->save();

        error_log('success');
        error_log('pairingid:' + $pairingid);

        //create_dashboard($pairing->value($pairing->pairingid));

        return response()->json(compact('pairing'));
    }

    public function deletePair(Request $request)
    {
    	error_log('delete user pair request');

        $validator = Validator::make($request->all(), [
        	'pairid' => 'required|int',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        $result = Pairing::find($request->get('pairid'))->delete();

        return response()->json([
        	'status' => 'successfully deleted pair',
        ]);
    }

    public function getCurrentPairs(Request $request)
    {
    	error_log('pairs for current user requested');

    	$user = Auth::user();
    	error_log($user->email.' is current');

    	$pairings = Pairing::with(['mentor', 'mentee'])
    					->where('mentorid', $user->userid)
    					->orWhere('menteeid', $user->userid)
    					->get();

    	foreach ($pairings as &$pairing) {
	        if ($pairing['mentor']->userid === $user->userid) {
	        	$pairing['current'] = $pairing['mentor'];
	        	$pairing['match'] = $pairing['mentee'];
	        } else {
	        	$pairing['current'] = $pairing['mentee'];
	        	$pairing['match'] = $pairing['mentor'];
	        }
	        unset($pairing['mentor']);
	        unset($pairing['mentee']);
	    }

    	return response()->json(compact('pairings'));
    }

    public function getAllPairs(Request $request)
    {
        error_log('all pairs requested');

        // $count = $request->get('count');
        // if (is_null($count)) {
        //     error_log('no per-page count given');
        //     $count = 15;
        // }
        // error_log('per-page count is '.$count);

        // $pairings = Pairing::with(['mentor', 'mentee'])->paginate($count);
        $user = Auth::user();

        $pairings = Pairing::with(['mentor', 'mentee'])->get();

        return response()->json(compact('pairings'));
    }
}
