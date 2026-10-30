<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class AgendaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'age_id_age','age_id_prc','age_id_pro','age_data_inicio','age_data_fim','age_agevicos','age_descricao','age_ativo','age_finalizada','age_created_at','age_updated_at','age_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
            $data =[
                "age_id_age" =>$this->age_id_age,
                "age_id_prc" =>$this->age_id_prc,
                "age_proposta" =>$this->proposta,
                "age_id_pro" =>$this->age_id_pro,
                "age_profissional" =>$this->proposta,
                "age_data_inicio" =>Carbon::parse($this->age_data_inicio)->format('d/m/Y H:i:s'),
                "age_data_fim" =>$this->age_data_fim != null ?Carbon::parse($this->age_data_fim)->format('d/m/Y H:i:s') :null,
                "age_servicos" =>$this->age_servicos,
                "age_descricao" =>$this->age_descricao,
                "age_ativo" =>$this->age_ativo,
                "age_finalizada" =>$this->age_finalizada,
                "age_created_at" =>Carbon::parse($this->age_created_at)->format('d/m/Y H:i:s'),
                "age_updated_at" =>$this->age_updated_at != null ? Carbon::parse($this->age_updated_at)->format('d/m/Y H:i:s') : null,
                "age_deleted_at" =>$this->age_deleted_at != null ? Carbon::parse($this->age_deleted_at)->format('d/m/Y H:i:s') : null,
                "age_acao" => null
            ];
      }  else if($request->has('init_man')){
          $data =  [
            "age_id_age" =>$this->age_id_age,
            "age_nome" =>$this->age_nome,
            "age_sections"=>$this->sections,
            "age_tipos"=>$this->tipos,
            "age_tags"=>$this->tags,
          ];
      } else {
           $data =[
                "age_id_age" =>$this->age_id_age,
                "age_id_prc" =>$this->age_id_prc,
                "age_proposta" =>$this->proposta,
                "age_id_pro" =>$this->age_id_pro,
                "age_profissional" =>$this->proposta,
                "age_data_inicio" =>Carbon::parse($this->age_data_inicio)->format('d/m/Y H:i:s'),
                "age_data_fim" =>$this->age_data_fim != null ?Carbon::parse($this->age_data_fim)->format('d/m/Y H:i:s') :null,
                "age_servicos" =>$this->age_servicos,
                "age_descricao" =>$this->age_descricao,
                "age_ativo" =>$this->age_ativo,
                "age_finalizada" =>$this->age_finalizada,
                "age_created_at" =>Carbon::parse($this->age_created_at)->format('d/m/Y H:i:s'),
                "age_updated_at" =>$this->age_updated_at != null ? Carbon::parse($this->age_updated_at)->format('d/m/Y H:i:s') : null,
                "age_deleted_at" =>$this->age_deleted_at != null ? Carbon::parse($this->age_deleted_at)->format('d/m/Y H:i:s') : null,
                "age_acao" => null
            ];
        }
        return $data;
    }
}
