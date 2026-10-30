<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class ClienteEndereco extends Model
{
    //
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'cle_cliente_endereco';
    protected $primaryKey = 'cle_id_cle';
    protected $appends = ['acao'];
    protected $fillable = [
       'cle_id_cle','cle_id_pai','cle_id_cid','cle_id_cli','cle_endereco','cle_tem_numero','cle_numero','cle_zipcode','cle_adicional','cle_created_at','cle_updated_at','cle_deleted_at'
    ];
    protected $dates = ['cle_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'cle_created_at';
    const UPDATED_AT  = 'cle_updated_at';
    const DELETED_AT  = 'cle_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'cle_created_at' => 'datetime:Y-m-d H:i:s',
        'cle_updated_at' => 'datetime:Y-m-d H:i:s',
        'cle_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function pais(){ //--> especilidade
      return $this->hasOne(Pais::class, 'pai_id_pai', 'cle_id_pai');
      //->makeHidden(['dataini', 'datafim']);

    }

    public function cidade(){ //--> especilidade
      return $this->hasOne(Cidade::class, 'cid_id_cid', 'cle_id_cid');
      //->makeHidden(['dataini', 'datafim']);

    }

    public function cliente(){ //--> especilidade
      return $this->hasOne(Cliente::class, 'cli_id_cli', 'cle_id_cli');
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
            $model->cle_created_at = date("Y-m-d H:i:s.u");
            $model->cle_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->cle_updated_at = date("Y-m-d H:i:s.u");
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
