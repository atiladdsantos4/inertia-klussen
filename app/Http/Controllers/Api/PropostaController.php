<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Proposta;
use App\Models\ControleEmail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\PropostaResource;


class PropostaController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["preview"]) ){ //para renderizar as interfaces convencionais
           $dados =  Proposta::find($all["proposta"]);
           $html = view('mail.preview', [ 'corpo' => $dados->prc_ia_conteudo,"tipo"=>"P"])->render();
           $response = [
                'status' => true,
                'message' => 'Dados Proposta',
                'data'    =>  $html
           ];

           return response()->json($response, 200);

        }

        if( isset($all["previewrecibo"]) ){ //para renderizar as interfaces convencionais
           $dados =  Proposta::where('prc_id_prc',$all["proposta"])
           ->with('cliente')
           ->first();

           //$html = view('mail.preview', [ 'corpo' => $dados->prc_ia_conteudo])->render();
           $html = view('mail.preview_recibo',["dados"=>$dados,"tipo"=>"P"])->render();
           $response = [
                'status' => true,
                'message' => 'Dados Proposta',
                'data'    =>  $html
           ];

           return response()->json($response, 200);

        }

        if( isset($all["previewexecucao"]) ){ //para renderizar as interfaces convencionais
           $dados =  Proposta::where('prc_id_prc',$all["proposta"])
           ->with('cliente')
           ->first();

           //$html = view('mail.preview', [ 'corpo' => $dados->prc_ia_conteudo])->render();
           $html = view('mail.preview_execucao',["dados"=>$dados,"tipo"=>"P"])->render();
           $response = [
                'status' => true,
                'message' => 'Dados Execucao',
                'data'    =>  $html
           ];

           return response()->json($response, 200);

        }

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_prc = Proposta::orderBy('prc_created_at')->get();
           $result = PropostaResource::collection($result_prc); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Proposta',
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
        $request->merge(['prc_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'prc_data_proposta' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $proposta = Proposta::create($input);
        $request->merge(['coe_id_prc' => $proposta->prc_id_prc]);
        $request->merge(['coe_email_recibo' => '0']);
        $request->merge(['coe_email_proposta' => '0']);
        $request->merge(['coe_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();
        ControleEmail::create($input);

        $prc = new PropostaResource(Proposta::findOrFail($proposta->prc_id_prc));

        $arr_result = [
            "status" => true,
            "mensagem" => "Proposta Inprcido com sucesso!!!",
            "data" => $prc,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$prc = Proposta::find($id);

       $cli = new PropostaResource(Proposta::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Proposta!!!",
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
       $proposta = Proposta::find($id);
       if($input["prc_aceita"] == 1){
          $request->merge(['prc_data_aceite' => date("Y-m-d")]);
          $input = $request->all();
       }
       $proposta->update($input);

       $prc = new PropostaResource($proposta);
       $arr_result = [
            "status" => true,
            "mensagem" => "Proposta Atualizado com Sucesso!!!",
            "data" => $prc
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
