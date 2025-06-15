<?php

namespace App\Observers;

use App\Broadcasters\AdminDashboardBroadcaster;
use App\Models\User;

class UserObserver
{
    /**
     * Handle the User "created" event.
     */
    public function created(User $user): void
    {
        // Broadcast ke admin dashboard
        AdminDashboardBroadcaster::broadcast('created', $user);
    }

    /**
     * Handle the User "updated" event.
     */
    public function updated(User $user): void
    {
        AdminDashboardBroadcaster::broadcast('updated', $user);
    }

    /**
     * Handle the User "deleted" event.
     */
    public function deleted(User $user): void
    {
        AdminDashboardBroadcaster::broadcast('deleted', $user);
    }

    /**
     * Handle the User "restored" event.
     */
    public function restored(User $user): void
    {
        //
    }

    /**
     * Handle the User "force deleted" event.
     */
    public function forceDeleted(User $user): void
    {
        //
    }
}
