<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'id',
        'direccion',
        'clienteID'
    ];

    /**
     * Get the client that owns the phone.
     */
    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }
    /*
     * Get the platos 
     */
    public function platos(): HasMany
    {
        return $this->hasMany(Plato::class);
    }
}
