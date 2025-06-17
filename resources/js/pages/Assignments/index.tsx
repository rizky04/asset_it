import AppLayout from '@/layouts/app-layout';
import { Asset, Assignments, BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';

interface AssingmentsIndexProps {
  assignments : Assignments[]; // Assuming asset is an array of Asset objects
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Assignments',
        href: '/assignments',
    },
];
export default function index( {assignments}: AssingmentsIndexProps ) {
  return (
   <AppLayout breadcrumbs={breadcrumbs}>
     <Head title="Asset" />
        <div className="space-y-6">
           <div className='m-4'>
           <DataTable columns={columns} data={assignments} />
           </div>
        </div>
    </AppLayout>
  )
}