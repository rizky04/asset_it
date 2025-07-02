<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Http\Requests\StoreApprovalRequest;
use App\Http\Requests\UpdateApprovalRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class ApprovalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreApprovalRequest $request)
    {
        $data = $request->validated();
        $data['approval_date'] = now()->format('Y-m-d');

        // dd($data);

        // Jika signature disimpan sebagai file gambar
        if ($request->signature) {
            $image = str_replace('data:image/png;base64,', '', $request->signature);
            $image = str_replace(' ', '+', $image);
            $imageName = 'signatures/'.time().'.png';

            // Pastikan folder signatures ada
            if (!File::exists(public_path('signatures'))) {
                File::makeDirectory(public_path('signatures'), 0755, true);
            }

            File::put(public_path($imageName), base64_decode($image));

            // Simpan nama file ke database
            $data['signature'] = $imageName;
        }

        Approval::create($data);

        return redirect()->back()->with('success', 'Approval berhasil disimpan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Approval $approval)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Approval $approval)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateApprovalRequest $request, Approval $approval)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Approval $approval)
    {
        //
    }

    public function approved(StoreApprovalRequest $request){
        $data = $request->validated();
        $data['approval_date'] = now()->format('Y-m-d');
        $data['user_id'] = Auth::user()->id;

        Approval::create($data);
        return redirect()->back()->with('success', 'Approval berhasil disimpan.');
    }
}
