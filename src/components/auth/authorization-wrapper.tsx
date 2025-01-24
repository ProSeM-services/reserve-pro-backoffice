import useSession from "@/hooks/useSession";
import { hasPermission } from "@/lib/auth/has-permission";
import { Permission } from "@/lib/constants/permissions";
import { Fragment, PropsWithChildren } from "react";

interface AuthorizationWrapper extends PropsWithChildren {
  permission: Permission;
}
export default function AuthorizationWrapper({
  children,
  permission,
}: AuthorizationWrapper) {
  const { member } = useSession();

  if (!member) return null;
  if (!hasPermission(member, permission)) {
    console.log(`User no tiene permiso para ${permission}`);
    return null;
  }
  return <Fragment>{children}</Fragment>;
}
