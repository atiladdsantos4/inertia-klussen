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
        Schema::create('cle_cliente_endereco', function (Blueprint $table) {
            $table->Increments('cle_id_cle');
            $table->unsignedBigInteger('cle_id_pai');
            $table->unsignedBigInteger('cle_id_cid');
            $table->unsignedBigInteger('cle_id_cli');
            $table->string('cle_endereco',1000);
            $table->char('cle_tem_numero',1);
            $table->string('cli_numero',6)->nullable();
            $table->string('cle_zipcode',7);
            $table->string('cle_adicional',1000);
            $table->timestamp('cle_created_at');
            $table->timestamp('cle_updated_at')->nullable();
            $table->timestamp('cle_deleted_at')->nullable();
            $table->primary(array('cle_id_cle'));
            $table->foreign('cle_id_pai')->references('pai_id_pai')->on('pai_paises');
            $table->foreign('cle_id_cid')->references('cid_id_cid')->on('cid_cidades');
            $table->foreign('cle_id_cli')->references('cli_id_cli')->on('cli_cliente');
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cle_cliente_endereco');
    }
};
