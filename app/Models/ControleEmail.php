<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class ControleEmail extends Model
{
    //coe_id_coe,coe_id_prc,coe_email_proposta,coe_email_recibo,coe_created_at,coe_updated_at,coe_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'coe_controle_email';
    protected $primaryKey = 'coe_id_coe';
    protected $appends = ['acao'];
    protected $fillable = [
       'coe_id_coe','coe_id_prc','coe_email_proposta','coe_data_proposta','coe_email_recibo','coe_data_recibo','coe_email_agradecimento','coe_data_agradecimento','coe_created_at','coe_updated_at','coe_deleted_at'
    ];
    protected $dates = ['coe_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'coe_created_at';
    const UPDATED_AT  = 'coe_updated_at';
    const DELETED_AT  = 'coe_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'coe_created_at' => 'datetime:Y-m-d H:i:s',
        'coe_updated_at' => 'datetime:Y-m-d H:i:s',
        'coe_deleted_at' => 'datetime:Y-m-d H:i:s',
        'coe_data_proposta' =>'date:d/m/Y',
        'coe_data_recibo' =>'date:d/m/Y',
        'coe_data_agradecimento' =>'date:d/m/Y',
    ];

    // public function agendamentos(){ //--> especilidade
    //   return $this->hasMany(ClienteAgendado::class, 'cla_id_coe', 'coe_id_coe');
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
            $model->coe_created_at = date("Y-m-d H:i:s.u");
            $model->coe_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->coe_updated_at = date("Y-m-d H:i:s.u");
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
