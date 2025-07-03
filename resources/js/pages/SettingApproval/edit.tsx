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
import { Asset, BreadcrumbItem, Category, SettingApproval, User } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import React, { useState } from 'react'
import { toast } from 'sonner';


interface CreateSettingApprovalProps {
  users: User[],
  settingApproval: SettingApproval
}

export default function edit({ users, settingApproval }: CreateSettingApprovalProps) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: 'Setting Approval',
      href: '/settingApproval/create',
    },
  ];
  const { data, setData, post, processing, errors } = useForm({
    user_id: settingApproval.user_id || 0,
    type: settingApproval.type || '',
    name: settingApproval.name || '',
    note: settingApproval.note || '',
    _method: 'PUT',
  })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('settingApproval.update', settingApproval.id), {
      onSuccess: () => {
        toast.success('assignments created successfully');
      },
      onError: () => {
        toast.error('Failed to create assignments');
      },
    })
  }
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Edit Setting Approval" />
      <div className="flex justify-center items-center my-4">
        <Card className='max-w-5xl w-full'>
          <CardContent>
            <div className="py-6">
              <div className="mx-auto sm:px-6 lg:px-8">
                <form className="space-y-6" onSubmit={onSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="grid gap-2">
                      <label>
                        Pilih User
                      </label>
                      <Select
                        name='user_id'
                        onValueChange={(value) => setData('user_id', parseInt(value))}
                        defaultValue={data.user_id.toString()}
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
                      <InputError message={errors.user_id} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        type
                      </label>
                      <Input
                        value={data.type}
                        onChange={(e) => setData('type', e.target.value)}
                        name="type"
                        type='number'
                        className={cn(errors.type ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="type" />
                      <InputError message={errors.type} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Name
                      </label>
                      <Input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        name="name"
                        type='text'
                        className={cn(errors.name ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="name" />
                      <InputError message={errors.name} />
                    </div>
                    <div className="grid gap-2">
                      <label>
                        Note
                      </label>
                      <Input
                        value={data.note}
                        onChange={(e) => setData('note', e.target.value)}
                        name="note"
                        type='text'
                        className={cn(errors.note ? "border-red-600 border-1" : "", "input-base-class")}
                        disabled={processing}
                        placeholder="note" />
                      <InputError message={errors.note} />
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