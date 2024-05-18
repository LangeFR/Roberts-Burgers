<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function login(Request $request){
        // Obtener las credenciales del cuerpo de la solicitud
        $credentials = $request->only('email', 'password');
        $email = $credentials['email'];
        $clave = $credentials['password'];

        // Buscar al usuario por su dirección de correo electrónico
        $user = User::where('email', $email)->first();

        // Verificar si el usuario existe y la contraseña es válida
        if ($user && password_verify($clave, $user->password)) {
            //crear token
            $token = Str::random(60);
            $user_id = $user->id;

            $user->remember_token = $token;
            $user->save();

            $message = "Inicio de sesión exitoso!";
            return response()->json(['message' => $message, 'token' => $token, 'user_id' => $user_id]);
        } elseif (!$user) {
            $message = "El usuario no existe.";
            return response()->json(['message' => $message], 400);
        } else {
            $message = "Usuario o contraseña incorrectos";
            return response()->json(['message' => $message], 401);
        }
    }
}



// <?php

// namespace App\Http\Controllers;

// use Illuminate\Http\Request;
// use App\Models\User;

// class AuthController extends Controller
// {
//     public function login(Request $request){
         
//     try{
//         //return json_encode($_SERVER, JSON_PRETTY_PRINT);

//         $email = $_SERVER['PHP_AUTH_USER'];
//         $clave = $_SERVER['PHP_AUTH_PW'];

//         /////////////////
//         //$email = $_SERVER['PHP_AUTH_USER'];
//         //$clave = $_SERVER['PHP_AUTH_PW'];

//         //$email = $request->getUser();
//         //$clave = $request->getPassword();
//         //////////////////////////////////////

//         $user = User::where('email', $email)->first();

//         if ($user && password_verify($clave, $user->password)) {
//             $message = "Inicio de sesión exitoso!";
//             $token = $user->remember_token;
//             return response()->json(['message' => $message, 'token' => $token]);
//         } elseif (!$user) {
//             $message = "El usuario no existe.";
//             return response()->json(['message' => $message], 400);
//         } else {
//             $message = "Usuario o contraseña incorrectos";
//             return response()->json(['message' => $message], 401);
//         }
//     }
//     catch(Exception $ex){
//         return $ex->getMessage();
//     }
        
//     }
// }
