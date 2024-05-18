<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'direccion',
        'numero',
        'user_id',
        'entregada'
    ];
    protected $attributes = [
        'entregada' => 'F' // Valor predeterminado para el campo 'entregada'
    ];

    /**
     * Get the user that owns the order.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    /*
     * Get the platos 
     */
    public function platos()
    {
        return $this->belongsToMany(Plato::class)->withPivot(['quantity']);
    }
}
