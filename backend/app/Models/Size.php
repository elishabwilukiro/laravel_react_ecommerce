<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Size extends Model
{
    protected $table = 'sizes';
    protected $primaryKey = 'id';
    protected $fillable = ['name','status','archive'];
}
