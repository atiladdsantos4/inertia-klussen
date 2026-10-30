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
        Schema::create('unm_unidade_medida', function (Blueprint $table) {
            $table->Increments('unm_id_unm');
            $table->string('unm_descricao',500);
            $table->char('unm_sigla',3);
            $table->char('unm_sigla_hol',3);
            $table->timestamp('unm_created_at');
            $table->timestamp('unm_updated_at')->nullable();
            $table->timestamp('unm_deleted_at')->nullable();
            $table->primary(array('unm_id_unm'));
        });
    }
    /**
     * Runrse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('unm_unidade_medida');
    }
};
