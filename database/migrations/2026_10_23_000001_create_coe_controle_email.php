Inscrito<?php

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
        Schema::create('coe_controle_email', function (Blueprint $table) {
            $table->Increments('coe_id_coe');
            $table->unsignedBigInteger('coe_id_prc');
            $table->char('coe_email_proposta',1);
            $table->date('coe_data_proposta')->nullable();
            $table->char('coe_email_recibo',1);
            $table->date('coe_data_recibo')->nullable();
            $table->char('coe_email_agradecimento',1);
            $table->date('coe_data_agradecimento')->nullable();
            $table->timestamp('coe_created_at');
            $table->timestamp('coe_updated_at')->nullable();
            $table->timestamp('coe_deleted_at')->nullable();
            $table->primary(array('coe_id_coe'));
            $table->foreign('coe_id_prc')->references('prc_id_prc')->on('prc_proposta_cliente');
        });
    }
    /**
     * Runrse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('coe_unidade_medida');
    }
};
