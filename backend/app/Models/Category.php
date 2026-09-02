<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $database = 'default';
    protected $table = 'categories';
    protected $primaryKey = 'id';
    protected $fillable = ['name','status','archive'];
}
