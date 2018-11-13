<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\Doclink;
use App\Models\Pairing;
use App\Models\Dashboard;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DoclinkController extends Controller
{
  	public function addLink(Request $request){

        error_log('in addLink');

        $user = Auth::user();

        $validator = Validator::make($request->all(), [
                'link' => 'string|required',
          ]);

         if ($validator->fails()) {
           return response()->json($validator->errors()->toArray(), 400);
         }

         /*$module = Module::where('moduleid', $request->get('moduleid'))->get();

         if($module->isEmpty()){
            return response()->json([
                'status' => 'module doesnt exist'],400);
         }*/

         $pair = Pairing::where('menteeid', $user->userid)->first();
         $dashboard = Dashboard::where('pairingid', $pair->pairingid)->first();
         $module = Module::where('dashboardid', $dashboard->dashboardid)
                        ->where('phaseid', $dashboard->currentphaseid)->first();

         Doclink::create([
            'link' => $request->get('link'),
            'moduleid' => $module->moduleid,
            
         ]);

         error_log($module->moduleid);

           return response()->json([
            	'status' => 'doclink added',
        	]);
      }

    public function deleteLink(Request $request){

        error_log(' in deleteLink');

        $user = Auth::user();

        $doc = Doclink::where('doclinkid', $request->get('doclinkid'));

        $docArray = $doc->get(); 

        if($docArray->isEmpty()){

         return response()->json([
            'status' => 'doclink doesnt exist',
        ], 404);
        }

        $doc->delete();

         return response()->json([
            'status' => 'doclink deleted',
        ]);
    }

}
