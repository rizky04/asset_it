<?php

namespace App\Imports;

use App\Models\User;
use Maatwebsite\Excel\Concerns\ToModel;
use Illuminate\Support\Facades\Hash;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class UserImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        // dd($row);
        return new User([
            'name' => $row['name'],
            'email' => $row['email'],
            'position' => $row['position'],
            'departement' => $row['departement'],
            'business_unit' => $row['business_unit'] ,
            'work_location' => $row['work_location'] ,
            'phone' => $row['phone'] ,
            'address' => $row['address'],
            'access' => $row['access'],
            'email_verified_at' => $row['email_verified_at'] ?? now(),
            'password' => Hash::make($row['password']),
            'remember_token' => $row['remember_token'] ,
        ]);
    }
}
