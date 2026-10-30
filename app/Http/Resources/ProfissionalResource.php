<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ProfissionalResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * pro_id_pro,pro_nome,pro_email,pro_tipo_telefone,pro_telefone,pro_habilidades,pro_imagem,pro_created_at,pro_updated_at,pro_deleted_at
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
            $data =[
                "pro_id_pro" =>$this->pro_id_pro,
                "pro_nome" =>$this->pro_nome,
                "pro_email" =>$this->pro_email,
                "pro_tipo_telefone" =>$this->pro_tipo_telefone,
                "pro_telefone" =>$this->pro_telefone,
                "pro_habilidades" =>$this->pro_habilidades,
                "pro_imagem" =>$this->pro_imagem,
                "pro_servico" =>$this->servico,
                "pro_created_at" =>Carbon::parse($this->pro_created_at)->format('d/m/Y H:i:s'),
                "pro_updated_at" =>$this->pro_updated_at != null ? Carbon::parse($this->pro_updated_at)->format('d/m/Y H:i:s') : null,
                "pro_deleted_at" =>$this->pro_deleted_at != null ? Carbon::parse($this->pro_deleted_at)->format('d/m/Y H:i:s') : null,
                "pro_acao" => null
            ];
      }  else if($request->has('init_man')){
          $data =  [
            "pro_id_pro" =>$this->pro_id_pro,
            "pro_nome" =>$this->pro_nome,
            "pro_sections"=>$this->sections,
            "pro_tipos"=>$this->tipos,
            "pro_tags"=>$this->tags,
          ];
      } else {
           $data =[
                "pro_id_pro" =>$this->pro_id_pro,
                "pro_nome" =>$this->pro_nome,
                "pro_email" =>$this->pro_email,
                "pro_tipo_telefone" =>$this->pro_tipo_telefone,
                "pro_telefone" =>$this->pro_telefone,
                "pro_habilidades" =>$this->pro_habilidades,
                "pro_imagem" =>$this->pro_imagem,
                "pro_servico" =>$this->servico,
                "pro_created_at" =>Carbon::parse($this->pro_created_at)->format('d/m/Y H:i:s'),
                "pro_updated_at" =>$this->pro_updated_at != null ? Carbon::parse($this->pro_updated_at)->format('d/m/Y H:i:s') : null,
                "pro_deleted_at" =>$this->pro_deleted_at != null ? Carbon::parse($this->pro_deleted_at)->format('d/m/Y H:i:s') : null,
                "pro_acao" => null
            ];
        }
        return $data;
    }
}
