<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ServicoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'ser_id_ser','ser_descricao','ser_created_at','ser_updated_at','ser_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
            $data =[
                "ser_id_ser" =>$this->ser_id_ser,
                "ser_descricao" =>$this->ser_descricao,
                "ser_created_at" =>Carbon::parse($this->ser_created_at)->format('d/m/Y H:i:s'),
                "ser_updated_at" =>$this->ser_updated_at != null ? Carbon::parse($this->ser_updated_at)->format('d/m/Y H:i:s') : null,
                "ser_deleted_at" =>$this->ser_deleted_at != null ? Carbon::parse($this->ser_deleted_at)->format('d/m/Y H:i:s') : null,
                "ser_acao" => null
            ];
      }  else if($request->has('init_man')){
          $data =  [
            "ser_id_ser" =>$this->ser_id_ser,
            "ser_nome" =>$this->ser_nome,
            "ser_sections"=>$this->sections,
            "ser_tipos"=>$this->tipos,
            "ser_tags"=>$this->tags,
          ];
      } else {
           $data =[
                "ser_id_ser" =>$this->ser_id_ser,
                "ser_descricao" =>$this->ser_descricao,
                "ser_created_at" =>Carbon::parse($this->ser_created_at)->format('d/m/Y H:i:s'),
                "ser_updated_at" =>$this->ser_updated_at != null ? Carbon::parse($this->ser_updated_at)->format('d/m/Y H:i:s') : null,
                "ser_deleted_at" =>$this->ser_deleted_at != null ? Carbon::parse($this->ser_deleted_at)->format('d/m/Y H:i:s') : null,
                "ser_acao" => null
            ];
        }
        return $data;
    }
}
