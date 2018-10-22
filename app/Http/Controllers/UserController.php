<?php

namespace App\Http\Controllers;

use JWTAuth;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    /**
     *
     */
    public function authenticate(Request $request)
    {
    	error_log('authentication request');
        $credentials = $request->only('email', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                error_log('invalid creds');
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            error_log('no token created');
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        error_log('success');
        return response()->json(compact('token'));
    }

    /**
     * Create magic code from time
     * @param email
     * @return string
     */
    private function makeMagicCode($email)
    {
    	$result = time() & 0xFFFFFF;
        $result = substr(pack("H*", $result), 2);
        error_log('magic code for '.$email.' is: '.$result);
    	return $result;
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'permissions' => 'required|int|between:0,2',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 400);
        }

        // $magicCode = Hash::make($this->makeMagicCode($request->get('email')));

        $user = User::create([
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'permissions' => $request->get('permissions'),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user','token'),201);
    }

    public function addUserInfo(Request $request)
    {

    }

    public function getAuthenticatedUser()
    {
        try {
            if (! $user = JWTAuth::parseToken()->authenticate()) {
                    return response()->json(['user_not_found'], 404);
            }

        } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

            return response()->json(['token_expired'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

        	return response()->json(['token_invalid'], $e->getStatusCode());

        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

            return response()->json(['token_absent'], $e->getStatusCode());

        }

        return response()->json(compact('user'));
    }

    public function forgotPassword()
    {

    }

    public function changePassword(Request $request)
    {

    }

    public function getAllUsers(Request $request)
    {
        error_log('all users requested');

        $count = $request->get('count');
        if (is_null($count)) {
            error_log('no per-page count given');
            $count = 15;
        }
        error_log('per-page count is '.$count);

        $users = User::paginate($count);

        return response()->json(compact('users'));
    }
}