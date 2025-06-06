<?php

namespace App\Http\Controllers;

use App\Models\Assets;
use App\Http\Requests\StoreAssetsRequest;
use App\Http\Requests\UpdateAssetsRequest;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

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
    public function show(Assets $assets)
    {
        return Inertia::render('Asset/show', [
            'assets' => Assets::with(['category', 'user'])
                ->findOrFail($assets->id),
            'categories' => Category::all(),
            'user' => Auth::user(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
       return Inertia::render('Asset/edit', [
            'assets' => Assets::with(['category', 'user'])
                ->findOrFail($id),
            'categories' => Category::all(),
            'user' => Auth::user(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAssetsRequest $request, Assets $assets)
    {
        $data = $request->validated();
        
        if($request->hasFile('image')){
            if($assets->image){
                Storage::delete('assets/' . basename($assets->image)); // Delete old image if exists
            }
            $image = $request->file('image');
            $imagePath = $image->storeAs('assets', $image->hashName());
            $data['image'] = $imagePath;
        }else{
            unset($data['image']); // Remove image key if no new image is uploaded
        }
        $assets->update($data);
        return to_route('asset.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Assets $assets)
    {
        $assets->delete();
        if($assets->image){
            Storage::delete('assets/' . basename($assets->image)); // Delete image file if exists
        }
        return to_route('asset.index');
    }

    public function getlastAssetsNumber($categoryId)
    {
        
        $lastAssets = Assets::where('category_id', $categoryId)
            ->orderBy('created_at', 'desc')
            ->first();
        $lastNumber = 0;

        if($lastAssets && preg_match('/\d+$/', $lastAssets->product_code, $matches)) {
            $lastNumber = (int)$matches[0];
        }

        return response()->json([
            'last_number' => $lastNumber,
        ]);
    }
}
