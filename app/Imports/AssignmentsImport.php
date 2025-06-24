<?php

namespace App\Imports;

use App\Models\Assignments;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Carbon\Carbon;

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
            'assignment_date' => $this->convertDate($row['assignment_date']),
            'return_date'     => $this->convertDate($row['return_date']),
            'condition_note'  => $row['condition_note'],
            'received_by'     => $row['received_by'],
            'status'          => $row['status'],
            'document_url'    => $row['document_url'],
        ]);
    }

    private function convertDate($value)
{
    if (!$value || strtolower($value) == 'n/a') {
        return null;
    }

    // Jika nilai tanggal pakai format d/m/Y (seperti dari Excel), convert ke Y-m-d
    try {
        return Carbon::createFromFormat('d/m/Y', $value)->format('Y-m-d');
    } catch (\Exception $e) {
        return $value; // fallback jika format sudah benar
    }
}
}
