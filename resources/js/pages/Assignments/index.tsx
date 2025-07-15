import AppLayout from '@/layouts/app-layout';
import { Approval, Asset, Assignments, BreadcrumbItem, SettingApproval, Users } from '@/types'
import { Head } from '@inertiajs/react';
import { DataTable } from './components/data-table';
import { columns } from './components/columns';

interface AssingmentsIndexProps {
  assignments: Assignments[];
  approvals: Approval[];
  settingApproval: SettingApproval[];
  users: Users[];
  // Assuming asset is an array of Asset objects
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Assignments',
    href: '/assignments',
  },
];
export default function index({ assignments, approvals, settingApproval, users }: AssingmentsIndexProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Asset" />
      <div className="space-y-6">
        <div className='m-4'>
          <DataTable 
          columns={columns} 
          data={assignments} 
          approvals={approvals} 
          settingApproval={settingApproval} 
          users={users} />
        </div>
      </div>
    </AppLayout>
  )
}