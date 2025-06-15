<?php

use Illuminate\Support\Facades\Broadcast;

Broadcast::channel('dashboard.{role}', function ($user, $role) {
    return strtolower($user->role?->name) === strtolower($role);
});

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });
