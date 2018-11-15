<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\Module;
use App\Models\Pairing;
use App\Models\Dashboard;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ModulesController extends Controller
{
    public function approvePhase(Request $request){
       
        error_log('in approve phase');
        
        $user = Auth::user();

        $pairing = Pairing::where('mentorid', $user->userid)
                            ->first();

        if(!is_null($pairing)){
            $dashboard = Dashboard::where('pairingid', $pairing->pairingid)->increment('currentphaseid');
        }

       return response()->json([
            'status' => 'approved',
        ]);
    }
}
