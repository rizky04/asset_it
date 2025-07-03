<?php

namespace App\Http\Controllers;

use App\Models\SettingApproval;
use App\Http\Requests\StoreSettingApprovalRequest;
use App\Http\Requests\UpdateSettingApprovalRequest;
use App\Models\User;
use Inertia\Inertia;

class SettingApprovalController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('SettingApproval/index', [
            'settingApproval' => SettingApproval::with('user')->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('SettingApproval/create',[
            'users' => User::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSettingApprovalRequest $request)
    {
        //
        $validated = $request->validated();
        SettingApproval::create($validated);
        return to_route('settingApproval.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(SettingApproval $settingApproval)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SettingApproval $settingApproval)
    {
        return Inertia::render('SettingApproval/edit', [
            'settingApproval' => $settingApproval,
            'users' => User::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSettingApprovalRequest $request, SettingApproval $settingApproval)
    {
        $validated = $request->validated();
        $settingApproval->update($validated);
        return to_route('settingApproval.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SettingApproval $settingApproval)
    {
        $settingApproval->delete();
        return to_route('settingApproval.index')->with('success', 'Setting Approval deleted successfully.');
    }
}
