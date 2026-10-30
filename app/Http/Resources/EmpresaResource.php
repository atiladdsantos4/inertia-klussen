<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;

class EmpresaResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string =>$this->emp_id_emp, mixed>
     */
    public function toArray(Request $request): array
    {
        if( $request->has('listagem') ){
            $data =[
                "emp_id_emp" =>$this->emp_id_emp,
                "emp_nome" =>$this->emp_nome,
                "emp_email" =>$this->emp_email,
                "emp_tipo_empresa" =>$this->emp_tipo_empresa,
                "emp_cnpj_cpf" =>$this->emp_cnpj_cpf,
                "emp_tipo_telefone" =>$this->emp_tipo_telefone,
                "emp_telefone" =>$this->emp_telefone,
                "emp_ativo" =>$this->emp_ativo,
                "emp_logo" =>$this->emp_logo,
                "emp_hash" =>$this->emp_hash != null ? $this->emp_hash : md5($this->emp_hash.$this->emp_id_emp),
                "emp_created_at" =>Carbon::parse($this->emp_created_at)->format('d/m/Y H:i:s'),
                "emp_updated_at" =>$this->emp_updated_at != null ? Carbon::parse($this->emp_updated_at)->format('d/m/Y H:i:s') : null,
                "emp_deleted_at" =>$this->emp_deleted_at != null ? Carbon::parse($this->emp_deleted_at)->format('d/m/Y H:i:s') : null,
                "emp_acao" => null
            ];
      }  else if($request->has('init_man')){
          $data =  [
            "emp_id_emp" =>$this->emp_id_emp,
            "emp_nome" =>$this->emp_nome,
            "emp_sections"=>$this->sections,
            "emp_tipos"=>$this->tipos,
            "emp_tags"=>$this->tags,
          ];
      } else {
           $data =[
                "emp_id_emp" =>$this->emp_id_emp,
                "emp_nome" =>$this->emp_nome,
                "emp_email" =>$this->emp_email,
                "emp_tipo_empresa" =>$this->emp_tipo_empresa,
                "emp_cnpj_cpf" =>$this->emp_cnpj_cpf,
                "emp_tipo_telefone" =>$this->emp_tipo_telefone,
                "emp_telefone" =>$this->emp_telefone,
                "emp_ativo" =>$this->emp_ativo,
                "emp_logo" =>$this->emp_logo,
                "emp_hash" =>$this->emp_hash,
                "emp_created_at" =>Carbon::parse($this->emp_created_at)->format('d/m/Y H:i:s'),
                "emp_updated_at" =>$this->emp_updated_at != null ? Carbon::parse($this->emp_updated_at)->format('d/m/Y H:i:s') : null,
                "emp_deleted_at" =>$this->emp_deleted_at != null ? Carbon::parse($this->emp_deleted_at)->format('d/m/Y H:i:s') : null,
            ];
        }
        return $data;
    }
}
