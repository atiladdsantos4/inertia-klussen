<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Cliente extends Model
{
    //cli_id_cli,cli_nome,cli_email,cli_tipo_telefone,cli_telefone,cli_id_tic,cli_ativo,cli_created_at,cli_updated_at,cli_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'cli_cliente';
    protected $primaryKey = 'cli_id_cli';
    protected $appends = ['acao'];
    protected $fillable = [
       'cli_id_cli','cli_nome','cli_email','cli_tipo_telefone','cli_telefone','cli_id_tic','cli_ativo','cli_created_at','cli_updated_at','cli_deleted_at'
    ];
    protected $dates = ['cli_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'cli_created_at';
    const UPDATED_AT  = 'cli_updated_at';
    const DELETED_AT  = 'cli_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'cli_created_at' => 'datetime:Y-m-d H:i:s',
        'cli_updated_at' => 'datetime:Y-m-d H:i:s',
        'cli_deleted_at' => 'datetime:Y-m-d H:i:s',
    ];

    public function tipo(){ //--> especilidade
      return $this->hasOne(TipoCliente::class, 'tic_id_tic', 'cli_id_tic');
      //->makeHidden(['dataini', 'datafim']);

    }

    public function endereco(){ //--> especilidade
      return $this->belongsTo(ClienteEndereco::class,'cli_id_cli','cle_id_cli')
      ->with('pais')
      ->with('cidade')
      ->with('cidade.admin');
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
            $model->cli_created_at = date("Y-m-d H:i:s.u");
            $model->cli_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->cli_updated_at = date("Y-m-d H:i:s.u");
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
