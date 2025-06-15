<?php

namespace App\Providers;

use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\ServiceProvider;

class BroadcastServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        // Menambahkan endpoint broadcasting
        Broadcast::routes();

        // Menyertakan definisi channel dari routes/channels.php
        require base_path('routes/channels.php');
    }
}
