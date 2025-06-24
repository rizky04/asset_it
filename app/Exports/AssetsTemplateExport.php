<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromArray;
use Maatwebsite\Excel\Concerns\WithHeadings;

class AssetsTemplateExport implements FromArray, WithHeadings
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function array(): array
    {
        return [[]]; // 1 baris kosong
    }
    public function headings(): array
    {
        return [
            'asset_code', 'name', 'brand', 'model', 'serial_number', 'processor', 'storage', 'ram',
            'ukuran_layar', 'os', 'office', 'software', 'accessories', 'warranty', 'received_date',
            'purchase_date', 'warranty_expiration', 'purchase_price', 'current_value', 'supplier',
            'status', 'location', 'notes', 'image', 'category_id', 'user_id'
        ];
    }
}
