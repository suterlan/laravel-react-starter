<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PermissionController extends Controller
{
    public function index()
    {
        return Inertia::render('superadmin/manage-permissions', [
            'permissions' => Permission::with('roles')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Permission::create([
            'name' => $request->name,
        ]);

        return redirect()->back()->with('success', 'New Permission created successfully.');
    }

    public function update(Permission $permission, Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $permission->update($request->only('name'));
        return redirect()->back()->with('success', 'Permission updated successfully.');
    }

    public function destroy(Permission $permission)
    {
        $user = Auth::user();

        // Ambil role user login
        $userRole = $user->role?->with('permissions')->first();

        // Cek apakah permission yang akan dihapus digunakan oleh salah satu role user
        $usedPermissionIds = $userRole?->permissions->pluck('id') ?? collect();

        if ($usedPermissionIds->contains($permission->id)) {
            return redirect()->back()->with('error', 'You cannot delete a permission that is assigned to your own role.');
        }

        try {
            DB::transaction(function () use ($permission) {
                // Detach all permissions first
                $permission->roles()->detach();

                // Then delete the Permission
                $permission->delete();
            });

            return redirect()->back()->with('success', 'Permission deleted successfully.');
        } catch (\Throwable $e) {
            Log::error('Error deleting Permission: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to delete Permission.');
        }
    }
}
