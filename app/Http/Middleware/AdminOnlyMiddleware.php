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
        try {
            $user = JWTAuth::parseToken()->authenticate();

            if ($user->permissions != env('ADMIN_PERMISSIONS')) {
                return response()->json([
                    'status' => 'insufficient_permissions'
                ]);
            }
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException) {
                return response()->json([
                    'status' => 'token_invalid'
                ]);
            }
            else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException) {
                return response()->json([
                    'status' => 'token_expired'
                ]);
            }
            else {
                return response()->json([
                    'status' => 'token_not_found'
                ]);
            }
        }
        
        return $next($request);
    }
}
