<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Plato;

class PlatoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dishes = Plato::all();
        return response()->json($dishes);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Obtener los datos de la solicitud
        $nombre = $request->input('nombre');
        $descripcion = $request->input('descripcion');
        $precio = $request->input('precio');
        $imagen = $request->input('imagen');
        $categoria = $request->input('categoria');


        // Verificar si falta algún campo requerido
        if (empty($nombre) || empty($descripcion) || empty($precio) || empty($imagen) || empty($categoria)) {
            // Devolver un error 400 - Solicitud incorrecta
            return response()->json(['error' => 'Faltan campos requeridos'], 400);
        }

        // Crear un nuevo objeto Ciudadano
        $plato = new Plato([
            'nombre' => $nombre,
            'descripcion' => $descripcion,
            'precio' => $precio,
            'imagen' => $imagen,
            'categoria' => $categoria
        ]);

        // Guardar el plato en la base de datos u realizar otras operaciones necesarias
        $plato->save();

        // Devolver el objeto Ciudadano creado en formato JSON
        return response()->json($plato);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $id)
    {
        $plato = Plato::find($id);

        if (empty($plato)) {
            return response()->json(['error' => 'Plato no encontrado'], 404);
        }

    return response()->json($plato);
    }
    public function showAll() {
        $platos = Plato::all();
        return response()->json($platos);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        // Obtener los datos de la solicitud
        $id = $request->input('id');
        $plato = Plato::find($id);

         if (empty($plato)) {
            return response()->json(['error' => 'Plato no encontrado'], 404);
        }

        $nombre = $request->input('nombre');
        $descripcion = $request->input('descripcion');
        $precio = $request->input('precio');
        $imagen = $request->input('imagen');
        $categoria = $request->input('categoria');

        if(!empty($nombre)){
            $plato->nombre = $nombre;
        }
        if(!empty($descripcion)){
            $plato->descripcion = $descripcion;
        }

        if(!empty($precio)){
            $plato->precio = $precio;
        }

        if(!empty($imagen)){
            $plato->imagen = $imagen;
        }

        if(!empty($categoria)){
            $plato->categoria = $categoria;
        }

        // Guardar el plato en la base de datos u realizar otras operaciones necesarias
        $plato->save();

        // Devolver el objeto Ciudadano creado en formato JSON
        return response()->json($plato);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $plato = Plato::find($id);
        
        if (empty($plato)) {
            return response()->json(['error' => 'Plato no encontrado'], 404);
        }

        $plato->delete();

        return response()->json([
            "message" => "Succesfully Deleted"
        ]);
    }

    public function loadPlatos(){
        $platos = Plato::all();

        return response()->json($platos);
    }
    
}
