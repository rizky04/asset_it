import { AppContent } from '@/components/app-content';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { cn } from '@/lib/utils';
import { BreadcrumbItem, Category } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React from 'react'
import { toast } from 'sonner';



export default function edit({category}:{category: Category}) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Category / Edit',
      href: '/category',
    },
  ];
  const { data, setData, post, processing, errors } = useForm({
    name: category.name || '',
    description: category.description || '',
    _method: 'PUT',
  })

 const onUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('category.update', category.id), {
      onSuccess: () => {
        toast.success('Category updated successfully');
      },
      onError: () => {
        toast.error('Failed to updated category');
      },
    })
  }
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Category" />
      <div className="space-y-6">
        <div className='m-4'>
          <div className="py-3">
            <div className="mx-auto max-w-lg sm:px-6 lg:px-8">
              <Card>
                <CardContent>
                  <form onSubmit={onUpdate}>
                    <div className="flex flex-col gap-5">
                      <div className="grid gap-2">
                        <label>
                          Nama Kategori
                        </label>
                        <Input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        name="name"
                        type='text' 
                        disabled={processing}
                        className={cn(errors.name ? "border-red-600 border-1": "", "input-base-class")}
                        placeholder="Kategori" />
                        <InputError message={errors.name} />
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
                        className={cn(errors.description ? "border-red-600 border-1": "", "input-base-class")}
                        placeholder="Kategori" />
                        <InputError message={errors.description} />
                        <InputError />
                      </div>
                      <div className='gap-y-2'>
                        <Button type="submit">
                          Simpan
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}
