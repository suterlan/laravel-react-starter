<?php

use App\Http\Controllers\Admin\ManageUserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth', 'verified', 'role:admin,superadmin'])->group(function () {
	Route::prefix('dashboard')->name('dashboard.')->group(function () {
		// Route to manage users		
		Route::get('/manage-users', [ManageUserController::class, 'index'])->name('manage-users');
		Route::post('/manage-users', [ManageUserController::class, 'store'])->name('manage-users.store');
		Route::put('/manage-users/{user}', [ManageUserController::class, 'update'])->name('manage-users.update');
		Route::delete('/manage-users/{user}', [ManageUserController::class, 'destroy'])->name('manage-users.destroy');
	});
});
