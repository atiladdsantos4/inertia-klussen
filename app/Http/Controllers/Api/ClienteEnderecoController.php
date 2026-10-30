<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ClienteEndereco;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ClienteEnderecoResource;


class ClienteEnderecoController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_cle = ClienteEndereco::orderBy('cle_nome')->get();
           $result = ClienteEnderecoResource::collection($result_cle); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados ClienteEndereco',
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
        $request->merge(['cle_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'cle_endereco' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $ClienteEndereco = ClienteEndereco::create($input);

        $cle = new ClienteEnderecoResource(ClienteEndereco::findOrFail($ClienteEndereco->cle_id_cle));

        $arr_result = [
            "status" => true,
            "mensagem" => "Cliente Endereco Incleido com sucesso!!!",
            "data" => $cle,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$cle = ClienteEndereco::find($id);

       $cle = new ClienteEnderecoResource(ClienteEndereco::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do ClienteEndereco!!!",
            "data" => $cle
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
       $ClienteEndereco = ClienteEndereco::find($id);
       $ClienteEndereco->update($input);

       $cle = new ClienteEnderecoResource($ClienteEndereco);
       $arr_result = [
            "status" => true,
            "mensagem" => "ClienteEndereco Atualizado com Sucesso!!!",
            "data" => $cle
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
