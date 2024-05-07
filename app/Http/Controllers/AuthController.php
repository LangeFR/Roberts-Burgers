<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request){
        echo json_encode($_SERVER, JSON_PRETTY_PRINT);
        
        $usuario = "sapo";
        $clave = "1234";

        if($_SERVER['PHP_AUTH_USER'] == $usuario && $_SERVER['PHP_AUTH_PW'] == $clave){
            $message = "Inicio de sesion exitoso!";
            return response()->json(['message' => $message]);
        }else{
            return response()->json(['message' => 'Usuario o contraseña incorrectos'], 401);
        }

    }
}
