<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class MedidasResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * unm_id_unm,unm_descricao,unm_sigla,unm_sigla_hol,unm_created_at,unm_updated_at,unm_deleted_at
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
            $data =[
                "unm_id_unm" =>$this->unm_id_unm,
                "unm_descricao" =>$this->unm_descricao,
                "unm_sigla" =>$this->unm_sigla,
                "unm_sigla_hol"  =>$this->unm_sigla_hol,
                "unm_created_at" =>Carbon::parse($this->unm_created_at)->format('d/m/Y H:i:s'),
                "unm_updated_at" =>$this->unm_updated_at != null ? Carbon::parse($this->unm_updated_at)->format('d/m/Y H:i:s') : null,
                "unm_deleted_at" =>$this->unm_deleted_at != null ? Carbon::parse($this->unm_deleted_at)->format('d/m/Y H:i:s') : null,
                "unm_acao" => null
            ];
      }  else if($request->has('init_man')){
          $data =  [
            "unm_id_unm" =>$this->unm_id_unm,
            "unm_nome" =>$this->unm_nome,
            "unm_sections"=>$this->sections,
            "unm_tipos"=>$this->tipos,
            "unm_tags"=>$this->tags,
          ];
      } else {
           $data =[
                "unm_id_unm" =>$this->unm_id_unm,
                "unm_descricao" =>$this->unm_descricao,
                "unm_sigla" =>$this->unm_sigla,
                "unm_sigla_hol"  =>$this->unm_sigla_hol,
                "unm_created_at" =>Carbon::parse($this->unm_created_at)->format('d/m/Y H:i:s'),
                "unm_updated_at" =>$this->unm_updated_at != null ? Carbon::parse($this->unm_updated_at)->format('d/m/Y H:i:s') : null,
                "unm_deleted_at" =>$this->unm_deleted_at != null ? Carbon::parse($this->unm_deleted_at)->format('d/m/Y H:i:s') : null,
                "unm_acao" => null
            ];
        }
        return $data;
    }
}
