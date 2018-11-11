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

Route::post('login', 'UserController@authenticate');
Route::post('subscribe', 'SubscriberController@addSubscriber');
Route::post('addLink','DoclinkController@addLink');
Route::post('deleteLink','DoclinkController@deleteLink');
Route::post('getDashboard','DashboardController@getDashboards');


Route::group(['middleware' => ['jwt.verify']], function() {
    Route::post('user', 'UserController@getAuthenticatedUser');
    Route::post('changepassword', 'UserController@changePassword');
    Route::post('updateuser', 'UserController@updateUser');

    Route::post('currentpairs', 'PairingController@getCurrentPairs');

    Route::post('dashboard', 'DashboardController@getDashboards');
});

Route::group(['middleware' => ['admin.verify']], function() {
	Route::post('register', 'UserController@register');
	Route::post('deleteuser', 'UserController@deleteUser');

	Route::post('allusers', 'UserController@getAllUsers');
	Route::post('unpaired', 'UserController@getUnpairedUsers');

    Route::post('pair', 'PairingController@pair');
    Route::post('deletepair', 'PairingController@deletePair');
	Route::post('allpairs', 'PairingController@getAllPairs');

	Route::post('subscribers', 'SubscriberController@getSubscribers');
});


