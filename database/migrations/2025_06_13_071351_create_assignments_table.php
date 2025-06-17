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
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('asset_id')
            ->constrained('assets')
            ->onDelete('cascade')
            ->onUpdate('cascade');
            $table->foreignId('user_id')
            ->constrained('users')
            ->onDelete('cascade')
            ->onUpdate('cascade');
            $table->date('assignment_date')->nullable();
            $table->date('return_date')->nullable();
            $table->text('condition_note')->nullable();
            $table->foreignId('received_by') // User who assigned the asset
            ->constrained('users')
            ->onDelete('cascade')
            ->onUpdate('cascade');
            $table->enum('status', ['assigned', 'returned'])->default('assigned');
            $table->string('document_url')->nullable(); // Optional image of the asset condition at assignment
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assignments');
    }
};
