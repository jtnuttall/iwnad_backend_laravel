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
    Route::get('user', 'UserController@getAuthenticatedUser');
    Route::post('pair', 'UserController@pair');
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
