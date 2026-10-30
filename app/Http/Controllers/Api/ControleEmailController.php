<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ControleEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ControleEmailResource;


class ControleEmailController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_coe = ControleEmail::orderBy('coe_created_at')->get();
           $result = ControleEmailResource::collection($result_coe); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Controle Email',
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
        $request->merge(['coe_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'coe_id_prc' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $ControleEmail = ControleEmail::create($input);

        $coe = new ControleEmailResource(ControleEmail::findOrFail($ControleEmail->coe_id_coe));

        $arr_result = [
            "status" => true,
            "mensagem" => "Controle Email Inserido com sucesso!!!",
            "data" => $coe,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$coe = ControleEmail::find($id);

       $cli = new ControleEmailResource(ControleEmail::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Controle Email!!!",
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
       $ControleEmail = ControleEmail::find($id);
       $ControleEmail->update($input);

       $coe = new ControleEmailResource($ControleEmail);
       $arr_result = [
            "status" => true,
            "mensagem" => "Controle Email Atualizado com Sucesso!!!",
            "data" => $coe
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
