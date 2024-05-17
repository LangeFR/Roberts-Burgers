<?php
 
namespace App\Http\Controllers\Api\V1;
 
use App\Http\Controllers\Controller;
use App\Models\Plato;
use Illuminate\Http\Request;
 
class  PlatoControllerpre extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dishes = Client::all();
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
    public function show($id)
    {
        $dishes = Dishes::find($id);
 
        if(!empty($dishes)){
            return response()->json($dishes);
        } else{
            return response()->json([
                "message" => "Doesn't found"
            ]);
        }
    }
 
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $platos = Platos::find($id);
 
        $platos->name = $request->name;
        $platos->price = $request->price;
        $platos->description = $request->description;
        $platos->imageUrl = $request->imageUrl;
        $platos->save();
 
        return response()->json([
            "message" => "Succesfully Updated"
        ]);
    }
 
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $platos = Platos::find($id);
        $platos->delete();
 
        return response()->json([
            "message" => "Succesfully Deleted"
        ]);
    }

    public function loadPlatos(){
        $platos = Platos::all();

        return response()->json($platos);
    }
}
 
