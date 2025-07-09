<?php

namespace App\Http\Controllers;

use App\Models\Assets;
use App\Http\Requests\StoreAssetsRequest;
use App\Http\Requests\UpdateAssetsRequest;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Exports\AssetsExport;
use Maatwebsite\Excel\Facades\Excel;
use App\Imports\AssetsImport;
use App\Exports\AssetsTemplateExport;
use App\Models\Approval;
use App\Models\Assignments;
use App\Models\SettingApproval;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AssetsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Asset/index',[
            'asset' => Assets::with(['category', 'user'])->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Asset/create', [
            'category' => Category::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreAssetsRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = Auth::user()->id;
        $data['status'] = 'available';

        if($request->hasFile('image')){
            $image = $request->file('image');
            $imagePath = $image->storeAs('assets', $image->hashName());
            $data['image'] = $imagePath;
        }
        Assets::create($data);
        return to_route('asset.index');

    }

    /**
     * Display the specified resource.
     */
    public function show(Assets $asset)
    {
        return Inertia::render('Asset/show', [
            'asset' => Assets::with(['category', 'user'])->findOrFail($asset->id),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
       return Inertia::render('Asset/edit', [
            'asset' => Assets::with(['category', 'user'])->findOrFail($id),
            'category' => Category::all(),
            'user' => Auth::user(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAssetsRequest $request, Assets $asset)
    {
        $data = $request->validated();
        
        if($request->hasFile('image')){
            if($asset->image){
                Storage::delete('assets/' . basename($asset->image)); // Delete old image if exists
            }
            $image = $request->file('image');
            $imagePath = $image->storeAs('assets', $image->hashName());
            $data['image'] = $imagePath;
        }else{
            unset($data['image']); // Remove image key if no new image is uploaded
        }
        $asset->update($data);
        return to_route('asset.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Assets $asset)
    {
        $asset->delete();
        if($asset->image){
            Storage::delete('assets/' . basename($asset->image)); // Delete image file if exists
        }
        return to_route('asset.index');
    }

    public function getlastAssetsNumber($categoryId)
    {
        
        $lastAssets = Assets::where('category_id', $categoryId)
            ->orderBy('created_at', 'desc')
            ->first();
        $lastNumber = 0;

        if($lastAssets && preg_match('/\d+$/', $lastAssets->assets_code, $matches)) {
            $lastNumber = (int)$matches[0];
        }

        return response()->json([
            'last_number' => $lastNumber,
        ]);
    }

    public function export()
    {
        $date = now()->format('Y-m-d_H-i-s');
        $filename = 'assets_' . $date . '.xlsx';
        return Excel::download(new AssetsExport, $filename);
        // return Excel::download(new AssetsExport, 'assets.xlsx');
    }
    public function import(Request $request)
{
    $request->validate([
        'file' => 'required|mimes:xlsx,xls'
    ]);

    Excel::import(new AssetsImport, $request->file('file'));

    return redirect()->back()->with('success', 'Data berhasil diimport.');
}

public function downloadTemplate()
{
    $date = now()->format('Y-m-d_H-i-s');
    $filename = 'template_import_assets_' . $date . '.xlsx';
    return Excel::download(new AssetsTemplateExport, $filename);
}

public function history($id){
    $data = DB::table('assignments')
        ->join('assets', 'assignments.asset_id', '=', 'assets.id')
        ->join('users', 'assignments.user_id', '=', 'users.id')
        ->join('users as rb', 'assignments.received_by', '=', 'rb.id')
        ->select('assignments.*', 'assets.name as asset', 'assets.assets_code as assets_code', 'users.name as user', 'rb.name as receivedBy')
        ->orderBy('assignments.created_at', 'desc')
        ->where('assignments.asset_id', $id)
        ->get();

        $settingApproval = SettingApproval::with('user')->orderBy('type', 'asc')->get();
        $approvals = Approval::with('user')->get();
    
    return Inertia::render('Asset/history', [
        'assignments' => $data,
        'settingApproval' => $settingApproval,
        'approvals' => $approvals,
    ]);
}
}
