<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Medidas;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\MedidasResource;


class MedidasController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_unm = Medidas::orderBy('unm_descricao')->get();
           $result = MedidasResource::collection($result_unm); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Medidas',
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
        $request->merge(['unm_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'unm_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $Medidas = Medidas::create($input);

        $unm = new MedidasResource(Medidas::findOrFail($Medidas->unm_id_unm));

        $arr_result = [
            "status" => true,
            "mensagem" => "Medidas Inserido com sucesso!!!",
            "data" => $unm,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$unm = Medidas::find($id);

       $cli = new MedidasResource(Medidas::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Medidas!!!",
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
       $Medidas = Medidas::find($id);
       $Medidas->update($input);

       $unm = new MedidasResource($Medidas);
       $arr_result = [
            "status" => true,
            "mensagem" => "Medidas Atualizado com Sucesso!!!",
            "data" => $unm
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
