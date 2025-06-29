import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';


interface DashboardProps {
    asset: number;
    availableAssets: number;
    assignedAssets: number;
    disposedAssets: number;
    maintainedAssets: number;
    damagedAssets: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ asset, availableAssets, assignedAssets, disposedAssets, maintainedAssets, damagedAssets } : DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center justify-center">
                <div className="text-center">
                    <div className="text-3xl font-bold">{asset}</div>
                    <div className="text-sm text-gray-500">Total Assets</div>
                </div>
            </div>
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center justify-center">
                <div className="text-center">
                    <div className="text-3xl font-bold">{availableAssets}</div>
                    <div className="text-sm text-gray-500">Available Assets</div>
                </div>
            </div>
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center justify-center">
                <div className="text-center">
                    <div className="text-3xl font-bold">{assignedAssets}</div>
                    <div className="text-sm text-gray-500">Assigned Assets</div>
                </div>
            </div>
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center justify-center">
                <div className="text-center">
                    <div className="text-3xl font-bold">{disposedAssets}</div>
                    <div className="text-sm text-gray-500">Disposed Assets</div>
                </div>
            </div>
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center justify-center">
                <div className="text-center">
                    <div className="text-3xl font-bold">{maintainedAssets}</div>
                    <div className="text-sm text-gray-500">Maintaince Assets</div>
                </div>
            </div>
            <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border flex items-center justify-center">
                <div className="text-center">
                    <div className="text-3xl font-bold">{damagedAssets}</div>
                    <div className="text-sm text-gray-500">Damage Assets</div>
                </div>
            </div>
        </div>
                {/* <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div> */}
            </div>
        </AppLayout>
    );
}
