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

        $user = Auth::user();

        $pairings = Pairing::where('mentorid', $user->userid)
        					->orWhere('menteeid', $user->userid)
        					->get();

        $dashboards = new Collection();
        foreach ($pairings as $pair) {
        	$dashboards->push(
        		Dashboard::with(['modules', 'modules.phase', 'modules.doclinks','modules.phase.resources'])
                    ->where('pairingid', $pair->pairingid)->first()
        	);
        }

        return response()->json(compact('dashboards'));
    }
}
