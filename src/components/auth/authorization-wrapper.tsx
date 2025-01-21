import useSession from "@/hooks/useSession";
import { UserZod } from "@/interfaces";
import { Permission } from "@/lib/constants/permissions";
import { ROLES } from "@/lib/constants/role";
import { useAppSelector } from "@/store/hooks";
import { Fragment, PropsWithChildren } from "react";

export function hasPermission(user: UserZod, requiredPermission: Permission) {
  const { role, permissions: userPermissions = [] } = user;
  const rolePermissions = ROLES[role]?.permissions || [];

  // Prioridad 1: Permisos individuales del usuario
  if (userPermissions.includes(requiredPermission)) {
    return true;
  }

  // Prioridad 2: Permisos del rol asignado
  return rolePermissions.includes(requiredPermission);
}

interface AuthorizationWrapper extends PropsWithChildren {
  permission: Permission;
}
export default function AuthorizationWrapper({
  children,
  permission,
}: AuthorizationWrapper) {
  const session = useSession();
  const { members } = useAppSelector((s) => s.member);

  if (!session || !session.session) return null;
  const member = members.find((e) => e.id === session.session?.id);
  if (!member) return null;
  if (!hasPermission(member, permission)) {
    console.log(`User no tiene permiso para ${permission}`);
    return null;
  }
  return <Fragment>{children}</Fragment>;
}
