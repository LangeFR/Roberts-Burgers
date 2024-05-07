<?php
 
namespace App\Http\Controllers\Api\V1;
 
use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;
 
class  ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $dishes = Client::all();
        return response()->json($dishes);
    }
 
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $dishes = new Client;
        $dishes->name = $request->name;
        $dishes->price = $request->price;
        $dishes->description = $request->description;
        $dishes->imageUrl = $request->imageUrl;
        $dishes->save();
 
 
        return response()->json([
            "message" => "Succesfully Stored"
        ]);
    }
 
    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $dishes = Dishes::find($id);
 
        if(!empty($dishes)){
            return response()->json($dishes);
        } else{
            return response()->json([
                "message" => "Doesn't found"
            ]);
        }
    }
 
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $platos = Platos::find($id);
 
        $platos->name = $request->name;
        $platos->price = $request->price;
        $platos->description = $request->description;
        $platos->imageUrl = $request->imageUrl;
        $platos->save();
 
        return response()->json([
            "message" => "Succesfully Updated"
        ]);
    }
 
    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $platos = Platos::find($id);
        $platos->delete();
 
        return response()->json([
            "message" => "Succesfully Deleted"
        ]);
    }
}
 
