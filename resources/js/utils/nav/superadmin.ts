
import { PermissionNavDefinition } from "@/types";
import { MonitorCog, Shield, UserRoundCog } from "lucide-react";

export const superAdminNavDefinitions: PermissionNavDefinition[] = [
  {
    permission: 'manage_roles',
    item: {
      title: 'Manage Roles',
      href: '/dashboard/roles',
      icon: UserRoundCog,
    },
  },
  {
    permission: 'manage_permissions',
    item: {
      title: 'Manage Permissions',
      href: '/dashboard/permissions',
      icon: Shield,
    },
  },
  {
    permission: 'manage_system',
    item: {
      title: 'System Controls',
      href: '/dashboard/system',
      icon: MonitorCog,
    },
  },
];