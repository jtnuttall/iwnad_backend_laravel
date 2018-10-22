<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('register', 'UserController@register');
Route::post('login', 'UserController@authenticate');

Route::group(['middleware' => ['jwt.verify']], function() {
    Route::post('user', 'UserController@getAuthenticatedUser');
    
    Route::post('currentpairs', 'PairingController@getCurrentPairs');
});

Route::group(['middleware' => ['admin.verify']], function() {
	Route::post('allusers', 'UserController@getAllUsers');

    Route::post('pair', 'PairingController@pair');
    Route::post('deletepair', 'PairingController@deletePair');
	Route::post('allpairs', 'PairingController@getAllPairs');
});

// Route::group(
// 	['prefix' => 'auth'], 
// 	function () {
// 	    Route::post('login', 'UserController@authenticate');
// 	    Route::post('register', 'UserController@register');
// 	    Route::post('firstpass', 'UserController@changePassword');
// 	    Route::post('forgotpass', 'UserController@forgotPassword');
// 	    Route::post('addinfo', 'UserController@addUserInfo');
	  
// 	    Route::group(
// 	    	['middleware' => 'auth:api'], 
// 	    	function() {
// 		        Route::get('logout', 'UserController@logout');
// 		        Route::get('user', 'UserController@getAuthenticatedUser');
// 	    	}
// 	    );
// 	}
// );

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
