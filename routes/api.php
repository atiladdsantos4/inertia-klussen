<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\TipoClienteController;
use App\Http\Controllers\Api\ServicoController;
use App\Http\Controllers\Api\ServicoItemController;
use App\Http\Controllers\Api\AreaAdminController;
use App\Http\Controllers\Api\PaisController;
use App\Http\Controllers\Api\CidadeController;
use App\Http\Controllers\Api\ClienteController;
use App\Http\Controllers\Api\ClienteEnderecoController;
use App\Http\Controllers\Api\PropostaController;
use App\Http\Controllers\Api\PHPMailerController;
use App\Http\Controllers\Api\MedidasController;
use App\Http\Controllers\Api\ProfissionalController;
use App\Http\Controllers\Api\AgendaController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::apiResource('tipocliente',TipoClienteController::class)->middleware('auth:sanctum');
Route::apiResource('servico',ServicoController::class)->middleware('auth:sanctum');
Route::apiResource('servicoitem',ServicoItemController::class)->middleware('auth:sanctum');
Route::apiResource('admin',AreaAdminController::class)->middleware('auth:sanctum');
Route::apiResource('pais',PaisController::class)->middleware('auth:sanctum');
Route::apiResource('cidade',CidadeController::class)->middleware('auth:sanctum');
Route::apiResource('cliente',ClienteController::class)->middleware('auth:sanctum');
Route::apiResource('cliendereco',ClienteEnderecoController::class)->middleware('auth:sanctum');
Route::apiResource('proposta',PropostaController::class)->middleware('auth:sanctum');
Route::apiResource('email',PHPMailerController::class)->middleware('auth:sanctum');
Route::apiResource('medidas',MedidasController::class)->middleware('auth:sanctum');
Route::apiResource('profissional',ProfissionalController::class)->middleware('auth:sanctum');
Route::apiResource('agenda',AgendaController::class)->middleware('auth:sanctum');
