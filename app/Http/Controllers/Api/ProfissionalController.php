<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Profissional;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\ProfissionalResource;
use Illuminate\Support\Facades\Storage;


class ProfissionalController extends Controller
{
     /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $all = $request->all();

        if( isset($all["compress"]) ){
           $this->reduzimage1($from = null,$to = null);
            $response = [
                'status' => true,
                'message' => 'Imagem Comprimida',
            ];

            return response()->json($response, 200);
        }

        if( isset($all["listagem"]) ){ //para renderizar as interfaces convencionais
           $result_pro = Profissional::orderBy('pro_nome')->get();
           $result = ProfissionalResource::collection($result_pro); //only works for colection

           $response = [
                'status' => true,
                'message' => 'Dados Profissional',
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
        $request->merge(['pro_created_at' => date("Y-m-d H:i:s")]);
        $input = $request->all();

        $validator = Validator::make($input, [
            'pro_nome' => 'required',
        ]);

        if($validator->fails()){
            $teste = $validator->errors();
            if ($validator->fails())  {
                return response()->json(['error'=>$validator->errors()], 401);
            }
        }

        $profissional = Profissional::create($input);

        $pro = new ProfissionalResource(Profissional::findOrFail($profissional->pro_id_pro));

        $arr_result = [
            "status" => true,
            "mensagem" => "Profissional Inproido com sucesso!!!",
            "data" => $pro,
        ];

        return json_encode($arr_result,JSON_PRETTY_PRINT);

    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request,string $id)
    {
       //$pro = Profissional::find($id);

       $cli = new ProfissionalResource(Profissional::findOrFail($id));

       $arr_result = [
            "status" => true,
            "mensagem" => "Dados do Profissional!!!",
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
       $profissional = Profissional::find($id);


       if( isset($input["has_image"]) ){

            $file = $request->file('file');
            $fileName  = $file->getClientOriginalName();
            $path = 'img/profissional/'.$fileName;
            //Adiciona a nova imagem e atualiza o conteudo
            Storage::disk('inertia_img')->put($path, file_get_contents($file));
            $input["pro_imagem"] = 'profissional/'.$fileName;
       }

       $profissional->update($input);

       $pro = new ProfissionalResource($profissional);
       $arr_result = [
            "status" => true,
            "mensagem" => "Profissional Atualizado com Sucesso!!!",
            "data" => $pro
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

    public function reduzimage($from,$to){
       $origem = Storage::disk('inertia_img')->path('img/profissional/image1.png');
       $destino = Storage::disk('inertia_img')->path('img/profissional/image2.png');
       $imagem = imagecreatefrompng($origem);
       imagepng($imagem, $destino, 9);
       imagedestroy($imagem);
    }

    public function reduzimage1($from,$to){

        $origem = Storage::disk('inertia_img')->path('img/profissional/image1.png');
        $destino = Storage::disk('inertia_img')->path('img/profissional/image1_reduzida.png');

        $imagem = imagecreatefrompng($origem);

        $larguraOriginal = imagesx($imagem);
        $alturaOriginal = imagesy($imagem);

        // Define a nova largura e mantém a proporção
        $novaLargura = 800;
        $novaAltura = (int) round(
            $alturaOriginal * ($novaLargura / $larguraOriginal)
        );

        $novaImagem = imagecreatetruecolor($novaLargura, $novaAltura);

        // Preserva a transparência do PNG
        imagealphablending($novaImagem, false);
        imagesavealpha($novaImagem, true);
        imagecopyresampled(
            $novaImagem,
            $imagem,
            0, 0, 0, 0,
            $novaLargura, $novaAltura,
            $larguraOriginal, $alturaOriginal
        );

        // Salva com compressão máxima
        imagepng($novaImagem, $destino, 9);

        // Libera a memória
        imagedestroy($imagem);
        imagedestroy($novaImagem);
       // imagepng($novaImagem, $destino, 9);

    }
    /*
    use Illuminate\Support\Facades\Storage;

$origem = Storage::disk('inertia_img')->path('img/logo.png');
$destino = Storage::disk('inertia_img')->path('img/logo_reduzida.png');

$imagem = imagecreatefrompng($origem);

$larguraOriginal = imagesx($imagem);
$alturaOriginal = imagesy($imagem);

// Define a nova largura e mantém a proporção
$novaLargura = 800;
$novaAltura = (int) round(
    $alturaOriginal * ($novaLargura / $larguraOriginal)
);

$novaImagem = imagecreatetruecolor($novaLargura, $novaAltura);

// Preserva a transparência do PNG
imagealphablending($novaImagem, false);
imagesavealpha($novaImagem, true);
    */

}
