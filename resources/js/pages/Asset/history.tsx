import AppLayout from '@/layouts/app-layout';
import { Approval, Asset, Assignments, BreadcrumbItem, SettingApproval } from '@/types'
import { Head } from '@inertiajs/react';
import { DataTable } from './component/data-table';
import { columns } from './component/columns';

interface AssingmentsIndexProps {
  assignments : Assignments[];
  approvals : Approval[];
  settingApproval : SettingApproval[];
   // Assuming asset is an array of Asset objects
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: '/assets/history',
        href: '/assets/history',
    },
];
export default function index( {assignments, approvals, settingApproval}: AssingmentsIndexProps ) {
  return (
   <AppLayout breadcrumbs={breadcrumbs}>
     <Head title="Asset History" />
        <div className="space-y-6">
           <div className='m-4'>
           <DataTable columns={columns} data={assignments} approvals={approvals} settingApproval={settingApproval} />
           </div>
        </div>
    </AppLayout>
  )
}