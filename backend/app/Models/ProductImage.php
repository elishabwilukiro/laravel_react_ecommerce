<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    protected $table = 'product_images';
    protected $primaryKey = 'id';
    protected $fillable = ['product_id','image','status','archive'];

    

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
