<?php

use App\Http\Controllers\AssetsController;
use App\Http\Controllers\AssignmentsController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('user', UserController::class);
    Route::get('/users/export', [UserController::class, 'export']);
    Route::post('/users/import', [UserController::class, 'import']);
    Route::get('/users/template', [UserController::class, 'downloadTemplate']);
    
    Route::resource('category', CategoryController::class);
    
    Route::resource('assignments', AssignmentsController::class);
    Route::get('/assignment/export', [AssignmentsController::class, 'export']);
    Route::post('/assignment/import', [AssignmentsController::class, 'import']);
    Route::get('/assignment/template', [AssignmentsController::class, 'downloadTemplate']);
    Route::get('assign/{id}', [AssignmentsController::class, 'assign'])->name('assignments.assign');
    
    Route::get('returned/{id}', [AssignmentsController::class, 'returned'])->name('assignments.returned');
    
    Route::resource('asset', AssetsController::class);
    Route::get('/assets/export', [AssetsController::class, 'export']);
    Route::post('/assets/import', [AssetsController::class, 'import']);
    Route::get('/assets/template', [AssetsController::class, 'downloadTemplate']);
    Route::get('/assets/last-number/{categoryId}', [AssetsController::class, 'getlastAssetsNumber'])->name('assets.last-number');
    
    Route::get('dashboard', function () {
    return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
