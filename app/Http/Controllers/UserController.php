<?php

namespace App\Http\Controllers;

use App\Exports\UserExport;
use App\Exports\UserTemplateExport;
use App\Imports\UserImport;

use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Maatwebsite\Excel\Facades\Excel;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('User/index', [
            'user' => User::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('User/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'nullable|string|email|max:255|unique:users',
            'password' => 'nullable|string|min:8',
            'position' => 'nullable|string|max:255',
            'departement' => 'nullable|string|max:255',
            'business_unit' => 'nullable|string|max:255',
            'work_location' => 'nullable|string|max:255',
            'phone' => 'nullable|string|max:255',
            'address' => 'nullable|string|max:255',
            'access' => 'nullable|in:admin,user',
            'signature' => 'nullable|file|image|max:2048', // contoh validasi jika file image
        ]);
    
        // Handle password jika diisi
        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']); // jika kosong, hapus agar tidak disimpan
        }
    
        // Handle file signature jika ada
        if ($request->hasFile('signature')) {
            $image = $request->file('signature');
            $imagePath = $image->storeAs('signature', $image->hashName());
            $validated['signature'] = $imagePath;
        }
    
        // Create user dengan data tervalidasi
        $user = User::create($validated);
    
        // Flash message
        if ($user) {
            session()->flash('success', 'User created successfully.');
        } else {
            session()->flash('error', 'Failed to create user.');
        }
    
        return to_route('user.index');
    }
    

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('User/show', [
            'user' => $user
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('User/edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
{
    $validated = $request->validate([
        'name' => 'nullable|string|max:255',
        'email' => 'nullable|string|email|max:255|unique:users,email,' . $user->id,
        'position' => 'nullable|string|max:255',
        'departement' => 'nullable|string|max:255',
        'business_unit' => 'nullable|string|max:255',
        'work_location' => 'nullable|string|max:255',
        'phone' => 'nullable|string|max:255',
        'address' => 'nullable|string|max:255',
        'access' => 'nullable|in:admin,user',
        'password' => 'nullable|string|min:8',
        'signature' => 'nullable', // contoh validasi file
    ]);

    // Jika password diisi, hash password baru
    if ($request->filled('password')) {
        $validated['password'] = Hash::make($request->password);
    } else {
        unset($validated['password']); // jangan update password jika kosong
    }

    // Handle file upload signature jika ada
    if ($request->hasFile('signature')) {
        $image = $request->file('signature');
        $imagePath = $image->storeAs('signature', $image->hashName());
        $validated['signature'] = $imagePath;
    }

    // Update user
    $update = $user->update($validated);

    // Flash message
    if ($update) {
        session()->flash('success', 'User updated successfully.');
    } else {
        session()->flash('error', 'Failed to update user.');
    }

    return to_route('user.index');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return to_route('user.index');
    }

    public function downloadTemplate()
    {
        $date = now()->format('Y-m-d_H-i-s');
        $filename = 'template_import_users_' . $date . '.xlsx';
        return Excel::download(new UserTemplateExport, $filename);
    }

    public function export()
    {
        $date = now()->format('Y-m-d_H-i-s');
        $filename = 'users_' . $date . '.xlsx';
        return Excel::download(new UserExport, $filename);
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:xlsx,xls'
        ]);

        Excel::import(new UserImport, $request->file('file'));

        return back()->with('success', 'User berhasil diimport!');
    }
}
