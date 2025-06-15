<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Tambahkan role
        $roles = [
            'superadmin',
            'admin',
            'user',
        ];

        foreach ($roles as $role) {
            Role::create(['name' => $role]);
        }

        // Tambahkan permission
        $permissions = [
            'manage_users',
            'view_reports',
            'manage_roles',
            'manage_permissions',
            'manage_system',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Hubungkan permissions ke roles
        $superadminRole = Role::where('name', 'superadmin')->first();
        $superadminRole->permissions()->sync(Permission::all()->pluck('id'));

        $adminRole = Role::where('name', 'admin')->first();
        $adminRole->permissions()->sync(Permission::where('name', 'manage_users')->pluck('id'));

        User::factory(15)->create();

        User::factory()->create([
            'name' => 'Test Superadmin',
            'email' => 'superadmin@example.com',
            'role_id'  => $superadminRole->id,
        ]);
    }
}
