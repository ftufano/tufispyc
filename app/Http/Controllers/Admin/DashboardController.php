<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'categories' => Category::count(),
                'products' => Product::count(),
            ],
        ]);
    }
}
