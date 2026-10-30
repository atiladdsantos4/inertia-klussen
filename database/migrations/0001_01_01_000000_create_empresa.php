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
        Schema::create('emp_empresa', function (Blueprint $table) {
            $table->Increments('emp_id_emp');
            $table->string('emp_nome',300);
            $table->string('emp_email',300);
            $table->char('emp_tipo_empresa',1);
            $table->string('emp_cnpj_cpf',20);
            $table->char('emp_tipo_telefone',1);
            $table->string('emp_telefone',14);
            $table->char('emp_ativo',1);
            $table->string('emp_logo',20)->nullable();
            $table->string('emp_hash',35)->nullable();
            $table->timestamp('emp_created_at');
            $table->timestamp('emp_updated_at')->nullable();
            $table->timestamp('emp_deleted_at')->nullable();
            $table->primary(array('emp_id_emp'));
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('emp_empresa');
    }
};
