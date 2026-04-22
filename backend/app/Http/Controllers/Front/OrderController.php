<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class OrderController extends Controller
{
    public function saveOrder(Request $request)
    {
        
        if(!empty($request->cart)){
             
            // Save order
            $order = new Order();
            $order->user_id = $request->user()->id;
            $order->subtotal = $request->subtotal;
            $order->grand_total = $request->grand_total;
            $order->shipping = $request->shipping;
            $order->discount = $request->discount;
            $order->payment_status = $request->payment_status;
            $order->status = $request->status;
            $order->name = $request->name;
            $order->email = $request->email;
            $order->phone = $request->phone;
            $order->address = $request->address;
            $order->city = $request->city;
            $order->zip = $request->zip; 
            $order->save();  

            // Save order items
            foreach ($request->cart as $item) {
                $orderItem = new OrderItem();
                $orderItem->order_id = $order->id ?? null;
                $orderItem->product_id = $item['product_id'];
                $orderItem->unit_price = $item['unit_price'];
                $orderItem->name = $item['name'];
                $orderItem->qty = $item['qty'];
                $orderItem->size = $item['size'];
                $orderItem->price = $item['price'];
                $orderItem->save();
            }

            return response()->json([
                'status' => 200,
                'message'=> 'You have successfully place your order',
            ],200);

        }else{
            return response()->json([
                'status' => 401,
                'message'=> 'Your cart is empty',
            ]);
        }
            
    }
}
