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
        Schema::create('cid_cidades', function (Blueprint $table) {
            $table->Increments('cid_id_cid');
            $table->unsignedBigInteger('cid_id_pai');
            $table->unsignedBigInteger('cid_id_adm');
            $table->string('cid_descricao',300);
            $table->timestamp('cid_created_at');
            $table->timestamp('cid_updated_at')->nullable();
            $table->timestamp('cid_deleted_at')->nullable();
            $table->primary(array('cid_id_cid'));
            $table->foreign('cid_id_pai')->references('pai_id_pai')->on('pai_paises');
            $table->foreign('cid_id_adm')->references('adm_id_adm')->on('adm_areaadmin');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cid_cidades');
    }
};
