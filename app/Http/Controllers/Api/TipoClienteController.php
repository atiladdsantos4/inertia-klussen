<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\TipoCliente;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\TipoClienteResource;


class TipoClienteController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_tic = TipoCliente::orderBy('tic_descricao')->get();
           $result = TipoClienteResource::collection($result_tic); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Tipo Clientes',
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
        $request->merge(['tic_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'tic_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $TipoCliente = TipoCliente::create($input);

        $tic = new TipoClienteResource(TipoCliente::findOrFail($TipoCliente->tic_id_tic));

        $arr_result = [
            "status" => true,
            "mensagem" => "TipoCliente Inserido com sucesso!!!",
            "data" => $tic,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$tic = TipoCliente::find($id);

       $cli = new TipoClienteResource(TipoCliente::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do TipoCliente!!!",
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
       $TipoCliente = TipoCliente::find($id);
       $TipoCliente->update($input);

       $tic = new TipoClienteResource($TipoCliente);
       $arr_result = [
            "status" => true,
            "mensagem" => "TipoCliente Atualizado com Sucesso!!!",
            "data" => $tic
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
