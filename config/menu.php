<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Master Admin Credentials
    |--------------------------------------------------------------------------
    |
    | This application only supports a single master admin user, which is
    | created (or updated) by the database seeder using these credentials.
    |
    */

    'admin_email' => env('ADMIN_EMAIL', 'admin@example.com'),

    'admin_password' => env('ADMIN_PASSWORD', 'password'),

];
