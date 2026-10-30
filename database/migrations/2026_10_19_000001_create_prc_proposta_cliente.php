<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('prc_proposta_cliente', function (Blueprint $table) {
            $table->Increments('prc_id_prc');
            $table->unsignedBigInteger('prc_id_cli');
            $table->date('prc_data_proposta');
            $table->integer('prc_qtde_validade');
            $table->date('prc_data_validade');
            $table->longText('prc_ia_conteudo');
            $table->decimal('prc_valor',12,2);
            $table->decimal('prc_desconto',12,2);
            $table->decimal('prc_valor_final',12,2);
            $table->char('prc_ativa',1);
            $table->char('prc_aceita',1);
            $table->date('prc_data_aceite')->nullable();
            $table->string('prc_itens',2000);
            $table->timestamp('prc_created_at');
            $table->timestamp('prc_updated_at')->nullable();
            $table->timestamp('prc_deleted_at')->nullable();
            $table->primary(array('prc_id_prc'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prc_proposta_cliente');
    }
};
