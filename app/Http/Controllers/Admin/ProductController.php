<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreProductRequest;
use App\Http\Requests\Admin\UpdateProductRequest;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(Category $category): Response
    {
        $products = $category->products()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Products/Index', [
            'category' => $category,
            'products' => $products,
        ]);
    }

    public function create(Category $category): Response
    {
        return Inertia::render('Admin/Products/Create', [
            'category' => $category,
        ]);
    }

    public function store(StoreProductRequest $request, Category $category)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image_path'] = $request->file('image')->store('products', 'public');
        }

        $category->products()->create($data);

        return to_route('admin.categories.products.index', $category)->with('success', 'Producto creado correctamente.');
    }

    public function edit(Product $product): Response
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product->load('category'),
            'categories' => Category::orderBy('name')->get(['id', 'name']),
        ]);
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            if ($product->image_path) {
                Storage::disk('public')->delete($product->image_path);
            }
            $data['image_path'] = $request->file('image')->store('products', 'public');
        } elseif ($request->boolean('remove_image') && $product->image_path) {
            Storage::disk('public')->delete($product->image_path);
            $data['image_path'] = null;
        }

        $product->update($data);

        return to_route('admin.categories.products.index', $product->category)->with('success', 'Producto actualizado correctamente.');
    }

    public function destroy(Product $product)
    {
        $category = $product->category;

        if ($product->image_path) {
            Storage::disk('public')->delete($product->image_path);
        }

        $product->delete();

        return to_route('admin.categories.products.index', $category)->with('success', 'Producto eliminado correctamente.');
    }
}
