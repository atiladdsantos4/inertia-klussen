<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class PaisResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'pai_id_pai','pai_descricao','pai_created_at','pai_updated_at','pai_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
            $data =[
                "pai_id_pai" =>$this->pai_id_pai,
                "pai_iso" =>$this->pai_iso,
                "pai_descricao" =>$this->pai_descricao,
                "pai_created_at" =>Carbon::parse($this->pai_created_at)->format('d/m/Y H:i:s'),
                "pai_updated_at" =>$this->pai_updated_at != null ? Carbon::parse($this->pai_updated_at)->format('d/m/Y H:i:s') : null,
                "pai_deleted_at" =>$this->pai_deleted_at != null ? Carbon::parse($this->pai_deleted_at)->format('d/m/Y H:i:s') : null,
                "pai_acao" => null
            ];
      }  else if($request->has('init_man')){
          $data =  [
            "pai_id_pai" =>$this->pai_id_pai,
            "pai_nome" =>$this->pai_nome,
            "pai_sections"=>$this->sections,
            "pai_tipos"=>$this->tipos,
            "pai_tags"=>$this->tags,
          ];
      } else {
           $data =[
                "pai_id_pai" =>$this->pai_id_pai,
                "pai_iso" =>$this->pai_iso,
                "pai_descricao" =>$this->pai_descricao,
                "pai_created_at" =>Carbon::parse($this->pai_created_at)->format('d/m/Y H:i:s'),
                "pai_updated_at" =>$this->pai_updated_at != null ? Carbon::parse($this->pai_updated_at)->format('d/m/Y H:i:s') : null,
                "pai_deleted_at" =>$this->pai_deleted_at != null ? Carbon::parse($this->pai_deleted_at)->format('d/m/Y H:i:s') : null,
                "pai_acao" => null
            ];
        }
        return $data;
    }
}
