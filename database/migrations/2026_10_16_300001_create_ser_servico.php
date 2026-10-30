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
        Schema::create('ser_servico', function (Blueprint $table) {
            $table->Increments('ser_id_ser');
            $table->string('ser_descricao',500);
            $table->timestamp('ser_created_at');
            $table->timestamp('ser_updated_at')->nullable();
            $table->timestamp('ser_deleted_at')->nullable();
            $table->primary(array('ser_id_ser'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ser_servico');
    }
};
