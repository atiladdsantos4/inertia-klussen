<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ControleEmailResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * coe_id_coe,coe_id_prc,coe_email_proposta,coe_email_recibo,coe_created_at,coe_updated_at,coe_deleted_at
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
            $data =[
                "coe_id_coe" =>$this->coe_id_coe,
                "coe_id_prc" =>$this->coe_id_prc,
                "coe_email_recibo" =>$this->coe_email_recibo,
                "coe_data_recibo" =>$this->coe_data_recibo !=  null ? Carbon::parse($this->coe_data_recibo)->format('d/m/Y') : null,
                "coe_email_proposta" =>$this->coe_email_proposta,
                "coe_data_proposta" =>$this->coe_data_proposta !=  null ? Carbon::parse($this->coe_data_proposta)->format('d/m/Y') : null,
                "coe_email_agradecimento" =>$this->coe_email_agradecimento,
                "coe_data_agradecimento" =>$this->coe_data_agradecimento !=  null ? Carbon::parse($this->coe_data_agradecimento)->format('d/m/Y') : null,
                "coe_created_at" =>Carbon::parse($this->coe_created_at)->format('d/m/Y H:i:s'),
                "coe_updated_at" =>$this->coe_updated_at != null ? Carbon::parse($this->coe_updated_at)->format('d/m/Y H:i:s') : null,
                "coe_deleted_at" =>$this->coe_deleted_at != null ? Carbon::parse($this->coe_deleted_at)->format('d/m/Y H:i:s') : null,
                "coe_acao" => null
            ];
      }  else if($request->has('init_man')){
          $data =  [
            "coe_id_coe" =>$this->coe_id_coe,
            "coe_nome" =>$this->coe_nome,
            "coe_sections"=>$this->sections,
            "coe_tipos"=>$this->tipos,
            "coe_tags"=>$this->tags,
          ];
      } else {
           $data =[
                "coe_id_coe" =>$this->coe_id_coe,
                "coe_id_prc" =>$this->coe_id_prc,
                "coe_email_recibo" =>$this->coe_email_recibo,
                "coe_data_recibo" =>$this->coe_data_recibo !=  null ? Carbon::parse($this->coe_data_recibo)->format('d/m/Y') : null,
                "coe_email_proposta" =>$this->coe_email_proposta,
                "coe_data_proposta" =>$this->coe_data_proposta !=  null ? Carbon::parse($this->coe_data_proposta)->format('d/m/Y') : null,
                "coe_email_agradecimento" =>$this->coe_email_agradecimento,
                "coe_data_agradecimento" =>$this->coe_data_agradecimento !=  null ? Carbon::parse($this->coe_data_agradecimento)->format('d/m/Y') : null,
                "coe_created_at" =>Carbon::parse($this->coe_created_at)->format('d/m/Y H:i:s'),
                "coe_updated_at" =>$this->coe_updated_at != null ? Carbon::parse($this->coe_updated_at)->format('d/m/Y H:i:s') : null,
                "coe_deleted_at" =>$this->coe_deleted_at != null ? Carbon::parse($this->coe_deleted_at)->format('d/m/Y H:i:s') : null,
                "coe_acao" => null
            ];
        }
        return $data;
    }
}
