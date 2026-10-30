<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Agenda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\AgendaResource;


class AgendaController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_age = Agenda::orderBy('age_created_at')->get();
           $result = AgendaResource::collection($result_age); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Agenda',
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
        $request->merge(['age_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'age_id_pro' => 'required',
            'age_id_prc' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $Agenda = Agenda::create($input);

        $age = new AgendaResource(Agenda::findOrFail($Agenda->age_id_age));

        $arr_result = [
            "status" => true,
            "mensagem" => "Agenda Inageido com sucesso!!!",
            "data" => $age,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$age = Agenda::find($id);

       $cli = new AgendaResource(Agenda::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Agenda!!!",
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
       $Agenda = Agenda::find($id);
       $Agenda->update($input);

       $age = new AgendaResource($Agenda);
       $arr_result = [
            "status" => true,
            "mensagem" => "Agenda Atualizado com Sucesso!!!",
            "data" => $age
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
