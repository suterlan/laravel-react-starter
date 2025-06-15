<?php

namespace App\Broadcasters;

use App\Events\DashboardUpdated;
use App\Models\Permission;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class AdminDashboardBroadcaster
{
	public static function broadcast(string $eventType, Model $model): void
	{
		// Determine the model type
		$modelType = class_basename($model);

		// Load relationships dynamically if they exist
		if (method_exists($model, 'loadMissing')) {
			$model->loadMissing('role'); // Example: Load 'role' if it exists
		}

		Log::info("Broadcasting dashboard update: $eventType", [
			'model_type' => $modelType,
			'model_id' => $model->id,
		]);

		// Prepare the payload dynamically based on the model type
		$payload = [
			'type' => $eventType,
			'modelType' => $modelType,
			'usersCount' => User::count(),
			'rolesCount' => Role::count(),
			'permissionsCount' => Permission::count(),
			'roleDistribution' => Role::withCount('users')->get(['id', 'name']),
		];

		// Add model-specific data
		if ($model instanceof User) {
			$payload['newUser'] = $model->only(['id', 'name', 'email']) + ['role' => $model->role];
		} elseif ($model instanceof Role) {
			$payload['newRole'] = $model->only(['id', 'name']);
		} elseif ($model instanceof Permission) {
			$payload['newPermission'] = $model->only(['id', 'name']);
		}

		// Dispatch the event
		DashboardUpdated::dispatch(
			$payload,
			['superadmin', 'admin']
		);
	}
}
