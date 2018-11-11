<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\Doclink;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DoclinkController extends Controller
{
  	public function addLink(Request $request){

        error_log('in addLink');

        //$user = Auth::user();

        $validator = Validator::make($request->all(), [
                'link' => 'string|required',
          ]);

         if ($validator->fails()) {
           return response()->json($validator->errors()->toArray(), 400);
         }

         Doclink::create([
            'link' => $request->get('link'),
            'moduleid' => $request->get('moduleid'),
            
         ]);

           return response()->json([
            	'status' => 'doclink added',
        	]);
      }

      public function deleteLink(Request $request){

        error_log(' in deleteLink');

        //$user = Auth::user();

        $doc = DocLink::where('doclinkid', $request->get('doclinkid'));

        $doc->delete();

         return response()->json([
            'status' => 'doclink deleted',
        ]);
    }

}
