<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Order;

class Plato extends Model
{
    use HasFactory;

    protected $table = 'platos';

    protected $fillable = [
        'id',
        'nombre',
        'descripcion',
        'precio',
        'imagen',
        'categoria'
    ];

    public function orders()
    {
        return $this->belongsToMany(Order::class)->withPivot('quantity');
    }
}
