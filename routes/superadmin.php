<?php

use App\Http\Controllers\Superadmin\PermissionController;
use App\Http\Controllers\Superadmin\RoleController;
use App\Http\Controllers\Superadmin\SystemControlsController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified', 'role:superadmin'])->group(function () {
	Route::prefix('dashboard')->name('superadmin.')->group(function () {
		// Route system controls
		// Route to update roles and permissions
		Route::get('/system', [SystemControlsController::class, 'index'])->name('system');
		Route::put('/role-permissions/{role}', [SystemControlsController::class, 'rolePermissionUpdate'])->name('role-permissions.update');

		// Route manage roles
		Route::get('/roles', [RoleController::class, 'index'])->name('roles');
		Route::post('/roles', [RoleController::class, 'store'])->name('roles.store');
		Route::put('/roles/{role}', [RoleController::class, 'update'])->name('roles.update');
		Route::delete('/roles/{role}', [RoleController::class, 'destroy'])->name('roles.destroy');
		// Route manage permissions
		Route::get('/permissions', [PermissionController::class, 'index'])->name('permissions');
		Route::post('/permissions', [PermissionController::class, 'store'])->name('permissions.store');
		Route::put('/permissions/{permission}', [PermissionController::class, 'update'])->name('permissions.update');
		Route::delete('/permissions/{permission}', [PermissionController::class, 'destroy'])->name('permissions.destroy');
	});
});
