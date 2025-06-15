<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('dashboard', [
            'usersCount' => User::count(),
            'rolesCount' => Role::count(),
            'permissionsCount' => Permission::count(),
            'roleDistribution' => Role::withCount('users')->get(['id', 'name']),
            'recentUsers' => User::with('role')->latest()->take(5)->get(['id', 'name', 'email', 'role_id']),
        ]);
    }
}
