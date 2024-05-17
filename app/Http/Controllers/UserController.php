<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Obtener todos los usuarios de la base de datos
        $users = User::all();
        

        // Retornar la lista de usuarios como respuesta JSON
        return response()->json($users);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request){
        // Crear el usuario
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = password_hash($request->password, PASSWORD_DEFAULT);
        $user->rol = $request->rol;
        $user->save();

        return response()->json([
            'message' => 'Usuario creado correctamente'
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $id)
    {
        $user = User::find($id);
        $user->load(["orders"]);
        

        if(!$user){
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
