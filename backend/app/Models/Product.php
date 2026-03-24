<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';
    protected $primaryKey = 'id';
    protected $fillable = [
        'title',
        'price',
        'category_id',
        'brand_id',
        'is_featured',
        'barcode',
        'description',
        'sku',
        'qty',
        'status',
        'archive',
        'image',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class,'category_id','id');
    }
    public function brand()
    {
        return $this->belongsTo(Brand::class,'brand_id','id');
    }
    public function product_images()
    {
        return $this->hasMany(ProductImage::class, 'product_id','id');
    }
    public function product_sizes()
    {
        return $this->hasMany(ProductSize::class,'product_id','id');
    }



    protected $appends = ['image_url'];
    public function getImageUrlAttribute()
    {
        if($this->image == "")
        {
            return "";
        }
        
        return asset('/uploads/products/small/' .$this->image);
    }
}
