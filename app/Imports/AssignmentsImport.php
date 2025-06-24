<?php

namespace App\Imports;

use App\Models\Assignments;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class AssignmentsImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        // dd($row);
        return new Assignments([
            'asset_id'        => $row['asset_id'],
            'user_id'         => $row['user_id'],
            'assignment_date' => $row['assignment_date'],
            'return_date'     => $row['return_date'],
            'condition_note'  => $row['condition_note'],
            'received_by'     => $row['received_by'],
            'status'          => $row['status'],
            'document_url'    => $row['document_url'],
        ]);
    }
}
