import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { SharedData, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen } from 'lucide-react';
import AppLogo from './app-logo';
import { resolveNavItems } from '@/utils/nav';
import { adminNavDefinitions } from '@/utils/nav/admin';
import { mainNavItems } from '@/utils/nav/main';
import { superAdminNavDefinitions } from '@/utils/nav/superadmin';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    // periksa user sesuai dengan permission nya
    const userPermissions = auth?.user?.role?.permissions.map(p => p.name) || [];

    const adminNavItems = resolveNavItems(adminNavDefinitions, userPermissions);
    const superAdminNavItems = resolveNavItems(superAdminNavDefinitions, userPermissions);

    // Gabungkan semua menu berdasarkan permission
    const roleBasedNavItems = [...mainNavItems, ...adminNavItems, ...superAdminNavItems];

    const footerNavItems: NavItem[] = [
        {
            title: 'Documentation',
            href: '#',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={roleBasedNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
