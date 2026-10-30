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
        Schema::create('adm_areaadmin', function (Blueprint $table) {
            $table->Increments('adm_id_adm');
            $table->string('adm_descricao',300);
             $table->string('adm_descricao_br',300);
            $table->timestamp('adm_created_at');
            $table->timestamp('adm_updated_at')->nullable();
            $table->timestamp('adm_deleted_at')->nullable();
            $table->primary(array('adm_id_adm'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adm_areaadmin');
    }
};
