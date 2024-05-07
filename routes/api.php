<?php
 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

use App\Models\Plato;
 
Route::get('/dishes', 'app/Http/Controllers/PlatoController.php@index');
Route::post('/dishes', 'app/Http/Controllers/PlatoController.php@store');

Route::get('/platos', function () {
    $listaPlatos = Plato::all();
    return response()->json($listaPlatos);
});

Route::get('/plato', function (Request $request) {
    $idPlato = ($request->input('id'));
    $listaPlatos = Plato::all();

    $plato = $listaPlatos->find($idPlato);

    if (empty($plato)) {
        return response()->json(['error' => 'Plato no encontrado'], 404);
    }

    return response()->json($plato);
});

Route::post('/crear-plato', function (Request $request) {
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
});

Route::patch('/actualizar-plato', function (Request $request) {
    // Obtener los datos de la solicitud
    $id = $request->input('id');
    $plato = Plato::find($id);

    if (empty($plato)) {
        return response()->json(['error' => 'Plato no encontrado'], 404);
    }

    //return $id;
    //die();
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
});

Route::delete('/borrar-plato', function (Request $request) {
    $id = $request->input('id');
    $plato = Plato::find($id);

    if (empty($plato)) {
        return response()->json(['error' => 'Plato no encontrado'], 404);
    }

    $plato ->delete();

    // Devolver el objeto Ciudadano creado en formato JSON
    return response()->json($plato);
});

Route::post('/login', [AuthController::class, 'login']);