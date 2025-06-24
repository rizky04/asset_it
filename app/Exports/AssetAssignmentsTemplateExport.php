<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class AssetAssignmentsTemplateExport implements FromArray, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function array(): array
    {
        return [[]]; // satu baris kosong
    }

    public function headings(): array
    {
        return [
            'asset_id', 'user_id', 'assignment_date', 'return_date',
            'condition_note', 'received_by', 'status', 'document_url'
        ];
    }
}
