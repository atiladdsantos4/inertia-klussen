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
        Schema::create('tic_tipo_cliente', function (Blueprint $table) {
            $table->Increments('tic_id_tic');
            $table->string('tic_descricao',500);
            $table->timestamp('tic_created_at');
            $table->timestamp('tic_updated_at')->nullable();
            $table->timestamp('tic_deleted_at')->nullable();
            $table->primary(array('tic_id_tic'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tic_tipo_cliente');
    }
};
