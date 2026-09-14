<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'slug',
        'description',
        'price',
        'image_path',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'is_active' => 'boolean',
        'sort_order' => 'integer',
    ];

    protected $appends = [
        'image_url',
    ];

    protected static function booted(): void
    {
        static::saving(function (Product $product) {
            if (blank($product->slug)) {
                $product->slug = Str::slug($product->name);
            }
        });
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function imageUrl(): ?string
    {
        return $this->image_path ? Storage::disk('public')->url($this->image_path) : null;
    }

    public function getImageUrlAttribute(): ?string
    {
        return $this->imageUrl();
    }
}
