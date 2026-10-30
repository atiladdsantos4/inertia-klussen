<?php

namespace App\Services;

use OpenAI\Laravel\Facades\OpenAI;

class AiService
{
    public function responder(string $mensagem): string
    {
        // Modo simulado: não chama a API e não gera cobrança.
        if (! config('services.ai.enabled', false)) {
            return 'Resposta simulada da IA: recebi sua mensagem: '
                . $mensagem;
        }

        $resposta = OpenAI::responses()->create([
            'model' => 'gpt-4.1-mini',
            'input' => $mensagem,
        ]);

        return $resposta->outputText;
    }
}