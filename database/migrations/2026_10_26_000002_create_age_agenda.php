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
        Schema::create('age_agenda', function (Blueprint $table) {
            $table->Increments('age_id_age');
            $table->unsignedBigInteger('age_id_prc');
            $table->unsignedBigInteger('age_id_pro');
            $table->date('age_data_inicio');
            $table->date('age_data_fim')->nullable();
            $table->string('age_descricao',2000)->nullable();
            $table->string('age_servicos',3000)->nullable();
            $table->char('age_ativo',1);
            $table->char('age_finalizada',1);
            $table->timestamp('age_created_at');
            $table->timestamp('age_updated_at')->nullable();
            $table->timestamp('age_deleted_at')->nullable();
            $table->primary(array('age_id_age'));
            $table->foreign('age_id_prc')->references('prc_id_prc')->on('prc_proposta_cliente');
            $table->foreign('age_id_pro')->references('pro_id_pro')->on('pro_profissional');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
       Schema::dropIfExists('age_agenda');
    }
};
