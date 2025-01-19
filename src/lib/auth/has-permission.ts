import { UserZod } from "@/interfaces";
import { Permission } from "@/lib/constants/permissions";
import { ROLES } from "@/lib/constants/role";

export function hasPermission(
  user: UserZod,
  requiredPermission: Permission
): boolean {
  const { role, permissions: userPermissions = [] } = user;
  const rolePermissions = ROLES[role]?.permissions || [];

  // Prioridad 1: Permisos individuales del usuario
  if (userPermissions.includes(requiredPermission)) {
    return true;
  }

  // Prioridad 2: Permisos del rol asignado
  return rolePermissions.includes(requiredPermission);
}
