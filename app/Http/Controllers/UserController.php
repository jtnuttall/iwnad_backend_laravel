<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Pairing;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
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
            'permissions' => 'required|int',
        ]);

        if($validator->fails()){
                return response()->json($validator->errors()->toJson(), 400);
        }

        $user = User::create([
            'email' => $request->get('email'),
            'password' => Hash::make($this->makeMagicCode($request->get('email'))),
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

    public function pair(Request $request)
    {
        error_log('user pair request');

        $mentorEmail = $request->get('mentor');
        $menteeEmail = $request->get('mentee');

        $mentor = User::where('email', $mentorEmail)->first();
        if (is_null($mentor)) {
            error_log('no such email "'.$mentorEmail.'" in DB');
            return response()->json(['invalid_mentor'], 400);
        }
        if ($mentor->permissions != 1) {
            error_log('email '.$mentorEmail.' is not a mentor email');
            return response()->json(['invalid_mentor'], 400);
        }

        $mentee = User::where('email', $menteeEmail)->first();
        if (is_null($mentee)) {
            error_log('no such email "'.$menteeEmail.'" in DB');
            return response()->json(['invalid_mentee'], 400);
        }
        if ($mentee->permissions != 2) {
            error_log('email '.$menteeEmail.' is not a mentee email');
            return response()->json(['invalid_mentee'], 400);
        }

        error_log('both users exist and are of the correct type: ');
        error_log('construct new pairing');

        $pairing = new Pairing();
        $pairing->mentorid = $mentor->userid;
        $pairing->menteeid = $mentee->userid;
        $pairing->save();

        error_log('success');

        return response()->json(compact('pairing'));
    }
}