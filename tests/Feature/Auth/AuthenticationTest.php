<?php

use App\Models\Permission;
use App\Models\Role;
use App\Models\User;

test('login screen can be rendered', function () {
    $response = $this->get('/login'); // Act: Melakukan permintaan GET ke URL /login

    $response->assertStatus(200); // Assert: Memastikan respons HTTP memiliki status 200 (OK)
});

test('users can authenticate using the login screen', function () {
    // Ambil role admin yang sudah di-seed
    $adminRole = Role::where('name', 'admin')->first();

    // Arrange: Membuat user untuk test
    $user = User::factory()->create([
        'role_id' => $adminRole->id,
    ]);

    // Act: Melakukan permintaan POST ke URL /login dengan kredensial user
    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    // Assert: Memverifikasi hasil
    $this->assertAuthenticated(); // Memastikan user berhasil terotentikasi
    $response->assertRedirect(route('dashboard', absolute: false));  // Memastikan user di-redirect ke halaman dashboard

    $this->assertNotNull($user->role); // Memastikan user memiliki role
    $this->assertNotEmpty($user->role->permissions); // Memastikan role user memiliki permissions
});

test('users can not authenticate with invalid password', function () {
    // Arrange: Membuat user untuk test
    $user = User::factory()->create();

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

test('users can logout', function () {
    // Arrange: Membuat user untuk test
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post('/logout');

    $this->assertGuest();
    $response->assertRedirect('/');
});
