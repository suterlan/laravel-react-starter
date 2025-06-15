import { PermissionNavDefinition } from "@/types";

export const resolveNavItems = (
  definitions: PermissionNavDefinition[],
  userPermissions: string[]
) =>
  definitions
    .filter((def) => userPermissions.includes(def.permission))
    .map((def) => def.item);