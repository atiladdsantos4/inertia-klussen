<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cidade;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\CidadeResource;


class CidadeController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           if( isset($all["cad_cli"]) ){
              $result_cid = Cidade::orderBy('cid_descricao')->get();
           } else {
              $result_cid = Cidade::orderBy('cid_descricao')->get();
           }
           $result = CidadeResource::collection($result_cid); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Cidade',
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
        $request->merge(['cid_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'cid_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $Cidade = Cidade::create($input);

        $cid = new CidadeResource(Cidade::findOrFail($Cidade->cid_id_cid));

        $arr_result = [
            "status" => true,
            "mensagem" => "Cidade Incidido com sucesso!!!",
            "data" => $cid,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$cid = Cidade::find($id);

       $cli = new CidadeResource(Cidade::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Cidade!!!",
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
       $Cidade = Cidade::find($id);
       $Cidade->update($input);

       $cid = new CidadeResource($Cidade);
       $arr_result = [
            "status" => true,
            "mensagem" => "Cidade Atualizado com Sucesso!!!",
            "data" => $cid
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
