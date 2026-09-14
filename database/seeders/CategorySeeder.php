<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Seed the categories and products shown in the reference bakery menu.
     */
    public function run(): void
    {
        $menu = [
            [
                'name' => 'Tartaletas',
                'slug' => 'tartaletas',
                'description' => 'Sabor limón, parchita o fresa.',
                'sort_order' => 1,
                'products' => [
                    ['name' => 'Tartaletas x12', 'price' => 6, 'sort_order' => 1],
                    ['name' => 'Tartaletas x24', 'price' => 12, 'sort_order' => 2],
                    ['name' => 'Tartaletas x48', 'price' => 24, 'sort_order' => 3],
                ],
            ],
            [
                'name' => 'Brownies',
                'slug' => 'brownies',
                'description' => 'Con topping de chocolate y maní.',
                'sort_order' => 2,
                'products' => [
                    ['name' => 'Brownies x12', 'price' => 6, 'sort_order' => 1],
                    ['name' => 'Brownies x24', 'price' => 12, 'sort_order' => 2],
                    ['name' => 'Brownies x48', 'price' => 24, 'sort_order' => 3],
                ],
            ],
            [
                'name' => 'Mini Pavlovas',
                'slug' => 'mini-pavlovas',
                'description' => 'Suspiros con harina de almendras. Rellenas con chantilly, arequipe o chocolate. Decoradas con trozos de fresas.',
                'sort_order' => 3,
                'products' => [
                    ['name' => 'Mini Pavlovas x12', 'price' => 6, 'sort_order' => 1],
                    ['name' => 'Mini Pavlovas x24', 'price' => 12, 'sort_order' => 2],
                    ['name' => 'Mini Pavlovas x48', 'price' => 24, 'sort_order' => 3],
                ],
            ],
            [
                'name' => 'Trufas',
                'slug' => 'trufas',
                'description' => 'Sabor vainilla, chocolate o red velvet.',
                'sort_order' => 4,
                'products' => [
                    ['name' => 'Trufas x12', 'price' => 5, 'sort_order' => 1],
                    ['name' => 'Trufas x24', 'price' => 10, 'sort_order' => 2],
                    ['name' => 'Trufas x48', 'price' => 20, 'sort_order' => 3],
                ],
            ],
        ];

        foreach ($menu as $categoryData) {
            $products = $categoryData['products'];
            unset($categoryData['products']);

            $category = Category::updateOrCreate(
                ['slug' => $categoryData['slug']],
                $categoryData
            );

            foreach ($products as $productData) {
                $category->products()->updateOrCreate(
                    ['slug' => Str::slug($productData['name'])],
                    [
                        ...$productData,
                        'description' => $categoryData['description'],
                    ]
                );
            }
        }
    }
}
