<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    /**
     * Relasi ke model User.
     */
    public function users()
    {
        return $this->hasMany(User::class);
    }

    /**
     * Relasi ke model Permission.
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'role_permission');
    }
}
