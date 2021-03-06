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
        // error_log(implode($credentials));
        // error_log('email: '.$credentials['email']);
        // error_log('password: '.$credentials['password']);

        try {
            if (! $access_token = JWTAuth::attempt($credentials)) {
                error_log('invalid creds');
                return response()->json(['status' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            error_log('no token created');
            return response()->json([
                'status' => 'could_not_create_token'
            ], 500);
        }

        $user = Auth::user();
        error_log('success');
        return response()->json(compact('user', 'access_token'), 200);
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
                'occupation' => 'string|required|max:64',
                'organization' => 'string|required|max:45',
                'phone' => 'string|required|max:20',
                'password' => 'string|required|min:6',
                // 'profilepic' => 'file',  
            ]);

            if($validator->fails()){
                return response()->json($validator->errors()->toArray(), 400);
            }

            $user->firstlogin = false;
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'email' => 'string|email|max:255|unique:users',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors()->toArray(), 400);
        }

        $email = $request->get('email');
        $password = $request->get('password');
        $name = $request->get('name');
        $profilepic = $request->get('profilepic');
        $occupation = $request->get('occupation');
        $organization = $request->get('organization');
        $phone = $request->get('phone');
        $bio = $request->get('bio');
        $linkedin = $request->get('linkedin');
        $facebook = $request->get('facebook');
        $instagram = $request->get('instagram');
        $twitter = $request->get('twitter');
        $availability = $request->get('availability');
        $skills = $request->get('skills');
        $interests = $request->get('interests');


        if (!is_null($email)) {
            $this->notifyEmailChange($user, $email);
            $user->email = $email;
            $user->username = $username;
        }
        if (!is_null($name)) {
            $user->name = $name;
        }
        if (!is_null($password)) {
            $user->password = Hash::make($password);
        }
        if (!is_null($profilepic)) {
            $filename_path = md5(time().uniqid()).".jpg";
            $profilepic = str_replace('data:image/png;base64,', '', $profilepic);
            $profilepic = str_replace(' ', '+', $profilepic);
            $decoded = base64_decode($$profilepic);
            file_put_contents('profilepics/'.$profilepic, $decoded);
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
        if ($request->exists('bio')) {
            $user->bio = $bio;
        }
        if ($request->exists('instagram')) {
            $user->instagram = $instagram;
        }
        if ($request->exists('linkedin')) {
            $user->linkedin = $linkedin;
        }
        if ($request->exists('facebook')) {
            $user->facebook = $facebook;
        }
        if ($request->exists('twitter')) {
            $user->twitter = $twitter;
        }
        if ($request->exists('skills')) {
            $user->skills = $skills;
        }
        if ($request->exists('availability')) {
            $user->availability = $availability;
        }
        if ($request->exists('interests')) {
            $user->interests = $interests;
        }

        $user->save();

       return response()->json(compact('user'), 200);
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

        $users = User::get();

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
                        ->get();

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

        $baseAdmin = User::where('permissions', env('ADMIN_PERMISSIONS'))->first();

        if ($baseAdmin->userid === $user->userid) {
            return response()->json([
                'status' => 'cannot_delete_base_admin'
            ], 400);
        }
        
        if (is_null($user)) {
            $user = User::where('email', $request->get('email'))
                        ->first();

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

    public function logout(Request $request){

        $user = Auth::user();
    }
}