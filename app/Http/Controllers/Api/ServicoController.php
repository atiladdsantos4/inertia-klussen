<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Servico;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ServicoResource;


class ServicoController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_ser = Servico::orderBy('ser_descricao')->get();
           $result = ServicoResource::collection($result_ser); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Servico',
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
        $request->merge(['ser_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'ser_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $Servico = Servico::create($input);

        $ser = new ServicoResource(Servico::findOrFail($Servico->ser_id_ser));

        $arr_result = [
            "status" => true,
            "mensagem" => "Servico Inserido com sucesso!!!",
            "data" => $ser,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$ser = Servico::find($id);

       $cli = new ServicoResource(Servico::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Servico!!!",
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
       $Servico = Servico::find($id);
       $Servico->update($input);

       $ser = new ServicoResource($Servico);
       $arr_result = [
            "status" => true,
            "mensagem" => "Servico Atualizado com Sucesso!!!",
            "data" => $ser
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
