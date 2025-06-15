<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::with('permissions')->get();
        return Inertia::render('superadmin/manage-roles', [
            'roles' => $roles,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Role::create([
            'name' => $request->name,
        ]);

        return redirect()->back()->with('success', 'New Role created successfully.');
    }

    public function update(Role $role, Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $role->update($request->only('name'));
        return redirect()->back()->with('success', 'Role updated successfully.');
    }

    public function destroy(Role $role)
    {
        $currentUserRoleId = Auth::user()?->role?->id;

        if ($role->id === $currentUserRoleId) {
            return redirect()->back()->with('error', 'You cannot delete a role assigned to your own account.');
        }

        try {
            DB::transaction(function () use ($role) {
                // Detach all permissions first
                $role->permissions()->detach();

                // Then delete the role
                $role->delete();
            });

            return redirect()->back()->with('success', 'Role deleted successfully.');
        } catch (\Throwable $e) {
            Log::error('Error deleting role: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete role.');
        }
    }
}
