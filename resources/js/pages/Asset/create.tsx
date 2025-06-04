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
      title: 'Product / Create',
      href: '/product',
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
              <small>*Pilih Kategori product untuk membuat kode product</small>
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
                        Kategori Produk
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
                        Kode Produk
                      </label>
                      <Input value={assetCode}
                       name='assets_code'
                        className={cn(errors.assets_code ? "border-red-600 border-1": "", "input-base-class")}
                       />
                      <InputError message={errors.assets_code} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                      Nama Product
                      </label>
                      <Input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        name="name"
                        type='text'
                        className={cn(errors.name ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder=" Nama Product" />
                      <InputError message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                      Harga Product
                      </label>
                      <Input
                        value={data.price}
                        onChange={(e) => setData('price', e.target.value)}
                        name="price"
                        type='number'
                        className={cn(errors.price ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="Harga" />
                      <InputError message={errors.price} />
                    </div>
                     <div className="grid gap-2">
                      <label>
                      Harga Jual
                      </label>
                      <Input
                        value={data.selling_price}
                        onChange={(e) => setData('selling_price', e.target.value)}
                        name="price"
                        type='number'
                        className={cn(errors.selling_price ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="Harga" />
                      <InputError message={errors.selling_price} />
                    </div>
                     <div className="grid gap-2">
                      <label>
                      Stok Produk
                      </label>
                      <Input
                        value={data.stock}
                        onChange={(e) => setData('stock', e.target.value)}
                        name="price"
                        type='number'
                        className={cn(errors.stock ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="Harga" />
                      <InputError message={errors.stock} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Deskripsi
                      </label>
                      <Textarea
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        name="description"
                        disabled={processing}
                        className={cn(errors.description ? "border-red-600 border-1" : "", "input-base-class")}
                        placeholder="description" />
                      <InputError message={errors.description} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                      Foto
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
                    
                    <div className='gap-y-2'>
                      <Button   type="submit">
                        Simpan
                      </Button>
                    </div>
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