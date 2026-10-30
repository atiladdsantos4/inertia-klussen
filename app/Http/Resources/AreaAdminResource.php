<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class AreaAdminResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
            $data =[
                "adm_id_adm" =>$this->adm_id_adm,
                "adm_descricao" =>$this->adm_descricao,
                "adm_created_at" =>Carbon::parse($this->adm_created_at)->format('d/m/Y H:i:s'),
                "adm_updated_at" =>$this->adm_updated_at != null ? Carbon::parse($this->adm_updated_at)->format('d/m/Y H:i:s') : null,
                "adm_deleted_at" =>$this->adm_deleted_at != null ? Carbon::parse($this->adm_deleted_at)->format('d/m/Y H:i:s') : null,
                "adm_acao" => null
            ];
      }  else if($request->has('init_man')){
          $data =  [
            "adm_id_adm" =>$this->adm_id_adm,
            "adm_nome" =>$this->adm_nome,
            "adm_sections"=>$this->sections,
            "adm_tipos"=>$this->tipos,
            "adm_tags"=>$this->tags,
          ];
      } else {
           $data =[
                "adm_id_adm" =>$this->adm_id_adm,
                "adm_descricao" =>$this->adm_descricao,
                "adm_created_at" =>Carbon::parse($this->adm_created_at)->format('d/m/Y H:i:s'),
                "adm_updated_at" =>$this->adm_updated_at != null ? Carbon::parse($this->adm_updated_at)->format('d/m/Y H:i:s') : null,
                "adm_deleted_at" =>$this->adm_deleted_at != null ? Carbon::parse($this->adm_deleted_at)->format('d/m/Y H:i:s') : null,
                "adm_acao" => null
            ];
        }
        return $data;
    }
}
