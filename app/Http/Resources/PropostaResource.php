<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class PropostaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'prc_id_prc','prc_id_cli','prc_data_proposta','prc_qtde_validade','prc_ia_conteudo','prc_valor','prc_desconto','prc_valor_final','prc_ativa','prc_created_at,prc_updated_at,prc_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
            $data =[
                "prc_id_prc" =>$this->prc_id_prc,
                "prc_id_cli" =>$this->prc_id_cli,
                "prc_cliente" =>$this->cliente,
                "prc_data_proposta" =>Carbon::parse($this->prc_data_proposta)->format('d/m/Y'),
                "prc_qtde_validade" =>$this->prc_qtde_validade,
                "prc_data_validade" =>Carbon::parse($this->prc_data_validade)->format('d/m/Y'),
                //"prc_ia_conteudo" =>$this->prc_ia_conteudo,
                "prc_valor" =>$this->prc_valor,
                "prc_desconto" =>$this->prc_desconto,
                "prc_valor_final" =>$this->prc_valor_final,
                "prc_ativa" =>$this->prc_ativa,
                "prc_aceita" =>$this->prc_aceita,
                "prc_data_aceite" =>$this->prc_data_aceite != null ? Carbon::parse($this->prc_data_aceite)->format('d/m/Y') : null,
                "prc_itens"=>$this->prc_itens,
                "prc_email"=>$this->email,
                "prc_created_at" =>Carbon::parse($this->prc_created_at)->format('d/m/Y H:i:s'),
                "prc_updated_at" =>$this->prc_updated_at != null ? Carbon::parse($this->prc_updated_at)->format('d/m/Y H:i:s') : null,
                "prc_deleted_at" =>$this->prc_deleted_at != null ? Carbon::parse($this->prc_deleted_at)->format('d/m/Y H:i:s') : null,
                "prc_acao" => null
            ];
      }  else if($request->has('init_man')){
          $data =  [
            "prc_id_prc" =>$this->prc_id_prc,
            "prc_nome" =>$this->prc_nome,
            "prc_sections"=>$this->sections,
            "prc_tipos"=>$this->tipos,
            "prc_tags"=>$this->tags,
          ];
      } else {
            $data =[
                "prc_id_prc" =>$this->prc_id_prc,
                "prc_id_cli" =>$this->prc_id_cli,
                "prc_cliente" =>$this->cliente,
                "prc_data_proposta" =>Carbon::parse($this->prc_data_proposta)->format('d/m/Y'),
                'prc_data_proposta_format' => Carbon::parse($this->prc_data_proposta)->format('Y/m/d'),
                "prc_qtde_validade" =>$this->prc_qtde_validade,
                "prc_data_validade" =>Carbon::parse($this->prc_data_validade)->format('d/m/Y'),
                'prc_data_validade_format' => Carbon::parse($this->prc_data_validade)->format('Y/m/d'),
                "prc_ia_conteudo" =>$this->prc_ia_conteudo,
                "prc_valor" =>$this->prc_valor,
                "prc_desconto" =>$this->prc_desconto,
                "prc_valor_final" =>$this->prc_valor_final,
                "prc_ativa" =>$this->prc_ativa,
                "prc_aceita" =>$this->prc_aceita,
                "prc_data_aceite" =>$this->prc_data_aceite != null ? Carbon::parse($this->prc_data_aceite)->format('d/m/Y') : null,
                "prc_itens"=>$this->prc_itens,
                "prc_email"=>$this->email,
                "prc_created_at" =>Carbon::parse($this->prc_created_at)->format('d/m/Y H:i:s'),
                "prc_updated_at" =>$this->prc_updated_at != null ? Carbon::parse($this->prc_updated_at)->format('d/m/Y H:i:s') : null,
                "prc_deleted_at" =>$this->prc_deleted_at != null ? Carbon::parse($this->prc_deleted_at)->format('d/m/Y H:i:s') : null,
                "prc_acao" => null
            ];
        }
        return $data;
    }
}
