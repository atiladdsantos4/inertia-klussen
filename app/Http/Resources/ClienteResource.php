<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class ClienteResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     * cli_id_cli,cli_nome,cli_email,cli_tipo_telefone,cli_telefone,cli_id_tic,cli_ativo,cli_created_at,cli_updated_at,cli_deleted_at
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
       if( $request->has('cad_cli') ){
            $data =  [
            "cli_id_cli" =>$this->cli_id_cli,
            "cli_id_pai" =>$this->cli_id_pai,
            "cli_id_adm" =>$this->cli_id_adm,
            "cli_admin" =>$this->admin->adm_descricao,
            "cli_descricao" =>$this->cli_descricao
          ];
      }  else if($request->has('listagem')){
          $data =[//cli_id_cli,cli_nome,cli_email,cli_tipo_telefone,cli_telefone,cli_id_tic,cli_ativo,cli_created_at,cli_updated_at,cli_deleted_at
                "cli_id_cli" =>$this->cli_id_cli,
                "cli_nome" =>$this->cli_nome,
                "cli_email" =>$this->cli_email,
                "cli_tipo_telefone" =>$this->cli_tipo_telefone,
                "cli_telefone" =>$this->cli_telefone,
                "cli_id_tic" =>$this->cli_id_tic,
                "cli_endereco" =>$this->endereco,
                "cli_tipo" =>$this->tipo->tic_descricao,
                "cli_ativo" =>$this->cli_ativo,
                "cli_created_at" =>Carbon::parse($this->cli_created_at)->format('d/m/Y H:i:s'),
                "cli_updated_at" =>$this->cli_updated_at != null ? Carbon::parse($this->cli_updated_at)->format('d/m/Y H:i:s') : null,
                "cli_deleted_at" =>$this->cli_deleted_at != null ? Carbon::parse($this->cli_deleted_at)->format('d/m/Y H:i:s') : null,
                "cli_acao" => null
          ];
      } else {
           $data =[
                "cli_id_cli" =>$this->cli_id_cli,
                "cli_nome" =>$this->cli_nome,
                "cli_email" =>$this->cli_email,
                "cli_tipo_telefone" =>$this->cli_tipo_telefone,
                "cli_telefone" =>$this->cli_telefone,
                "cli_id_tic" =>$this->cli_id_tic,
                "cli_tipo" =>$this->tipo->tic_descricao,
                "cli_ativo" =>$this->cli_ativo,
                "cli_endereco" =>$this->endereco,
                "cli_created_at" =>Carbon::parse($this->cli_created_at)->format('d/m/Y H:i:s'),
                "cli_updated_at" =>$this->cli_updated_at != null ? Carbon::parse($this->cli_updated_at)->format('d/m/Y H:i:s') : null,
                "cli_deleted_at" =>$this->cli_deleted_at != null ? Carbon::parse($this->cli_deleted_at)->format('d/m/Y H:i:s') : null,
                "cli_acao" => null
            ];
        }
        return $data;
    }
}
