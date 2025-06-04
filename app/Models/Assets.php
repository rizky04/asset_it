<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;



class Assets extends Model
{
    /** @use HasFactory<\Database\Factories\AssetsFactory> */
    use HasFactory;

    protected $guarded = [];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected function image() : Attribute {
        return Attribute::make(
            get: fn($value) => $value 
            ? url('storage/'. $value)
             : 'https://kzmqeof5nva13225mfru.lite.vusercontent.net/placeholder.svg?height=600width=600'
        );
    }
}
