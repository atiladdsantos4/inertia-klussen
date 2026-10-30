<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Pais;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\PaisResource;


class PaisController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_pai = Pais::orderBy('pai_descricao')->get();
           $result = PaisResource::collection($result_pai); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Pais',
                'data'    => $result
            ];

            return response()->json($response, 200);
        }

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $input = null;
        //criar a data de criação
        $request->merge(['pai_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'pai_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $Pais = Pais::create($input);

        $pai = new PaisResource(Pais::findOrFail($Pais->pai_id_pai));

        $arr_result = [
            "status" => true,
            "mensagem" => "Pais Inpaiido com sucesso!!!",
            "data" => $pai,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$pai = Pais::find($id);

       $cli = new PaisResource(Pais::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Pais!!!",
            "data" => $cli
       ];

       return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {

       $input = $request->all();
       $Pais = Pais::find($id);
       $Pais->update($input);

       $pai = new PaisResource($Pais);
       $arr_result = [
            "status" => true,
            "mensagem" => "Pais Atualizado com Sucesso!!!",
            "data" => $pai
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

}
