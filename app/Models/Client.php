<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $table = 'clientes'; 
    

    protected $fillable = [
        'id',
        'nombre',
        'numero',
    ];

    /*
     * Get the orders 
     */
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }
}
