<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class ServicoItem extends Model
{
    //sei_id_sei,sei_descricao,sei_created_at,sei_updated_at,sei_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'sei_servico_item';
    protected $primaryKey = 'sei_id_sei';
    protected $appends = ['acao'];
    protected $fillable = [
       'sei_id_sei','sei_id_ser','sei_descricao','sei_id_unm','sei_created_at','sei_updated_at','sei_deleted_at'
    ];
    protected $dates = ['sei_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'sei_created_at';
    const UPDATED_AT  = 'sei_updated_at';
    const DELETED_AT  = 'sei_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'sei_created_at' => 'datetime:Y-m-d H:i:s',
        'sei_updated_at' => 'datetime:Y-m-d H:i:s',
        'sei_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function servico(){ //--> especilidade
       return $this->hasOne(Servico::class, 'ser_id_ser', 'sei_id_ser');
       //->makeHidden(['dataini', 'datafim']);

    }

    public function unidade(){ //--> especilidade
       return $this->hasOne(Medidas::class, 'unm_id_unm', 'sei_id_unm');
       //->makeHidden(['dataini', 'datafim']);

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
            $model->sei_created_at = date("Y-m-d H:i:s.u");
            $model->sei_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->sei_updated_at = date("Y-m-d H:i:s.u");
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
