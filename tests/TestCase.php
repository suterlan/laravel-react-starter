<?php

namespace Tests;

use Illuminate\Foundation\Testing\TestCase as BaseTestCase;
use Database\Seeders\RolesTableSeeder;
use CreatesApplication;
use Database\Seeders\PermissionTableSeeder;
use Database\Seeders\RolePermissionSeeder;
use Illuminate\Contracts\Console\Kernel;

abstract class TestCase extends BaseTestCase
{
    /**
     * Creates the application.
     *
     * @return \Illuminate\Foundation\Application
     */
    public function createApplication()
    {
        $app = require __DIR__ . '/../bootstrap/app.php';

        $app->make(Kernel::class)->bootstrap();

        return $app;
    }

    /**
     * Setup the test environment.
     *
     * @return void
     */
    protected function setUp(): void
    {
        parent::setUp();

        // PENTING: Panggil seeder roles di sini.
        // Ini akan memastikan tabel 'roles' selalu terisi sebelum SETIAP Feature Test.
        $this->seed(RolesTableSeeder::class);
        $this->seed(PermissionTableSeeder::class);
        $this->seed(RolePermissionSeeder::class);
    }
}
