import { AppContent } from '@/components/app-content';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Category } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react'
import { toast } from 'sonner';


interface CreateCategoryProps {
  category: Category[]
}

export default function create({ category }: CreateCategoryProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'asset / Create',
      href: '/asset',
    },
  ];
  const { data, setData, post, processing, errors } = useForm({
    assets_code: '',
    name: '',
    brand: '',
    model: '',
    serial_number: '',
    processor: '',
    storage: '',
    ram: '',
    ukuran_layar: '',
    os: '',
    office: '',
    software: '',
    accessories: '',
    warranty: '',
    received_date: '',
    purchase_date: '',
    warranty_expiration: '',
    purchase_price: '',
    current_value: '',
    supplier: '',
    status: '',
    location: '',
    notes: '',
    image: null as File | null,
    category_id: 0,
  })
  const [assetCode, setAssetCode] = useState<string>('');
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const status = [
    { values: 'available', label: 'Available' },
    { values: 'assigned', label: 'Assigned' },
    { values: 'maintenance', label: 'Maintenance' },
    { values: 'damaged', label: 'Damaged' },
    { values: 'disposed', label: 'Disposed' },
  ];

  const handleCategoryChange = async (categoryId: string) => {
    const numbericCategoryId = parseInt(categoryId);
    setData("category_id", numbericCategoryId);
    try {
      const response = await fetch(`/assets/last-number/${categoryId}`)
      const result = await response.json();

      const selectcategoryData = category.find((item) => item.id === numbericCategoryId);
      if (selectcategoryData) {
        const prefix = selectcategoryData.name.slice(0, 3);
        const today = new Date().toLocaleDateString('id-ID').replace(/\//g, '');
        const newCode = `${prefix}-${today}-${String(result.last_number + 1).padStart(2, '0')}`;
        console.log('New Asset Code:', result); // Debugging line
        setAssetCode(newCode);
        setData('assets_code', newCode);
      }
    } catch (error) {
      console.error('Error fetching last number:', error);
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('image', file);
      setPreview(URL.createObjectURL(file));
    }
  };


  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('asset.store'), {
      onSuccess: () => {
        toast.success('asset created successfully');
      },
      onError: () => {
        toast.error('Failed to create asset');
      },
    })
  }
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Category" />
      <div className="flex justify-center items-center my-4">
        <Card className='max-w-5xl w-full'>
          <CardHeader>
            <p className='font-serif font-extrabold'>
              <small>*Pilih Kategori asset untuk membuat kode asset</small>
              <br />
              <small>*Upload file gamber produck jika diperlukan</small>
            </p>
          </CardHeader>
          <Separator />
          <CardContent>
            <div className="py-6">
              <div className="mx-auto sm:px-6 lg:px-8">
                <form className="space-y-6" onSubmit={onSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="grid gap-2">
                      <label>
                        Categori Asset
                      </label>
                      <Select
                        name='category_id'
                        onValueChange={handleCategoryChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih Kategori" />
                        </SelectTrigger>
                        <SelectContent>
                          {category.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <InputError message={errors.category_id} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Code Asset
                      </label>
                      <Input value={assetCode}
                        name='assets_code'
                        className={cn(errors.assets_code ? "border-red-600 border-1" : "", "input-base-class")}
                      />
                      <InputError message={errors.assets_code} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Name Asset
                      </label>
                      <Input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        name="name"
                        type='text'
                        className={cn(errors.name ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder=" Nama asset" />
                      <InputError message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Brand
                      </label>
                      <Input
                        value={data.brand}
                        onChange={(e) => setData('brand', e.target.value)}
                        name="brand"
                        type='text'
                        className={cn(errors.brand ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="brand" />
                      <InputError message={errors.brand} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Model
                      </label>
                      <Input
                        value={data.model}
                        onChange={(e) => setData('model', e.target.value)}
                        name="model"
                        type='text'
                        className={cn(errors.model ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="model" />
                      <InputError message={errors.model} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Serial Number
                      </label>
                      <Input
                        value={data.serial_number}
                        onChange={(e) => setData('serial_number', e.target.value)}
                        name="serial_number"
                        type='text'
                        className={cn(errors.serial_number ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder=" Serial Number" />
                      <InputError message={errors.serial_number} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Processor
                      </label>
                      <Input
                        value={data.processor}
                        onChange={(e) => setData('processor', e.target.value)}
                        name="processor"
                        type='text'
                        className={cn(errors.processor ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="Processor" />
                      <InputError message={errors.processor} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Storage
                      </label>
                      <Input
                        value={data.storage}
                        onChange={(e) => setData('storage', e.target.value)}
                        name="storage"
                        type='text'
                        className={cn(errors.storage ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="Storage" />
                      <InputError message={errors.storage} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Ram
                      </label>
                      <Input
                        value={data.ram}
                        onChange={(e) => setData('ram', e.target.value)}
                        name="ram"
                        type='text'
                        className={cn(errors.ram ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="Ram" />
                      <InputError message={errors.ram} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Ukuran layar
                      </label>
                      <Input
                        value={data.ukuran_layar}
                        onChange={(e) => setData('ukuran_layar', e.target.value)}
                        name="ukuran_layar"
                        type='text'
                        className={cn(errors.ukuran_layar ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="Ukuran layar" />
                      <InputError message={errors.ukuran_layar} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        OS
                      </label>
                      <Input
                        value={data.os}
                        onChange={(e) => setData('os', e.target.value)}
                        name="os"
                        type='text'
                        className={cn(errors.os ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="OS" />
                      <InputError message={errors.os} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Office
                      </label>
                      <Input
                        value={data.office}
                        onChange={(e) => setData('office', e.target.value)}
                        name="office"
                        type='text'
                        className={cn(errors.office ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="Office" />
                      <InputError message={errors.office} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Warranty
                      </label>
                      <Input
                        value={data.warranty}
                        onChange={(e) => setData('warranty', e.target.value)}
                        name="warranty"
                        type='text'
                        className={cn(errors.warranty ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="Warranty" />
                      <InputError message={errors.warranty} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Received Date
                      </label>
                      <Input
                        value={data.received_date}
                        onChange={(e) => setData('received_date', e.target.value)}
                        name="received_date"
                        type='date'
                        className={cn(errors.received_date ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="Received Date" />
                      <InputError message={errors.received_date} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Purchase Date
                      </label>
                      <Input
                        value={data.purchase_date}
                        onChange={(e) => setData('purchase_date', e.target.value)}
                        name="purchase_date"
                        type='date'
                        className={cn(errors.purchase_date ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="Purchase Date" />
                      <InputError message={errors.purchase_date} />
                    </div>

                    <div className="grid gap-2">
                      <label>
                        Warranty Expiration
                      </label>
                      <Input
                        value={data.warranty_expiration}
                        onChange={(e) => setData('warranty_expiration', e.target.value)}
                        name="warranty_expiration"
                        type='date'
                        className={cn(errors.warranty_expiration ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder=" Warranty Expiration" />
                      <InputError message={errors.warranty_expiration} />
                    </div>

                    <div className="grid gap-2">
                      <label>
                        Purchase Price
                      </label>
                      <Input
                        value={data.purchase_price}
                        onChange={(e) => setData('purchase_price', e.target.value)}
                        name="purchase_price"
                        type='number'
                        className={cn(errors.purchase_price ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="Purchase Price" />
                      <InputError message={errors.purchase_price} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Curent Value
                      </label>
                      <Input
                        value={data.current_value}
                        onChange={(e) => setData('current_value', e.target.value)}
                        name="current_value"
                        type='number'
                        className={cn(errors.current_value ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="Current Value" />
                      <InputError message={errors.current_value} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Supplier
                      </label>
                      <Input
                        value={data.supplier}
                        onChange={(e) => setData('supplier', e.target.value)}
                        name="supplier"
                        type='text'
                        className={cn(errors.supplier ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="Supplier" />
                      <InputError message={errors.supplier} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Status Asset
                      </label>
                      <Select
                        name='status'
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Status Asset" />
                        </SelectTrigger>
                        <SelectContent>
                          {status.map((item) => (
                            <SelectItem
                              value={item.values}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <InputError message={errors.category_id} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Location
                      </label>
                      <Input
                        value={data.location}
                        onChange={(e) => setData('location', e.target.value)}
                        name="location"
                        type='text'
                        className={cn(errors.location ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="Location" />
                      <InputError message={errors.location} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Notes
                      </label>
                      <Textarea
                        value={data.notes}
                        onChange={(e) => setData('notes', e.target.value)}
                        name="notes"
                        disabled={processing}
                        className={cn(errors.notes ? "border-red-600 border-1" : "", "input-base-class")}
                        placeholder="Notes" />
                      <InputError message={errors.notes} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Software
                      </label>
                      <Textarea
                        value={data.software}
                        onChange={(e) => setData('software', e.target.value)}
                        name="software"
                        disabled={processing}
                        className={cn(errors.software ? "border-red-600 border-1" : "", "input-base-class")}
                        placeholder="Software" />
                      <InputError message={errors.software} />
                    </div> 
                    <div className="grid gap-2">
                      <label>
                        Software
                      </label>
                      <Textarea
                        value={data.accessories}
                        onChange={(e) => setData('accessories', e.target.value)}
                        name="accessories"
                        disabled={processing}
                        className={cn(errors.accessories ? "border-red-600 border-1" : "", "input-base-class")}
                        placeholder="Accessories" />
                      <InputError message={errors.accessories} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Photo
                      </label>
                      <Input
                        name="image"
                        type='file'
                        disabled={processing}
                        onChange={handleImageChange}
                        className={cn(errors.image ? "border-red-600 border-1" : "", "input-base-class")}
                      />
                      <InputError message={errors.image} />
                    </div>
                    <div className="grid gap-2">
                      {preview && (
                        <img
                          src={preview as string}
                          alt="Preview"
                          className="w-32 h-32 object-cover rounded-md"
                        />
                      )}
                    </div>
                    
                  </div>
                  <div className='gap-y-2'>
                    <Button type="submit">
                      Save
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}