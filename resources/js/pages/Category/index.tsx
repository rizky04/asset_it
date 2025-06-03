import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Category } from '@/types'
import { Head } from '@inertiajs/react';
import React from 'react'
import { DataTable } from './components/data-table';
import { columns } from './components/columns';

interface CategoryIndexProps {
    category : Category[]
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: '/category',
    },
];
export default function index( {category}: CategoryIndexProps ) {
  return (
   <AppLayout breadcrumbs={breadcrumbs}>
     <Head title="Category" />
        <div className="space-y-6">
           <div className='m-4'>
           <DataTable columns={columns} data={category} />
           </div>
        </div>
    </AppLayout>
  )
}
