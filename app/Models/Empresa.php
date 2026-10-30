<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Empresa extends Model
{
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    //protected $connection = 'pgsqlmedical'; <-- se for utiizar outro banco de dados
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'emp_empresa';
    protected $primaryKey = 'emp_id_emp';
    protected $appends = ['tipos','tags','acao'];
    //,'pla_planosaude','pac_planosaude'];
    protected $fillable = [
        'emp_email', 'emp_nome', 'emp_tipo_empresa', 'emp_cnpj_cpf', 'emp_tipo_telefone', 'emp_telefone', 'emp_ativo', 'emp_logo', 'emp_hash', 'emp_created_at', 'emp_updated_at', 'emp_deleted_at'
    ];
    //emp_id_emp,emp_email,emp_tipo_empresa,emp_cnpj_cpf,emp_tipo_telefone,emp_telefone,emp_created_at,emp_updated_at,emp_deleted_at
    protected $dates = ['pac_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'emp_created_at';
    const UPDATED_AT  = 'emp_updated_at';
    const DELETED_AT  = 'emp_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'emp_created_at' => 'datetime:Y-m-d H:i:s',
        'emp_updated_at' => 'datetime:Y-m-d H:i:s',
        'emp_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];


    public function sections()
    {
        return $this->hasMany(Sections::class, 'sec_id_emp', 'emp_id_emp')
        ->select('sec_id_sec','sec_nome','sec_id_emp');
    }


    protected function gettiposAttribute(){
       $all = TipoParametro::all()->select('tip_id_tip','tip_nome');
       return $all;
    }

    protected function gettagsAttribute(){
       $all = TagCampo::all()->select('tag_id_tag','tag_nome');
       return $all;
    }
    /*
    protected function getPacPlanosaudeAttribute(){ //--> especilidade
       if( isset($this->pac_id_pla) ){
          $esp = PlanoSaude::find($this->pac_id_pla);
          return $esp->pla_nome;
       }
    }

    protected function getPlaPlanosaudeAttribute(){ //--> especilidade
       if( isset($this->pac_id_pla) ){
          $esp = PlanoSaude::select('pla_id_pla','pla_nome')->orderBy('pla_nome','asc')->get();
          return $esp;
       }
    }


    */

    protected function getacaoAttribute(){ //--> qtde_escopos
        return 1;
    }

    //boot events
    public static function boot()
    {
        parent::boot();

        self::creating(function($model){//before create
            $model->emp_created_at = date("Y-m-d H:i:s.u");
            $model->emp_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->emp_updated_at = date("Y-m-d H:i:s.u");
        });
        /*
        self::created(function($model){
            // ... code here
        });


        self::updated(function($model){
            // ... code here
        });

        self::deleting(function($model){
            // ... code here
        });

        self::deleted(function($model){
            // ... code here
        });
        */
    }

}
