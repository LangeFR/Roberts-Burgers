<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Models\User;

class AuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();
        //$token = "4LsqH7WLHN";
        $user = User::where("remember_token", $token)->first();
        if (!$user) {
            return response()
            ->json(['error' => 'Usuario no autorizado'], 401);
        }

      return $next($request);
    }
}
