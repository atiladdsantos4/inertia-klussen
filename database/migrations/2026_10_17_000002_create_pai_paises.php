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
        Schema::create('pai_paises', function (Blueprint $table) {
            $table->Increments('pai_id_pai');
            $table->char('pai_iso',3);
            $table->string('pai_descricao',300);
            $table->timestamp('pai_created_at');
            $table->timestamp('pai_updated_at')->nullable();
            $table->timestamp('pai_deleted_at')->nullable();
            $table->primary(array('pai_id_pai'));
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pai_paises');
    }
};
