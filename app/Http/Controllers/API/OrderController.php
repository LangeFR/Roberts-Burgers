<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\User;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Order::with(['platos', 'user'])->get();
        return response()->json($orders);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $order = new Order($request->all());
        $order->direccion = $request->direccion;
        $order->numero = $request->numero;
        $order->user_id = $request->user_id;
        $order->save();

        echo json_encode($request->platos_id);

        $platos_id = $request->platos_id;
        if (!isset($platos_id)) {
            return "No se creó plato o está vacío";
        }

        // Array auxiliar para mantener un registro de los platos agregados
        $platos_agregados = [];

        while ($plato_id = array_shift($platos_id)) {
            // Verificar si ya hemos agregado este plato
            if (in_array($plato_id, $platos_agregados)) {
                continue; // Saltar a la siguiente iteración si el plato ya está agregado
            }

            // Contar la cantidad de veces que aparece este plato en la solicitud
            $quantity = array_count_values($request->platos_id)[$plato_id];
            
            // Agregar el plato a la orden
            $order->platos()->attach($plato_id, ["quantity" => $quantity]);
            
            // Agregar el plato al array de platos agregados
            $platos_agregados[] = $plato_id;
        }

        // Retornar una respuesta exitosa
        return response()->json(['message' => 'Pedido creado exitosamente'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $id)
    {
        $order = Order::find($id);
        $order->load(["platos", "user"]);
        
        if(!$order){
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        // Obtener los datos de la solicitud
        $id = $request->input('id');
        $order = Order::find($id);

         if (empty($order)) {
            return response()->json(['error' => 'Plato no encontrado'], 404);
        }

        $dirieccion = $request->input('dirieccion');
        $numero = $request->input('numero');
        $user_id = $request->input('user_id');
        $entregada = $request->input('entregada');

        if(!empty($dirieccion)){
            $order->dirieccion = $dirieccion;
        }
        if(!empty($numero)){
            $order->numero = $numero;
        }

        if(!empty($user_id)){
            $order->user_id = $user_id;
        }

        if(!empty($entregada)){
            $order->entregada = $entregada;
        }

        // Guardar el plato en la base de datos u realizar otras operaciones necesarias
        $order->save();

        // Devolver el objeto Ciudadano creado en formato JSON
        return response()->json($order);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function entregarOrder(Request $request)
    {
        $order = Order::find($request->id);
        $order->entregada = "T";
        $order->save();
        return response()->json($order);
    }
}
