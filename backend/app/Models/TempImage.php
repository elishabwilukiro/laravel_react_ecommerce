<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TempImage extends Model
{
    protected $table = 'temp_images';
    protected $primaryKey = 'id';
    protected $fillable = ['name','status','archive'];
}
