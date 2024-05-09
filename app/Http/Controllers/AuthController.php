<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request){
        
        $email = $_SERVER['PHP_AUTH_USER'];
        $clave = $_SERVER['PHP_AUTH_PW'];

        
        //$email = $_SERVER['PHP_AUTH_USER'];
        //$clave = $_SERVER['PHP_AUTH_PW'];

        //$email = $request->getUser();
        //$clave = $request->getPassword();


        $user = User::where('email', $email)->first();

        if ($user && password_verify($clave, $user->password)) {
            $message = "Inicio de sesión exitoso!";
            return response()->json(['message' => $message]);
        } elseif (!$user) {
            $message = "El usuario no existe.";
            return response()->json(['message' => $message], 400);
        } else {
            $message = "Usuario o contraseña incorrectos";
            return response()->json(['message' => $message], 401);
        }   


    }
}
