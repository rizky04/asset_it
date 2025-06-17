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
        $data = $request->validated();
        $data['user_id'] = auth()->user->id(); // Assuming you want to store the authenticated user ID
        
        if($request->hasFile('document_url')){
            $image = $request->file('document_url');
            $imagePath = $image->storeAs('assets', $image->hashName());
            $data['document_url'] = $imagePath;
        }

        Assignments::create($data);
        return to_route('assignments.index');
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
