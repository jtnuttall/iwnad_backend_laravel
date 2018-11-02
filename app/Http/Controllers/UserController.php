<?php

namespace App\Http\Controllers;

use Auth;
use JWTAuth;
use App\Models\User;
use App\Models\Pairing;
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
        error_log(implode($credentials));
        // error_log('email: '.$credentials['email']);
        // error_log('password: '.$credentials['password']);

        try {
            if (! $access_token = JWTAuth::attempt($credentials)) {
                error_log('invalid creds');
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            error_log('no token created');
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        $user = Auth::user();
        error_log('success');
        return response()->json(compact('user', 'access_token'));
    }

    /**
     * Create magic code from rand()
     * @param email
     * @return string
     */
    private function makeMagicCode($email)
    {
    	$result = rand() & 0xFFFFFF;
        $result = dechex($result);
        error_log('magic code for '.$email.' is: '.$result);
    	return $result;
    }

    public function register(Request $request)
    {
        error_log('registration request');

        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'name' => 'required|string|max:64',
            'permissions' => 'required|int|between:0,2',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toArray(), 400);
        }

        // $magicCodeHash = Hash::make($this->makeMagicCode($request->get('email')));

        $user = User::create([
            'email' => $request->get('email'),
            'username' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
            'name' => $request->get('name'),
            'permissions' => $request->get('permissions'),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json(compact('user','token'), 201);
    }

    /**
     * TODO: determine how to upload profile picture
     */
    public function updateUser(Request $request)
    {
        $user = Auth::user();
        error_log('user update request for '.$user->name);

        if ($user->firstlogin) {
            $validator = Validator::make($request->all(), [
                'profilepic' => 'file|required',  // mimes?
                'occupation' => 'string|required|max:64',
                'organization' => 'string|required|max:45',
                'phone' => 'string|required|max:20',
            ]);

            if($validator->fails()){
                return response()->json($validator->errors()->toArray(), 400);
            }

            $user->firstlogin = false;
        }

        $validator = Validator::make($request->all(), [
                'email' => 'string|email|max:255|unique:users',
                'bio' => 'string|max:65535',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toArray(), 400);
        }

        $email = $request->get('email');
        // $name = $request->get('name');
        $profilepic = $request->file('profilepic');
        $occupation = $request->get('occupation');
        $organization = $request->get('organization');
        $phone = $request->get('phone');
        $bio = $request->get('bio');

        if (!is_null($email)) {
            $this->notifyEmailChange($user, $email);
            $user->email = $email;
            $user->username = $username;
        }
        if (!is_null($name)) {
            $user->name = $name;
        }
        if (!is_null($profilepic)) {
            $user->profilepic = $profilepic->store('profilepics');
        }
        if (!is_null($occupation)) {
            $user->occupation = $occupation;
        }
        if (!is_null($organization)) {
            $user->organization = $organization;
        }
        if (!is_null($phone)) {
            $user->phone = $phone;
        }
        if (!is_null($bio)) {

        }

        $user->save();

        return response()->json([
            'status' => 'user_update_success'
        ]);
    }

    private function notifyEmailChange(User $user, string $newEmail)
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
        error_log('password change request');

        $validator = Validator::make($request->all(), [
            'password' => 'required|string|min:6',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toArray(), 400);
        }

        $user = Auth::user();
        $user->password = Hash::make($request->get('password'));
        $user->save();

        return response()->json([
            'status' => 'password change successful',
        ]);
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

    public function getUnpairedUsers(Request $request)
    {
        error_log('unpaired users requested');

        $count = $request->get('count');
        if (is_null($count)) {
            error_log('no per-page count given');
            $count = 15;
        }
        error_log('per-page count is '.$count);

        $users = User::whereDoesntHave('mentorPairings')
                        ->whereDoesntHave('menteePairings')
                        ->where('permissions', '<>', env('ADMIN_PERMISSIONS'))
                        ->paginate($count);

        return response()->json(compact('users'));
    }

    public function deleteUser(Request $request){
        error_log('deleting a user');

        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users',
        ]);
        if($validator->fails()){
            return response()->json($validator->errors()->toArray(), 400);
        }

        $user = User::whereDoesntHave('mentorPairings')
                    ->whereDoesntHave('menteePairings')
                    ->where('email', $request->get('email'))
                    ->first();
        
        if (is_null($user)) {
            $pairings = Pairing::with(['mentor', 'mentee'])
                ->where('mentorid', $user->userid)
                ->orWhere('menteeid', $user->userid)
                ->get();

            return response()->json([
                'status' => 'user has existing pairings',
                'pairings' => $pairings,
            ], 400);
        }

        $user->delete();

        return response()->json([
            'status' => 'user deleted',
        ]);
    }
}