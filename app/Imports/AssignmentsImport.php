<?php

namespace App\Imports;

use App\Models\Assignments;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use PhpOffice\PhpSpreadsheet\Shared\Date;

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
        // Konversi assignment_date jika berupa angka (Excel serial date)
        // $assignmentDate = $row['assignment_date'];
        // if (is_numeric($assignmentDate)) {
        //     $assignmentDate = Date::excelToDateTimeObject($assignmentDate)->format('Y-m-d');
        // }
         // 'assignment_date' => $row['assignment_date'],
            // 'return_date'     => $row['return_date'],

        // // Konversi return_date jika berupa angka (Excel serial date)
        // $returnDate = $row['return_date'];
        // if (is_numeric($returnDate)) {
        //     $returnDate = Date::excelToDateTimeObject($returnDate)->format('Y-m-d');
        // }
        // 'assignment_date' => $assignmentDate,
        // 'return_date'     => $returnDate,
        return new Assignments([
            'asset_id'        => $row['asset_id'],
            'user_id'         => $row['user_id'],
            'condition_note'  => $row['condition_note'],
            'received_by'     => $row['received_by'],
            'status'          => $row['status'],
            'document_url'    => $row['document_url'],
        ]);
    }
}
