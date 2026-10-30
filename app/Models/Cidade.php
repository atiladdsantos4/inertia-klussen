<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Cidade extends Model
{
    //cid_id_cid,cid_id_cid,cid_id_adm,cid_descricao,cid_created_at,cid_updated_at,cid_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'cid_cidades';
    protected $primaryKey = 'cid_id_cid';
    protected $appends = ['acao'];
    protected $fillable = [
       'cid_id_cid','cid_id_pai','cid_id_adm','cid_descricao','cid_created_at','cid_updated_at','cid_deleted_at'
    ];
    protected $dates = ['cid_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'cid_created_at';
    const UPDATED_AT  = 'cid_updated_at';
    const DELETED_AT  = 'cid_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'cid_created_at' => 'datetime:Y-m-d H:i:s',
        'cid_updated_at' => 'datetime:Y-m-d H:i:s',
        'cid_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function admin(){ //--> especilidade
      return $this->hasOne(AreaAdmin::class, 'adm_id_adm', 'cid_id_adm');
      //->makeHidden(['dataini', 'datafim']);
    }

    public function pais(){ //--> especilidade
      return $this->hasOne(Pais::class, 'pai_id_pai', 'cid_id_pai');
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
            $model->cid_created_at = date("Y-m-d H:i:s.u");
            $model->cid_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->cid_updated_at = date("Y-m-d H:i:s.u");
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
