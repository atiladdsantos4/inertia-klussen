<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Agenda extends Model
{
    //age_id_age,age_descricao,age_created_at,age_updated_at,age_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'age_agenda';
    protected $primaryKey = 'age_id_age';
    protected $appends = ['acao'];
    protected $fillable = [
       'age_id_age','age_id_prc','age_id_pro','age_data_inicio','age_data_fim','age_servicos','age_ativo','age_finalizada','age_created_at','age_updated_at','age_deleted_at'
    ];
    protected $dates = ['age_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'age_created_at';
    const UPDATED_AT  = 'age_updated_at';
    const DELETED_AT  = 'age_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'age_created_at' => 'datetime:Y-m-d H:i:s',
        'age_updated_at' => 'datetime:Y-m-d H:i:s',
        'age_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function proposta(){ //--> especilidade
      return $this->hasOne(Proposta::class, 'prc_id_prc', 'age_id_prc');
    }

    public function profissinal(){ //--> especilidade
      return $this->hasOne(Profissional::class, 'pro_id_pro', 'age_id_pro');
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
            $model->age_created_at = date("Y-m-d H:i:s.u");
            $model->age_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->age_updated_at = date("Y-m-d H:i:s.u");
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
