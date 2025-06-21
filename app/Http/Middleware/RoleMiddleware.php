<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$role): Response
    {
        if (!Auth::check() || !Auth::user()->role || !in_array(Auth::user()->role->name, $role)) {
            // Mengembalikan respons dengan status 403
            return response()->view('error-page', ['message' => 'Forbidden Role'], 403);
        }
        return $next($request);
    }
}
