import AppLayout from '@/layouts/app-layout';
import { Asset, BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';

interface AssetIndexProps {
  asset : Asset[]; // Assuming asset is an array of Asset objects
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Asset',
        href: '/asset',
    },
];
export default function index( {asset}: AssetIndexProps ) {
  return (
   <AppLayout breadcrumbs={breadcrumbs}>
     <Head title="Asset" />
        <div className="space-y-6">
           <div className='m-4'>
           <DataTable columns={columns} data={asset} />
           </div>
        </div>
    </AppLayout>
  )
}