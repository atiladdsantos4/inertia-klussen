<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class TipoClienteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'tic_id_tic','tic_descricao','tic_created_at','tic_updated_at','tic_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
            $data =[
                "tic_id_tic" =>$this->tic_id_tic,
                "tic_descricao" =>$this->tic_descricao,
                "tic_created_at" =>Carbon::parse($this->tic_created_at)->format('d/m/Y H:i:s'),
                "tic_updated_at" =>$this->tic_updated_at != null ? Carbon::parse($this->tic_updated_at)->format('d/m/Y H:i:s') : null,
                "tic_deleted_at" =>$this->tic_deleted_at != null ? Carbon::parse($this->tic_deleted_at)->format('d/m/Y H:i:s') : null,
                "tic_acao" => null
            ];
      }  else if($request->has('init_man')){
          $data =  [
            "tic_id_tic" =>$this->tic_id_tic,
            "tic_nome" =>$this->tic_nome,
            "tic_sections"=>$this->sections,
            "tic_tipos"=>$this->tipos,
            "tic_tags"=>$this->tags,
          ];
      } else {
           $data =[
                "tic_id_tic" =>$this->tic_id_tic,
                "tic_descricao" =>$this->tic_descricao,
                "tic_created_at" =>Carbon::parse($this->tic_created_at)->format('d/m/Y H:i:s'),
                "tic_updated_at" =>$this->tic_updated_at != null ? Carbon::parse($this->tic_updated_at)->format('d/m/Y H:i:s') : null,
                "tic_deleted_at" =>$this->tic_deleted_at != null ? Carbon::parse($this->tic_deleted_at)->format('d/m/Y H:i:s') : null,
                "tic_acao" => null
            ];
        }
        return $data;
    }
}
