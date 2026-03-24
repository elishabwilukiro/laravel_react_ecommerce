<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductSize extends Model
{
    protected $table = 'product_sizes';
    protected $primaryKey = 'id';
    protected $fillable = ['product_id', 'size_id', 'status', 'archive'];

    public function size()
    {
        return $this->belongsTo(Size::class,'size_id','id');
    }
}
