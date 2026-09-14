<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\ProductController;
use App\Http\Controllers\MenuController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', [MenuController::class, 'index'])->name('menu');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified'])->group(function () {
    Route::resource('categories', CategoryController::class)->except(['show']);
    Route::resource('categories.products', ProductController::class)->shallow()->except(['show']);
});

require __DIR__ . '/auth.php';
