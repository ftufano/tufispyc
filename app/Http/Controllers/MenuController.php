<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class MenuController extends Controller
{
    public function index(): Response
    {
        $categories = Category::query()
            ->where('is_active', true)
            ->with(['products' => function ($query) {
                $query->where('is_active', true)
                    ->orderBy('sort_order')
                    ->orderBy('name');
            }])
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('Menu', [
            'categories' => $categories,
        ]);
    }
}
