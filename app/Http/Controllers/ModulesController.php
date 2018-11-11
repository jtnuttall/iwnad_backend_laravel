<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


class ModulesController extends Controller
{
    public function approvePhase(Request $request){
       
        error_log('in approve phase');
        
        $user = Auth::user();

        $pairing = Pairing::where('mentorid', $user->userid)
                            ->get();

        if(!is_null($pairing)){
            $dashboard = Dashboard::where('pairingid', $pairing->pairingid)->increment('currentphaseid');
        }

       return response()->json([
            'status' => 'approved',
        ]);
    }
}
