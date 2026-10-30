<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;

class ChatPGTController extends Controller
{
    public function index(Request $request)
    {

        $all = $request->all();
        //if(isset($all["proposta"])){
            $html = view('chatgpt.template_orcamento')->render();
            return response()->json([
                'status' => 'ok',
                'proposta' => request()->query('proposta'),
                'html' => $html ?? null,
            ]);
            //return response($corpo,200)->header('Content-Type', 'text/html; charset=UTF-8');
        //
    }
}
