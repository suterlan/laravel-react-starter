<?php

use App\Models\Role;
use App\Models\User;

test('admin can access manage_users', function () {
    // 1. Tahap Arrange: Siapkan data user admin
    $adminRole = Role::where('name', 'admin')->first(); // Ambil role 'admin'
    // Asumsi 'admin' memiliki permission 'manage_users'
    // Pastikan permission ini ada dan terlampir ke role 'admin' via seeder/data
    $this->assertNotNull($adminRole, 'Admin role not found. Ensure RolesTableSeeder runs.');

    // Buat user admin
    $admin = User::factory()->create(['role_id' => $adminRole->id]);

    // 2. Tahap Act: Simulasikan user admin mengakses manage-users
    $response = $this->actingAs($admin)->get('/dashboard/manage-users'); // Sesuaikan URL sesuai dengan rute yang ada di aplikasi kamu

    // 3. Tahap Assert: Pastikan user admin bisa mengakses halaman (HTTP 200 OK)
    $response->assertStatus(200);
});

test('user cannot access manage_users', function () {
    // 1. Arrange: Siapkan data user biasa
    $userRole = Role::where('name', 'user')->first(); // Ambil role 'user'
    $this->assertNotNull($userRole, 'User role not found. Ensure RolesTableSeeder runs.');

    // Buat user biasa
    $user = User::factory()->create(['role_id' => $userRole->id]);

    // 2. Act: Simulasikan user biasa mengakses manage-users
    $response = $this->actingAs($user)->get('/dashboard/manage-users'); // Sesuaikan URL admin dashboard kamu

    // 3. Assert: Pastikan user biasa TIDAK BISA mengakses dan mendapatkan status 403 Forbidden
    $response->assertStatus(403); // Atau assertRedirect('/login') jika itu perilaku yang diharapkan
});

test('guest cannot access admin dashboard', function () {
    // 1. Arrange: Tidak perlu user, karena ini guest (tidak login)

    // 2. Act: Simulasikan guest mengakses manage-users
    $response = $this->get('/dashboard'); // Sesuaikan URL admin dashboard kamu

    // 3. Assert: Pastikan guest TIDAK BISA mengakses dan di-redirect ke halaman login
    $response->assertRedirect('/login'); // Atau assertStatus(403) jika itu perilaku yang diharapkan
});

// Tambahkan tes lain untuk skenario RBAP yang lebih spesifik
// Misalnya:
// test('admin_can_perform_action_A', function() { /* ... */ });
// test('user_cannot_perform_action_B', function() { /* ... */ });
