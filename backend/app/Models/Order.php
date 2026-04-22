<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';
    protected $primaryKey = 'id';
    protected $fillable = [
        'user_id',
        'subtotal',
        'grand_total',
        'shipping',
        'discount',
        'payment_status',
        'status',
        'name',
        'email',
        'phone',
        'address',
        'city',
        'zip',
    ];


    public function user()
    {
        return $this->belongsTo(User::class,'user_id','id');
    }
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
