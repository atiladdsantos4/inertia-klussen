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
        Schema::create('sei_servico_item', function (Blueprint $table) {
            $table->Increments('sei_id_sei');
            $table->unsignedBigInteger('sei_id_ser');
            $table->unsignedBigInteger('sei_id_unm')->nullable();
            $table->string('sei_descricao',1000);
            $table->timestamp('sei_created_at');
            $table->timestamp('sei_updated_at')->nullable();
            $table->timestamp('sei_deleted_at')->nullable();
            $table->primary(array('sei_id_sei'));
            $table->foreign('sei_id_ser')->references('ser_id_ser')->on('ser_servico');
            $table->foreign('sei_id_unm')->references('unm_id_unm')->on('unm_unidade_medida');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sei_servico_item');
    }
};
