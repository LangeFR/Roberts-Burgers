<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(["platos"])->get();
        return response()->json($orders);
    }

    public function store(Request $request)
    {
        
        $order = new Order($request->all());

        // Verifica si hay platos en la solicitud
        if ($request->has('platos')) {
            // Itera sobre cada plato en la solicitud
            foreach ($request->platos as $plato) {
                // Obtén el ID y la cantidad del plato
                $plato_id = $plato['plato_id'];
                $quantity = $plato['quantity'];

                // Adjunta el plato al pedido con la cantidad correspondiente
                $order->platos()->attach($plato_id, ["quantity" => $quantity]);
            }
        }

        $order->direccion = $request->direccion;
        $order->numero = $request->numero;
        $order->cliente_id = $request->cliente_id;
        $order->save();
        

        // Retornar una respuesta exitosa
        return response()->json(['message' => 'Pedido creado exitosamente'], 201);
    }


    public function order(Order  $order){


        $order->load(["platos", "user"]);

        if(!$order){
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }





}