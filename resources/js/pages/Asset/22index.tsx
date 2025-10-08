import AppLayout from '@/layouts/app-layout';
import { Asset, BreadcrumbItem } from '@/types'
import { Head } from '@inertiajs/react';

import { columns } from './components/columns';
import { DataTable } from './components/data-table';

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
    const buildAssetUrl = (a: Asset) => `${window.location.origin}/assets/${a.assets_code}`;

  return (
   <AppLayout breadcrumbs={breadcrumbs}>
     <Head title="Asset" />
        <div className="space-y-6">
           <div className='m-4'>
           <DataTable columns={columns} data={asset} buildAssetUrl={buildAssetUrl}/>
           </div>
        </div>
    </AppLayout>
  )
}