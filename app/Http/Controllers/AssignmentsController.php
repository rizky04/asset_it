<?php

namespace App\Http\Controllers;

use App\Models\Assignments;
use App\Http\Requests\StoreAssignmentsRequest;
use App\Http\Requests\UpdateAssignmentsRequest;
use App\Models\Assets;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;



class AssignmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Inertia::render('Assignments/index', [
            'assignments' => Assignments::with('asset', 'user')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
       
        return Inertia::render('Assignments/create', [
            'assets' => Assets::where('status', 'available')->get(),
            'users' => User::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAssignmentsRequest $request)
    {
        $data = $request->validated();

        $asset = Assets::findOrFail($data['asset_id']);
        if($asset){
            $asset->status = 'assigned'; // Update asset status to assigned
            $asset->save();
        }
        $data['user_id'] = Auth::user()->id; // Assuming you want to store the authenticated user ID
        $data['status'] = "assigned"; // Assuming you want to store the authenticated user ID
        
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
        return Inertia::render('Assignments/show');
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
    public function destroy(Assignments $assignment)
    {
      
        $assignment->delete();
        if($assignment->image){
            Storage::delete('assets/' . basename($assignment->image)); // Delete image file if exists
        }
        return to_route('assignments.index');
    }

    public function returned($id){
        $assignment = Assignments::findOrFail($id);
        $asset = Assets::findOrFail($assignment->asset_id);

        if($asset){
            $asset->status = 'available'; // Update asset status to available
            $asset->save();
        } 

        $assignment->status = 'returned';
        $assignment->return_date = now();
        $assignment->save();

        return to_route('assignments.index');
    }
}
