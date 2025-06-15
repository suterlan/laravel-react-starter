import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    role_id: string;
    role?: {
        id: number;
        name: string;
        permissions: Array<{
            id: number;
            name: string;
        }>;
    };
    [key: string]: unknown; // This allows for additional properties...
}

export interface Flash {
    success?: string;
    error?: string;
    info?: string;
    warning?: string;
}

export interface PermissionNavDefinition {
    permission: string;
    item: NavItem;
};

export interface Role {
    id: string;
    name: string;
};

export interface Permission {
    id: string;
    name: string;
}