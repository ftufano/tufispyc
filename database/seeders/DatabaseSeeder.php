<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => config('menu.admin_email')],
            [
                'name' => 'Admin',
                'password' => config('menu.admin_password'),
            ]
        );

        $this->call([
            CategorySeeder::class,
        ]);
    }
}
