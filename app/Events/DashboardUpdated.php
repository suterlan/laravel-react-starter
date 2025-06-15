<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class DashboardUpdated implements ShouldBroadcast, ShouldQueue
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public array $payload;
    /**
     * @var array<string>
     */
    public array $rolesToNotify;

    /**
     * Create a new event instance.
     */
    public function __construct(array $payload, array $rolesToNotify = [])
    {
        $this->payload = $payload;
        $this->rolesToNotify = $rolesToNotify;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        Log::info('Broadcasting to dashboard channel');
        // return [
        //     new Channel('dashboard')
        // ];
        return collect($this->rolesToNotify)
            ->map(fn($role) => new PrivateChannel("dashboard.{$role}"))
            ->all();
    }

    public function broadcastAs(): string
    {
        return 'dashboard.updates';
    }

    public function broadcastWith(): array
    {
        return $this->payload;
    }
}
