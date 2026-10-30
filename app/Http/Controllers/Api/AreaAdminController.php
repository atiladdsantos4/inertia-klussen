<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\AreaAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\AreaAdminResource;


class AreaAdminController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_adm = AreaAdmin::orderBy('adm_descricao')->get();
           $result = AreaAdminResource::collection($result_adm); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados AreaAdmin',
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
        $request->merge(['adm_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'adm_descricao' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $AreaAdmin = AreaAdmin::create($input);

        $adm = new AreaAdminResource(AreaAdmin::findOrFail($AreaAdmin->adm_id_adm));

        $arr_result = [
            "status" => true,
            "mensagem" => "AreaAdmin Inadmido com sucesso!!!",
            "data" => $adm,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$adm = AreaAdmin::find($id);

       $cli = new AreaAdminResource(AreaAdmin::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do AreaAdmin!!!",
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
       $AreaAdmin = AreaAdmin::find($id);
       $AreaAdmin->update($input);

       $adm = new AreaAdminResource($AreaAdmin);
       $arr_result = [
            "status" => true,
            "mensagem" => "AreaAdmin Atualizado com Sucesso!!!",
            "data" => $adm
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
