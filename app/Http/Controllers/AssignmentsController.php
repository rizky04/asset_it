<?php

namespace App\Http\Controllers;

use App\Models\Assignments;
use App\Http\Requests\StoreAssignmentsRequest;
use App\Http\Requests\UpdateAssignmentsRequest;
use App\Models\Assets;
use App\Models\User;
use Inertia\Inertia;


class AssignmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('Assignments/index', [
            'assignments' => Assignments::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       
        return Inertia::render('Assignments/create', [
            'assets' => Assets::all(),
            'users' => User::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAssignmentsRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Assignments $assignments)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Assignments $assignments)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAssignmentsRequest $request, Assignments $assignments)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Assignments $assignments)
    {
        //
    }
}
