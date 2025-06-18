<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAssignmentsRequest extends FormRequest
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
            'asset_id' => 'required|exists:assets,id',
            'assignment_date' => 'required|string',
            'returned_date' => 'nullable|string',
            'condition_note' => 'nullable|string|max:255',
            'received_by' => 'required|exists:users,id',
            'document_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            // 'status' => 'required|in:assigned,returned',
        ];
    }
}
