<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class AuthController extends Controller
{
    public function login(Request $request){
        echo json_encode($_SERVER, JSON_PRETTY_PRINT);

        $email = $_SERVER['PHP_AUTH_USER'];
        $clave = $_SERVER['PHP_AUTH_PW'];


        $user = User::where('email', $email)->first();

        if ($user && password_verify($clave, $user->password)) {
            $message = "Inicio de sesión exitoso!";
            return response()->json(['message' => $message]);
        } elseif (!$user) {
            $message = "El usuario no existe.";
            return response()->json(['message' => $message], 404);
        } else {
            $message = "Usuario o contraseña incorrectos";
            return response()->json(['message' => $message], 401);
        }   


    }
}
