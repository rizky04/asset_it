import AppLayout from '@/layouts/app-layout';
import { Asset, BreadcrumbItem, Users } from '@/types'
import { Head } from '@inertiajs/react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';

interface UsersIndexProps {
  user : Users[]; // Assuming asset is an array of Asset objects
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'User',
        href: '/user',
    },
];
export default function index( {user}: UsersIndexProps ) {
  return (
   <AppLayout breadcrumbs={breadcrumbs}>
     <Head title="Asset" />
        <div className="space-y-6">
           <div className='m-4'>
           <DataTable columns={columns} data={user} />
           </div>
        </div>
    </AppLayout>
  )
}