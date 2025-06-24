<?php

namespace App\Exports;

use App\Models\Assets;
use Maatwebsite\Excel\Concerns\FromCollection;

use Maatwebsite\Excel\Concerns\WithHeadings;

class AssetsExport implements FromCollection, WithHeadings 
{
    /**
    * @return \Illuminate\Support\Collection
    */
    public function collection()
    {
        return Assets::select([
            'id','assets_code', 'name', 'brand', 'model', 'serial_number', 'processor', 'storage', 'ram',
            'ukuran_layar', 'os', 'office', 'software', 'accessories', 'warranty', 'received_date',
            'purchase_date', 'warranty_expiration', 'purchase_price', 'current_value', 'supplier',
            'status', 'location', 'notes', 'image', 'category_id', 'user_id'
        ])->get();
    }

    public function headings(): array
    {
        return [
            'id','asset_code', 'name', 'brand', 'model', 'serial_number', 'processor', 'storage', 'ram',
            'ukuran_layar', 'os', 'office', 'software', 'accessories', 'warranty', 'received_date',
            'purchase_date', 'warranty_expiration', 'purchase_price', 'current_value', 'supplier',
            'status', 'location', 'notes', 'image', 'category_id', 'user_id'
        ];
    }
}
