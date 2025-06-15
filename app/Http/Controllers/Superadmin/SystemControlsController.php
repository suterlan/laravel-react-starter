<?php

namespace App\Http\Controllers\Superadmin;

use App\Http\Controllers\Controller;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class SystemControlsController extends Controller
{
    public function index()
    {
        return Inertia::render('superadmin/system-controls', [
            'roles' => Role::with('permissions')->get(),
            'permissions' => Permission::all(),
        ]);
    }

    public function rolePermissionUpdate(Request $request, Role $role)
    {
        $request->validate([
            'permissions' => 'array',
            'permissions.*' => 'exists:permissions,id',
        ]);

        try {
            DB::transaction(function () use ($role, $request) {
                // Sync permissions for the role
                $role->permissions()->sync($request->permissions);
            });

            return redirect()->back()->with('success', 'Role permissions updated successfully.');
        } catch (\Throwable $e) {
            Log::error('Error updating role permissions: ' . $e->getMessage());
            return redirect()->back()->with('error', 'Failed to update role permissions.');
        }
    }
}
