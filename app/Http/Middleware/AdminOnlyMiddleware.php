<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class AdminOnlyMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        // error_log('admin-only auth request');
        // dd($request);
        // error_log($request->header('authorization'));
        
        try {
            $user = JWTAuth::parseToken()->authenticate();

            if ($user->permissions != env('ADMIN_PERMISSIONS')) {
                return response()->json([
                    'status' => 'insufficient_permissions'
                ], 401);
            }
        } 
        catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json([
                'status' => 'token_invalid'
            ], 401);
        }
        catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json([
                'status' => 'token_expired'
            ], 401);
        }
        catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json([
                'status' => 'no_token'
            ], 403);
        } 
        catch (Exception $e) {
            return response()->json([
                'status' => 'token_not_found'
            ], 403);
        }
        
        // error_log('admin auth successful');
        return $next($request);
    }
}
