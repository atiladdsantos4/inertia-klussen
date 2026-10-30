<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Casts\Attribute;


class Proposta extends Model
{
    //prc_id_prc,prc_id_cli,prc_data_proposta,prc_qtde_validade,prc_ia_conteudo,prc_valor,prc_desconto,prc_valor_final,prc_ativa,prc_created_at,prc_updated_at,prc_deleted_at
    use HasFactory,SoftDeletes;//preenche deletet_at e nao delete registro //;
    public $timestamps = true; //--> update automarically by laravel <--//
    protected $table = 'prc_proposta_cliente';
    protected $primaryKey = 'prc_id_prc';
    protected $appends = ['acao'];
    protected $fillable = [
       'prc_id_prc','prc_id_cli','prc_data_proposta','prc_aceita','prc_qtde_validade','prc_data_validade','prc_ia_conteudo','prc_valor','prc_desconto','prc_valor_final','prc_ativa','prc_data_aceite','prc_itens','prc_created_at,prc_updated_at,prc_deleted_at'
    ];
    protected $dates = ['prc_deleted_at'];//campo obrigatório pra o SoftDeletes

    const CREATED_AT  = 'prc_created_at';
    const UPDATED_AT  = 'prc_updated_at';
    const DELETED_AT  = 'prc_deleted_at';

    //protected $dateFormat = 'U';

    protected $casts = [//output
        'prc_created_at' => 'datetime:Y-m-d H:i:s',
        'prc_updated_at' => 'datetime:Y-m-d H:i:s',
        'prc_deleted_at' => 'datetime:Y-m-d H:i:s',
        'prc_itens' => 'array',
    ];

    public function cliente(){ //--> especilidade
      return $this->hasOne(Cliente::class, 'cli_id_cli', 'prc_id_cli');
      //->makeHidden(['dataini', 'datafim']);

    }

    public function email(){ //--> especilidade
      return $this->belongsTo(ControleEmail::class, 'prc_id_prc', 'coe_id_prc')
      ->select('coe_id_coe','coe_email_proposta','coe_data_proposta','coe_email_recibo','coe_data_recibo','coe_email_agradecimento','coe_data_agradecimento');
      /*
      coe_email_proposta": "0",
                "coe_email_recibo
      //->makeHidden(['dataini', 'datafim']);
      */
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
            $model->prc_created_at = date("Y-m-d H:i:s.u");
            $model->prc_updated_at = date("Y-m-d H:i:s.u");
        });

        self::updating(function($model){
            $model->prc_updated_at = date("Y-m-d H:i:s.u");
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
