<?php

namespace App\Http\Controllers;

use App\Exports\AssetAssignmentsTemplateExport;
use App\Models\Assignments;
use App\Http\Requests\StoreAssignmentsRequest;
use App\Http\Requests\UpdateAssignmentsRequest;
use App\Models\Assets;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

use Maatwebsite\Excel\Facades\Excel;
use Illuminate\Http\Request;

use App\Imports\AssetsImport;
use App\Exports\AssetsTemplateExport;
use App\Exports\AssignmentsExport;
use App\Imports\AssignmentsImport;
use Illuminate\Support\Facades\DB;

class AssignmentsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = DB::table('assignments')
        ->join('assets', 'assignments.asset_id', '=', 'assets.id')
        ->join('users', 'assignments.user_id', '=', 'users.id')
        ->join('users as rb', 'assignments.received_by', '=', 'rb.id')
        ->select('assignments.*', 'assets.name as asset', 'assets.assets_code as assets_code', 'users.name as user', 'rb.name as receivedBy')
        ->orderBy('assignments.created_at', 'desc')
        ->get();
        
       
        return Inertia::render('Assignments/index', [
            'assignments' => $data,
        ]);
        // 'assignments' => Assignments::with(['asset', 'user', 'receivedBy'])->get(),
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
    public function show(Assignments $assignment)
    {
    //      $data = DB::table('assignments')
    //     ->join('assets', 'assignments.asset_id', '=', 'assets.id')
    //     ->join('users', 'assignments.user_id', '=', 'users.id')
    //     ->join('users as rb', 'assignments.received_by', '=', 'rb.id')
    //     ->select('assignments.*', 'assets.name as asset', 'assets.assets_code as assets_code', 'users.name as user', 'rb.name as receivedBy')
    //     ->where('assignments.id', $assignment->id)
    //     ->get();
    //    $data =  Assignments::with(['asset', 'user', 'receivedBy'])->findOrFail($assignment->id);
    //     dd($data);
        return Inertia::render('Assignments/show', [
            'assignments' => Assignments::with(['asset', 'user', 'receivedBy', 'approval.user'])->findOrFail($assignment->id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Assignments $assignment)
    {
        //
        return Inertia::render('Assignments/edit', [
            'assignments' => Assignments::findOrFail($assignment->id),
            'assets' => Assets::all(),
            'users' => User::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAssignmentsRequest $request, Assignments $assignment)
    {
        //
        $data = $request->validated();
        $asset = Assets::findOrFail($data['asset_id']);
        if($asset){
            if($data['status'] == 'returned'){
                $asset->status = 'available'; // Update asset status to available
            } else {
                $asset->status = 'assigned'; // Update asset status to assigned
            }
            // $asset->status = 'assigned'; // Update asset status to assigned
            $asset->save();
        }
        $data['user_id'] = Auth::user()->id; // Assuming you want to store the authenticated user ID
        // $data['status'] = "assigned"; // Assuming you want to store the authenticated user ID
        
        if($request->hasFile('document_url')){
            $image = $request->file('document_url');
            $imagePath = $image->storeAs('assets', $image->hashName());
            $data['document_url'] = $imagePath;
        }
        $assignment->update($data);
        if($assignment->image){
            Storage::delete('assets/' . basename($assignment->image)); // Delete image file if exists
        }
        return to_route('assignments.index');
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
    public function assign($id){
        $assignment = Assignments::findOrFail($id);
        $asset = Assets::findOrFail($assignment->asset_id);

        if($asset){
            $asset->status = 'assigned'; // Update asset status to assigned
            $asset->save();
        } 

        $assignment->status = 'assigned';
        $assignment->return_date = null;
        $assignment->save();

        return to_route('assignments.index');
    }

    public function export()
{
    return Excel::download(new AssignmentsExport, 'asset_assignments.xlsx');
}

public function import(Request $request)
{
    $request->validate([
        'file' => 'required|mimes:xlsx,xls'
    ]);

    Excel::import(new AssignmentsImport, $request->file('file'));

    return back()->with('success', 'Data berhasil diimport!');
}

public function downloadTemplate()
{
    return Excel::download(new AssetAssignmentsTemplateExport, 'template_asset_assignments.xlsx');
}


}
