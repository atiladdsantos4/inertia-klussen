<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ServicoItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ServicoItemResource;


class ServicoItemController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_sei = ServicoItem::orderBy('sei_descricao')->get();
           $result = ServicoItemResource::collection($result_sei); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados ServicoItem',
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
        $request->merge(['sei_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'sei_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $servicoitem  = ServicoItem::create($input);

        $sei = new ServicoItemResource(ServicoItem::findOrFail($servicoitem->sei_id_sei));

        $arr_result = [
            "status" => true,
            "mensagem" => "Servico Item  Inserido com sucesso!!!",
            "data" => $sei,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$sei = ServicoItem::find($id);

       $cli = new ServicoItemResource(ServicoItem::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do ServicoItem !!!",
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
       $servicoitem  = ServicoItem::find($id);
       $servicoitem ->update($input);

       $sei = new ServicoItemResource($servicoitem);
       $arr_result = [
            "status" => true,
            "mensagem" => "ServicoItem  Atualizado com Sucesso!!!",
            "data" => $sei
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
