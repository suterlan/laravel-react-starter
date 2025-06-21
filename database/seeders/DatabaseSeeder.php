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
        // panggil seeder
        $this->call([
            RolesTableSeeder::class,
            PermissionTableSeeder::class,
            RolePermissionSeeder::class,
        ]);

        User::factory(15)->create();

        User::factory()->create([
            'name' => 'Test Superadmin',
            'email' => 'superadmin@example.com',
            'role_id'  => Role::where('name', 'superadmin')->first()->id,
        ]);

        User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'admin@example.com',
            'role_id'  => Role::where('name', 'admin')->first()->id,
        ]);
    }
}
