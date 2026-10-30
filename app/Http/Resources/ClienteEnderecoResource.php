<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ClienteEnderecoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * 'cle_id_cle','cle_id_pai','cle_id_cid','cle_id_cli','cle_endereco','cle_tem_numero','cle_numero','cle_zipcode','cle_adicional','cle_created_at','cle_updated_at','cle_deleted_at'
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
       if( $request->has('cad_cli') ){
            $data =  [
            "cle_id_cli" =>$this->cle_id_cli,
            "cle_id_pai" =>$this->cle_id_pai,
            "cle_id_adm" =>$this->cle_id_adm,
            "cle_admin" =>$this->admin->adm_descricao,
            "cle_descricao" =>$this->cle_descricao
          ];
      }  else if($request->has('listagem')){
          $data =[//'cle_id_cle','cle_id_pai','cle_id_cid','cle_id_cli','cle_endereco','cle_tem_numero','cle_numero','cle_zipcode','cle_adicional','cle_created_at','cle_updated_at','cle_deleted_at'
                "cle_id_cli" =>$this->cle_id_cli,
                "cle_id_pai" =>$this->cle_id_pai,
                "cle_pais" =>$this->pais->pai_descricao,
                "cle_id_cid" =>$this->cle_id_cid,
                "cle_cidade" =>$this->cidade->cid_descricao,
                "cle_id_cli" =>$this->cle_id_cli,
                "cle_cliente" =>$this->cliente->cli_nome,
                "cle_endereco" =>$this->cle_endereco,
                "cle_tem_numero" =>$this->cle_tem_numero,
                "cle_numero" =>$this->cle_numero,
                "cle_zipcode" =>$this->cle_zipcode,
                "cle_adicional" =>$this->cle_adicional,
                "cle_created_at" =>Carbon::parse($this->cle_created_at)->format('d/m/Y H:i:s'),
                "cle_updated_at" =>$this->cle_updated_at != null ? Carbon::parse($this->cle_updated_at)->format('d/m/Y H:i:s') : null,
                "cle_deleted_at" =>$this->cle_deleted_at != null ? Carbon::parse($this->cle_deleted_at)->format('d/m/Y H:i:s') : null,
                "cle_acao" => null
          ];
      } else {
           $data =[
              "cle_id_cli" =>$this->cle_id_cli,
              "cle_id_pai" =>$this->cle_id_pai,
              "cle_pais" =>$this->pais->pai_descricao,
              "cle_id_cid" =>$this->cle_id_cid,
              "cle_cidade" =>$this->cidade->cid_descricao,
              "cle_id_cli" =>$this->cle_id_cli,
              "cle_cliente" =>$this->cliente->cli_nome,
              "cle_endereco" =>$this->cle_endereco,
              "cle_tem_numero" =>$this->cle_tem_numero,
              "cle_numero" =>$this->cle_numero,
              "cle_zipcode" =>$this->cle_zipcode,
              "cle_adicional" =>$this->cle_adicional,
              "cle_created_at" =>Carbon::parse($this->cle_created_at)->format('d/m/Y H:i:s'),
              "cle_updated_at" =>$this->cle_updated_at != null ? Carbon::parse($this->cle_updated_at)->format('d/m/Y H:i:s') : null,
              "cle_deleted_at" =>$this->cle_deleted_at != null ? Carbon::parse($this->cle_deleted_at)->format('d/m/Y H:i:s') : null,
              "cle_acao" => null
            ];
        }
        return $data;
    }
}
