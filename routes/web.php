<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\EmpresaController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\ChatPGTController;
use App\Services\AiService;
use Illuminate\Http\Request;


Route::get('/', function () {
    return view('welcome');
});

Route::get('/site', function () {
    return Inertia::render('Admin');
});

Route::get('/template', function () {
    return Inertia::render('Template');
});

/*login e token */
Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);


Route::prefix('empresa')->group(function () {
   Route::post('storeapi', [EmpresaController::class, 'storeApi'])->name('empresa.storeApi');
   Route::post('store', [EmpresaController::class, 'store'])->name('empresa.store');
   Route::get('index', [EmpresaController::class, 'index'])->name('empresa.index');
});

Route::prefix('email')->group(function () {
   Route::get('proposta', [ClienteController::class, 'proposta'])->name('cliente.proposta');
});

Route::prefix('chagpt')->group(function () {
   Route::get('proposta', [ChatPGTController::class, 'index'])->name('chatgpt.proposta');
});

Route::post('/ia/testar', function (Request $request, AiService $ai) {
    $dados = $request->validate([
        'mensagem' => ['required', 'string', 'max:2000'],
    ]);

    return response()->json([
        'resposta' => $ai->responder($dados['mensagem']),
    ]);
})->name('ia.testar');

Route::get('/site-json', function () {
    return response()->json([
        'titulo' => 'Klussen',
        'html' => view('welcome')->render(),
    ]);
});
