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
import { Asset, Assignments, BreadcrumbItem, User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react'
import { toast } from 'sonner';


interface EditAssingmentProps {
  assets: Asset[],
   users : User[],
  assignments : Assignments;
}

export default function edit({ assets, users, assignments }: EditAssingmentProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Assignments',
      href: '/assignments/update',
    },
  ];
  const { data, setData, post, processing, errors } = useForm({
    condition_note: assignments.condition_note || "",
    return_date: assignments.return_date || "",
    assignment_date: assignments.assignment_date || "",
    document_url: null as File | null,
    asset_id: assignments.asset_id || "",
    received_by: assignments.received_by || "",
    status: assignments.status || "",
    _method: 'PUT',
  });
  const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);

  const status = [
    { values: 'assigned', label: 'assigned' },
    { values: 'returned', label: 'returned' },
  ];
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setData('document_url', file);
      setPreview(URL.createObjectURL(file));
    }
  };


  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('assignments.update', assignments.id), {
      onSuccess: () => {
        toast.success('assignment updated successfully');
      },
      onError: () => {
        toast.error('Failed to updated assignment');
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
                 {/* <small>*Pilih Kategori asset untuk membuat kode asset</small>
                 <br /> */}
                 <small>*Upload file document serah terima jika diperlukan</small>
               </p>
             </CardHeader>
             <Separator />
             <CardContent>
               <div className="py-6">
                 <div className="mx-auto sm:px-6 lg:px-8">
                   <form className="space-y-6" onSubmit={onSubmit}>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                       <div className="grid gap-2">
                         <label>
                           Asset
                         </label>
                         <Select
                           name='asset_id'
                           onValueChange={(value) => setData('asset_id', parseInt(value))}
                           defaultValue={data.asset_id ? assignments.asset_id.toString() : ''}
                         >
                           <SelectTrigger>
                             <SelectValue placeholder="Pilih Asset" />
                           </SelectTrigger>
                           <SelectContent>
                             {assets.map((item) => (
                               <SelectItem
                                 key={item.id}
                                 value={item.id.toString()}>
                                 {item.name} - {item.assets_code}
                               </SelectItem>
                             ))}
                           </SelectContent>
                         </Select>
                         <InputError message={errors.asset_id} />
                       </div>
                       <div className="grid gap-2">
                         <label>
                           Penerima
                         </label>
                         <Select
                           name='received_by'
                           onValueChange={(value) => setData('received_by', parseInt(value))}
                            defaultValue={data.received_by ? assignments.received_by.toString() : ''}
                         >
                           <SelectTrigger>
                             <SelectValue placeholder="Pilih User" />
                           </SelectTrigger>
                           <SelectContent>
                             {users.map((item) => (
                               <SelectItem
                                 key={item.id}
                                 value={item.id.toString()}>
                                 {item.name}
                               </SelectItem>
                             ))}
                           </SelectContent>
                         </Select>
                         <InputError message={errors.received_by} />
                       </div>
                       <div className="grid gap-2">
                         <label>
                         Assignment date
                         </label>
                         <Input
                           value={data.assignment_date }
                           onChange={(e) => setData('assignment_date', e.target.value)}
                           name="assignment_date"
                           type='date'
                           className={cn(errors.assignment_date ? "border-red-600 border-1" : "", "input-base-class")}
                           disabled={processing}
                           placeholder="Assignment date" />
                         <InputError message={errors.assignment_date} />
                       </div>
                        <div className="grid gap-2">
                         <label>
                         Return date
                         </label>
                         <Input
                           value={data.return_date}
                           onChange={(e) => setData('return_date', e.target.value)}
                           name="return_date"
                           type='date'
                           className={cn(errors.return_date ? "border-red-600 border-1" : "", "input-base-class")}
                           disabled={processing}
                           placeholder="Return date" />
                         <InputError message={errors.return_date} />
                       </div>
                       <div className="grid gap-2 md:col-span-2">
                         <label>
                           Status Asset
                         </label>
                         <Select
                           name='status'
                           onValueChange={(value) => setData('status', value)}
                           defaultValue={data.status ? assignments.status : ''}
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
                         <InputError message={errors.status} />
                       </div>
                       <div className="grid gap-2 md:col-span-2">
                         <label>
                           Condition Note
                         </label>
                         <Textarea
                           value={data.condition_note}
                           onChange={(e) => setData('condition_note', e.target.value)}
                           name="condition_note"
                           disabled={processing}
                           className={cn(errors.condition_note ? "border-red-600 border-1" : "", "input-base-class")}
                           placeholder="Condition Note" />
                         <InputError message={errors.condition_note} />
                       </div>
                       <div className="grid gap-2">
                         <label>
                         Document
                         </label>
                         <Input
                           name="document_url"
                           type='file'
                           disabled={processing}
                           onChange={handleImageChange}
                           className={cn(errors.document_url ? "border-red-600 border-1" : "", "input-base-class")}
                         />
                         <InputError message={errors.document_url} />
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