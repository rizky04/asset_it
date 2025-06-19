<?php

namespace App\Imports;

use App\Models\Assets;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class AssetsImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new Assets([
           'assets_code' => $row['asset_code'],
            'name' => $row['name'],
            'brand' => $row['brand'],
            'model' => $row['model'],
            'serial_number' => $row['serial_number'],
            'processor' => $row['processor'],
            'storage' => $row['storage'],
            'ram' => $row['ram'],
            'ukuran_layar' => $row['ukuran_layar'],
            'os' => $row['os'],
            'office' => $row['office'],
            'software' => $row['software'],
            'accessories' => $row['accessories'],
            'warranty' => $row['warranty'],
            'received_date' => $row['received_date'],
            'purchase_date' => $row['purchase_date'],
            'warranty_expiration' => $row['warranty_expiration'],
            'purchase_price' => $row['purchase_price'],
            'current_value' => $row['current_value'],
            'supplier' => $row['supplier'],
            'status' => $row['status'],
            'location' => $row['location'],
            'notes' => $row['notes'],
            'image' => $row['image'],
            'category_id' => $row['category_id'],
            'user_id' => $row['user_id'],
        ]);
    }
}
