<?php
 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\API\OrderController;
use App\Http\Controllers\API\PlatoController;

use App\Http\Middleware\AuthMiddleware;

use App\Models\Plato;
 
Route::get('/dishes', 'app/Http/Controllers/PlatoController.php@index');
Route::post('/dishes', 'app/Http/Controllers/PlatoController.php@store');
Route::get('/users', [UserController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);
Route::resource('/users', UserController::class)
->middleware(AuthMiddleware::class);
Route::get('/order', [OrderController::class, 'show']);
Route::post('/new-order', [OrderController::class, 'store']);
Route::post('new-user', [UserController::class, 'store']);
Route::get('/user', [UserController::class, 'show']);
Route::get('/orders', [OrderController::class,'index']);

Route::post('/crear-plato', [PlatoController::class, 'store']);
Route::get('/plato', [PlatoController::class, 'show']);
Route::get('/plato', [PlatoController::class, 'showAll']);
Route::patch('/actualizar-plato', [PlatoController::class, 'update']);
Route::delete('/borrar-plato', [PlatoController::class, 'destroy']);
