
import { PermissionNavDefinition } from "@/types";
import { UsersRound } from "lucide-react";

export const adminNavDefinitions: PermissionNavDefinition[] = [
  {
    permission: 'manage_users',
    item: {
      title: 'Manage Users',
            href: '/dashboard/manage-users',
            icon: UsersRound,
    },
  },
];