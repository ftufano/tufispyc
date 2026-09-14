<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCategoryRequest;
use App\Http\Requests\Admin\UpdateCategoryRequest;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function index(): Response
    {
        $categories = Category::withCount('products')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Categories/Index', [
            'categories' => $categories,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Categories/Create');
    }

    public function store(StoreCategoryRequest $request)
    {
        Category::create($request->validated());

        return to_route('admin.categories.index')->with('success', 'Categoría creada correctamente.');
    }

    public function edit(Category $category): Response
    {
        return Inertia::render('Admin/Categories/Edit', [
            'category' => $category,
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());

        return to_route('admin.categories.index')->with('success', 'Categoría actualizada correctamente.');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return to_route('admin.categories.index')->with('success', 'Categoría eliminada correctamente.');
    }
}
