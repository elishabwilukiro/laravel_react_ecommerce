<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $database = 'default';
    protected $table = 'brands';
    protected $primaryKey = 'id';
    protected $fillable = ['name','status','archive'];
}
