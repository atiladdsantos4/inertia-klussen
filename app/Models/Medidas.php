<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Medidas extends Model
{
    //unm_id_unm,unm_descricao,unm_sigla,unm_sigla_hol,unm_created_at,unm_updated_at,unm_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'unm_unidade_medida';
    protected $primaryKey = 'unm_id_unm';
    protected $appends = ['acao'];
    protected $fillable = [
       'unm_id_unm','unm_descricao','unm_sigla','unm_sigla_hol','unm_created_at','unm_updated_at','unm_deleted_at'
    ];
    protected $dates = ['unm_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'unm_created_at';
    const UPDATED_AT  = 'unm_updated_at';
    const DELETED_AT  = 'unm_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'unm_created_at' => 'datetime:Y-m-d H:i:s',
        'unm_updated_at' => 'datetime:Y-m-d H:i:s',
        'unm_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    // public function agendamentos(){ //--> especilidade
    //   return $this->hasMany(ClienteAgendado::class, 'cla_id_unm', 'unm_id_unm');
    //   //->makeHidden(['dataini', 'datafim']);

    // }
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

    public function planosaude()
    {
        return $this->hasOne(PlanoSaude::class, 'pla_id_pla', 'pac_id_pla');
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
            $model->unm_created_at = date("Y-m-d H:i:s.u");
            $model->unm_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->unm_updated_at = date("Y-m-d H:i:s.u");
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
