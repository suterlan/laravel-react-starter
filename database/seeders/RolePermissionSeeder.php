<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Hubungkan permissions ke roles
        $superadminRole = Role::where('name', 'superadmin')->first();
        $superadminRole->permissions()->sync(Permission::all()->pluck('id'));

        $adminRole = Role::where('name', 'admin')->first();
        $adminRole->permissions()->sync(Permission::where('name', 'manage_users')->pluck('id'));
    }
}
