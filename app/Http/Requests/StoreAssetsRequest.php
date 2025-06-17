<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;


class StoreAssetsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'assets_code' => 'nullable|string',
            'name' => 'nullable|string',
            'brand' => 'nullable|string',
            'model' => 'nullable|string',
            'serial_number' => 'nullable|string',
            'processor' => 'nullable|string|max:100',
            'ram' => 'nullable|string|max:100',
            'storage' => 'nullable|string|max:100',
            'ukuran_layar' => 'nullable|string|max:100',
            'os' => 'nullable|string|max:100',
            'office' => 'nullable|string|max:100',
            'software' => 'nullable|string',
            'accessories' => 'nullable|string',
            'warranty' => 'nullable|string|max:100',
            'received_date' => 'nullable|date',
            'purchase_date' => 'nullable|date',
            'warranty_expiration' => 'nullable|date',
            'purchase_price' => 'nullable|numeric',
            'current_value' => 'nullable|numeric',
            'supplier' => 'nullable|string|max:100',
            'location' => 'nullable|string|max:100',
            'notes' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category_id' => 'nullable|string|max:255',
        ];
    }

}
