<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cliente;
use App\Models\ClienteEndereco;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ClienteResource;
use App\Http\Controllers\Api\PHPMailerController;


class ClienteController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_cli = Cliente::orderBy('cli_nome')->get();
           $result = ClienteResource::collection($result_cli); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Cliente',
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
        $request->merge(['cli_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'cli_nome' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $cliente = Cliente::create($input);
        $request->merge(['cle_created_at' => date("Y-m-d H:i:s")]);
        $request->merge(['cle_id_cli' => $cliente->cli_id_cli]);
        $input = $request->all();
        //adiciona o endereco//
        ClienteEndereco::create($input); 

        $cli = new ClienteResource(Cliente::findOrFail($cliente->cli_id_cli));

        $arr_result = [
            "status" => true,
            "mensagem" => "Cliente Incliido com sucesso!!!",
            "data" => $cli,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$cli = Cliente::find($id);

       $cli = new ClienteResource(Cliente::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Cliente!!!",
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
       $cliente = Cliente::find($id);
       $cliente->update($input);

       $cliendereco = ClienteEndereco::find($input["cle_id_cle"]);
       $cliendereco->update($input); 
      
       $cli = new ClienteResource($cliente);
       $arr_result = [
            "status" => true,
            "mensagem" => "Cliente Atualizado com Sucesso!!!",
            "data" => $cli
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

    public function proposta(Request $request)
    {
        $mail =  new PHPMailerController();
        $mail->envia_proposta($request); 
    }

}
