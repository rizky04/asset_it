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
        Schema::create('assets', function (Blueprint $table) {
            $table->id();
            $table->string('assets_code');
            $table->string('name');
            $table->string('brand');
            $table->string('model');
            $table->string('serial_number');
            $table->string('processor')->nullable();
            $table->string('storage')->nullable();
            $table->string('ram')->nullable();
            $table->string('ukuran_layar')->nullable();
            $table->string('os')->nullable();
            $table->string('office')->nullable();
            $table->text('software')->nullable();
            $table->text('accessories')->nullable();
            $table->string('warranty')->nullable();
            $table->date('received_date')->nullable();
            $table->date('purchase_date')->nullable();
            $table->date('warranty_expiration')->nullable();
            $table->decimal('purchase_price', 10, 2)->nullable();
            $table->decimal('current_value', 10, 2)->nullable();
            $table->string('supplier')->nullable();
            $table->enum('status', ['available', 'assigned', 'maintenance', 'damaged', 'disposed'])->default('available');
            $table->string('location')->nullable();
            $table->text('notes')->nullable();
            $table->string('image')->nullable();
            $table->foreignId('category_id')
                  ->references('id')
                  ->on('categories')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->foreignId('user_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade')
                  ->onUpdate('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('assets');
    }
};
