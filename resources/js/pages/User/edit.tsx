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
import { Asset, BreadcrumbItem, Category, Users } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react'
import { toast } from 'sonner';


interface EditUsersProps {
  user: Users
}


export default function edit({ user }: EditUsersProps) {
  console.log(user);
  const breadcrumbs: BreadcrumbItem[] = [
      {
        title: 'user / Edit',
        href: '/user/update',
      },
    ];
    const { data, setData, post, processing, errors } = useForm({
      name: user.name || '',
      email: user.email || '',
      position: user.position || '',
      departement: user.departement || '',
      business_unit: user.business_unit || '',
      work_location: user.work_location || '',
      phone: user.phone || '',
      address: user.address || '',
      access: user.access || '',
      signature: user.signature || null as File | null,
      password: '',
      _method: 'PUT',
    })
    const access = [
      { values: 'admin', label: 'admin' },
      { values: 'user', label: 'user' },
    ];

       const [preview, setPreview] = useState<string | ArrayBuffer | null>(null);
     const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
         const file = e.target.files?.[0];
         if (file) {
           setData('signature', file);
           setPreview(URL.createObjectURL(file));
         }
       };
  
   
  
  
    const onSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      post(route('user.update', user.id), {
        onSuccess: () => {
          toast.success('user updated successfully');
        },
        onError: () => {
          toast.error('Failed to updated user');
        },
      })
    }
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Create Category" />
        <div className="flex justify-center items-center my-4">
          <Card className='max-w-5xl w-full'>
            <CardContent>
              <div className="py-6">
                <div className="mx-auto sm:px-6 lg:px-8">
                  <form className="space-y-6" onSubmit={onSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      
                      
                      <div className="grid gap-2">
                        <label>
                          Name user
                        </label>
                        <Input
                          value={data.name}
                          onChange={(e) => setData('name', e.target.value)}
                          name="name"
                          type='text'
                          className={cn(errors.name ? "border-red-600 border-1" : "", "input-base-class")}
                          disabled={processing}
                          placeholder=" Nama user" />
                        <InputError message={errors.name} />
                      </div>
                      <div className="grid gap-2">
                        <label>
                        email
                        </label>
                        <Input
                          value={data.email}
                          onChange={(e) => setData('email', e.target.value)}
                          name="email"
                          type='text'
                          className={cn(errors.email ? "border-red-600 border-1" : "", "input-base-class")}
                          disabled={processing}
                          placeholder="email" />
                        <InputError message={errors.email} />
                      </div>
                      <div className="grid gap-2">
                        <label>
                        position
                        </label>
                        <Input
                          value={data.position}
                          onChange={(e) => setData('position', e.target.value)}
                          name="position"
                          type='text'
                          className={cn(errors.position ? "border-red-600 border-1" : "", "input-base-class")}
                          disabled={processing}
                          placeholder="position" />
                        <InputError message={errors.position} />
                      </div>
                      <div className="grid gap-2">
                        <label>
                        departement
                        </label>
                        <Input
                          value={data.departement}
                          onChange={(e) => setData('departement', e.target.value)}
                          name="departement"
                          type='text'
                          className={cn(errors.departement ? "border-red-600 border-1" : "", "input-base-class")}
                          disabled={processing}
                          placeholder="departement" />
                        <InputError message={errors.departement} />
                      </div> 
                       <div className="grid gap-2">
                        <label>
                        address
                        </label>
                        <Input
                          value={data.address}
                          onChange={(e) => setData('address', e.target.value)}
                          name="address"
                          type='text'
                          className={cn(errors.address ? "border-red-600 border-1" : "", "input-base-class")}
                          disabled={processing}
                          placeholder="address" />
                        <InputError message={errors.address} />
                      </div>
                       <div className="grid gap-2">
                        <label>
                        Business Unit
                        </label>
                        <Input
                          value={data.business_unit}
                          onChange={(e) => setData('business_unit', e.target.value)}
                          name="business_unit"
                          type='text'
                          className={cn(errors.business_unit ? "border-red-600 border-1" : "", "input-base-class")}
                          disabled={processing}
                          placeholder="business_unit" />
                        <InputError message={errors.business_unit} />
                      </div>
                      <div className="grid gap-2">
                        <label>
                       Work Location
                        </label>
                        <Input
                          value={data.work_location}
                          onChange={(e) => setData('work_location', e.target.value)}
                          name="work_location"
                          type='text'
                          className={cn(errors.work_location ? "border-red-600 border-1" : "", "input-base-class")}
                          disabled={processing}
                          placeholder="work_location" />
                        <InputError message={errors.work_location} />
                      </div>
                      <div className="grid gap-2">
                        <label>
                       Phone
                        </label>
                        <Input
                          value={data.phone}
                          onChange={(e) => setData('phone', e.target.value)}
                          name="phone"
                          type='text'
                          className={cn(errors.phone ? "border-red-600 border-1" : "", "input-base-class")}
                          disabled={processing}
                          placeholder="phone" />
                        <InputError message={errors.phone} />
                      </div>
                      <div className="grid gap-2">
                        <label>
                        password
                        </label>
                        <Input
                          value={data.password}
                          onChange={(e) => setData('password', e.target.value)}
                          name="password"
                          type='password'
                          className={cn(errors.password ? "border-red-600 border-1" : "", "input-base-class")}
                          disabled={processing}
                          placeholder="password" />
                        <InputError message={errors.password} />
                      </div>
                      
                      <div className="grid gap-2">
                        <label>
                        access user
                        </label>
                        <Select
                          name='access'
                          value={data.access}
  onValueChange={(value) => setData('access', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="access user" />
                          </SelectTrigger>
                          <SelectContent>
                            {access.map((item) => (
                              <SelectItem
                              key={item.values}
                                value={item.values}>
                                {item.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <InputError message={errors.access} />
                      </div>

                      <div className="grid gap-2">
                                                                <label>
                                                                  Signature
                                                                </label>
                                                                <Input
                                                                  name="signature"
                                                                  type='file'
                                                                  disabled={processing}
                                                                  onChange={handleImageChange}
                                                                  className={cn(errors.signature ? "border-red-600 border-1" : "", "input-base-class")}
                                                                />
                                                                <InputError message={errors.signature} />
                                                              </div>
                                                              <div className="grid gap-2">
                                                              {preview === null && user.signature && (
  <img
    src={`/storage/${user.signature}`}
    alt="Preview"
    className="w-32 h-32 object-cover rounded-md"
  />
)}
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