<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Servico extends Model
{
    //ser_id_ser,ser_descricao,ser_created_at,ser_updated_at,ser_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'ser_servico';
    protected $primaryKey = 'ser_id_ser';
    protected $appends = ['acao'];
    protected $fillable = [
       'ser_id_ser','ser_descricao','ser_created_at','ser_updated_at','ser_deleted_at'
    ];
    protected $dates = ['ser_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'ser_created_at';
    const UPDATED_AT  = 'ser_updated_at';
    const DELETED_AT  = 'ser_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'ser_created_at' => 'datetime:Y-m-d H:i:s',
        'ser_updated_at' => 'datetime:Y-m-d H:i:s',
        'ser_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    // public function agendamentos(){ //--> especilidade
    //   return $this->hasMany(ClienteAgendado::class, 'cla_id_ser', 'ser_id_ser');
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
            $model->ser_created_at = date("Y-m-d H:i:s.u");
            $model->ser_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->ser_updated_at = date("Y-m-d H:i:s.u");
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
