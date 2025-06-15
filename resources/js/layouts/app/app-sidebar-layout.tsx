import { AppContent } from '@/components/app-content';
import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { notify, Toast } from '@/components/Toast';
import { Flash, type BreadcrumbItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { useEffect, type PropsWithChildren } from 'react';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    // Ambil flash message dari Inertia props
    const { flash } = usePage().props as { flash?: Flash };

    // Tampilkan toast jika ada pesan flash
    useEffect(() => {
        if (flash?.success) notify.success(flash.success);
        if (flash?.error) notify.error(flash.error);
        if (flash?.info) notify.info(flash.info);
        if (flash?.warning) notify.warning(flash.warning);
    }, [flash]);

    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">

                {/* notify component */}
                <Toast />

                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}
