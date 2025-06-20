<?php

use App\Http\Controllers\AssetsController;
use App\Http\Controllers\AssignmentsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;


Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('category', CategoryController::class);
    Route::resource('asset', AssetsController::class);
    Route::resource('assignments', AssignmentsController::class);
    Route::get('returned/{id}', [AssignmentsController::class, 'returned'])->name('assignments.returned');
    Route::get('assign/{id}', [AssignmentsController::class, 'assign'])->name('assignments.assign');
    Route::get('/assets/export', [AssetsController::class, 'export']);
    Route::post('/assets/import', [AssetsController::class, 'import']);
    Route::get('/assets/last-number/{categoryId}', [AssetsController::class, 'getlastAssetsNumber'])->name('assets.last-number');
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
