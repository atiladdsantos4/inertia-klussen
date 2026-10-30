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
        Schema::create('cli_cliente', function (Blueprint $table) {
            $table->Increments('cli_id_cli');
            $table->string('cli_nome',300);
            $table->string('cli_email',300);
            $table->char('cli_tipo_telefone',1);
            $table->string('cli_telefone',16);
            $table->unsignedBigInteger('cli_id_tic');
            $table->char('cli_ativo',1);
            $table->timestamp('cli_created_at');
            $table->timestamp('cli_updated_at')->nullable();
            $table->timestamp('cli_deleted_at')->nullable();
            $table->primary(array('cli_id_cli'));
            $table->foreign('cli_id_tic')->references('tic_id_tic')->on('tic_tipo_cliente');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cli_cliente');
    }
};
