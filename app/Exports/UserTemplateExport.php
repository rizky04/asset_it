<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class UserTemplateExport implements FromArray, WithHeadings
{
    public function array(): array
    {
        return [
            // Contoh baris kosong atau dummy
            [
                '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''
            ]
        ];
    }

    public function headings(): array
    {
        return [
            'id',
            'name',
            'email',
            'position',
            'departement',
            'business_unit',
            'work_location',
            'phone',
            'address',
            'access',
            'email_verified_at',
            'password',
            'remember_token',
            'created_at',
            'updated_at',
        ];
    }
}
