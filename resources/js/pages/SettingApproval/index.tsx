import AppLayout from '@/layouts/app-layout';
import { Asset, Assignments, BreadcrumbItem, SettingApproval } from '@/types'
import { Head } from '@inertiajs/react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';

interface SettingApprovalIndexProps {
  settingApproval : SettingApproval[]; // Assuming asset is an array of Asset objects
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Setting Approval',
        href: '/settingApproval',
    },
];


export default function index( {settingApproval}: SettingApprovalIndexProps ) {
  console.log(settingApproval)
  return (
   <AppLayout breadcrumbs={breadcrumbs}>
     <Head title="Setting Approval" />
        <div className="space-y-6">
           <div className='m-4'>
           <DataTable columns={columns} data={settingApproval} />
           </div>
        </div>
    </AppLayout>
  )
}