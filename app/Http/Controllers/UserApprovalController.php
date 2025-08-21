<?php

namespace App\Http\Controllers;

use App\Models\Approval;
use App\Models\Assignments;
use App\Models\SettingApproval;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserApprovalController extends Controller
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    // public function show(string $id)
    // {
    //     //
    // }


    public function show(Assignments $assignment){
        $settingApproval = SettingApproval::with('user')->orderBy('type', 'asc')->get();
        $approvals = Approval::with('user')->where('assignment_id', $assignment->id)->get();

        return Inertia::render('Assignments/show', [
            'assignments' => Assignments::with(['asset', 'user', 'receivedBy', 'approval.user'])->findOrFail($assignment->id),
            'settingApproval' => $settingApproval,
            'approvals' => $approvals,
            ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
