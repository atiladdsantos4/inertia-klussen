<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ServicoItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'sei_id_sei','sei_descricao','sei_created_at','sei_updated_at','sei_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
            $data =[
                "sei_id_sei" =>$this->sei_id_sei,
                "sei_id_ser" =>$this->sei_id_ser,
                "sei_servico" =>$this->servico->ser_descricao,
                "sei_id_unm"=>$this->sei_id_unm != null ? $this->sei_id_unm : null,
                "sei_unidade"=>$this->sei_id_unm != null ? $this->unidade->unm_sigla : null,
                "sei_descricao" =>$this->sei_descricao,
                "sei_created_at" =>Carbon::parse($this->sei_created_at)->format('d/m/Y H:i:s'),
                "sei_updated_at" =>$this->sei_updated_at != null ? Carbon::parse($this->sei_updated_at)->format('d/m/Y H:i:s') : null,
                "sei_deleted_at" =>$this->sei_deleted_at != null ? Carbon::parse($this->sei_deleted_at)->format('d/m/Y H:i:s') : null,
                "sei_acao" => null
            ];
      }  else if($request->has('init_man')){
          $data =  [
            "sei_id_sei" =>$this->sei_id_sei,
            "sei_nome" =>$this->sei_nome,
            "sei_sections"=>$this->sections,
            "sei_tipos"=>$this->tipos,
            "sei_tags"=>$this->tags,
          ];
      } else {
           $data =[
                "sei_id_sei" =>$this->sei_id_sei,
                "sei_id_ser" =>$this->sei_id_ser,
                "sei_servico" =>$this->servico->ser_descricao,
                "sei_id_unm"=>$this->sei_id_unm != null ? $this->sei_id_unm : null,
                "sei_unidade"=>$this->sei_id_unm != null ? $this->unidade->unm_sigla : null,
                "sei_descricao" =>$this->sei_descricao,
                "sei_created_at" =>Carbon::parse($this->sei_created_at)->format('d/m/Y H:i:s'),
                "sei_updated_at" =>$this->sei_updated_at != null ? Carbon::parse($this->sei_updated_at)->format('d/m/Y H:i:s') : null,
                "sei_deleted_at" =>$this->sei_deleted_at != null ? Carbon::parse($this->sei_deleted_at)->format('d/m/Y H:i:s') : null,
                "sei_acao" => null
            ];
        }
        return $data;
    }
}
