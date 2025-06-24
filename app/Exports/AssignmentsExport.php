<?php

namespace App\Exports;

use App\Models\Assignments;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class AssignmentsExport implements FromCollection, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Assignments::all();
    }
    public function headings(): array
    {
        return [
            'id', 'asset_id', 'user_id', 'assignment_date', 'return_date',
            'condition_note', 'received_by', 'status', 'document_url',
            'created_at', 'updated_at'
        ];
    }
}
