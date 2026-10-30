<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class CidadeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'cid_id_cid','cid_id_pai','cid_id_adm','cid_descricao','cid_created_at','cid_updated_at','cid_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
       if( $request->has('cad_cli') ){
            $data =  [
            "cid_id_cid" =>$this->cid_id_cid,
            "cid_id_pai" =>$this->cid_id_pai,
            "cid_id_adm" =>$this->cid_id_adm,
            "cid_admin" =>$this->admin->adm_descricao,
            "cid_descricao" =>$this->cid_descricao
          ];
      }  else if($request->has('listagem')){
          $data =[
                "cid_id_cid" =>$this->cid_id_cid,
                "cid_id_pai" =>$this->cid_id_pai,
                "cid_pais" =>$this->pais->pai_descricao,
                "cid_id_adm" =>$this->cid_id_adm,
                "cid_admin" =>$this->admin->adm_descricao,
                "cid_descricao" =>$this->cid_descricao,
                "cid_created_at" =>Carbon::parse($this->cid_created_at)->format('d/m/Y H:i:s'),
                "cid_updated_at" =>$this->cid_updated_at != null ? Carbon::parse($this->cid_updated_at)->format('d/m/Y H:i:s') : null,
                "cid_deleted_at" =>$this->cid_deleted_at != null ? Carbon::parse($this->cid_deleted_at)->format('d/m/Y H:i:s') : null,
                "cid_acao" => null
          ];
      } else {
           $data =[
                "cid_id_cid" =>$this->cid_id_cid,
                "cid_id_pai" =>$this->cid_id_pai,
                "cid_pais" =>$this->pais->pai_descricao,
                "cid_id_adm" =>$this->cid_id_adm,
                "cid_admin" =>$this->admin->adm_descricao,
                "cid_descricao" =>$this->cid_descricao,
                "cid_created_at" =>Carbon::parse($this->cid_created_at)->format('d/m/Y H:i:s'),
                "cid_updated_at" =>$this->cid_updated_at != null ? Carbon::parse($this->cid_updated_at)->format('d/m/Y H:i:s') : null,
                "cid_deleted_at" =>$this->cid_deleted_at != null ? Carbon::parse($this->cid_deleted_at)->format('d/m/Y H:i:s') : null,
                "cid_acao" => null
            ];
        }
        return $data;
    }
}
