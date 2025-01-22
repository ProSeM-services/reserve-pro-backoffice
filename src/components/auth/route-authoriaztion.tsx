import useSession from "@/hooks/useSession";
import { hasPermission } from "@/lib/auth/has-permission";
import { Permission } from "@/lib/constants/permissions";
import { Fragment, PropsWithChildren } from "react";
import { Navigate } from "react-router";

interface AuthorizationWrapper extends PropsWithChildren {
  permission: Permission;
}
export function RouteAuthorizationWrapper({
  children,
  permission,
}: AuthorizationWrapper) {
  const session = useSession();

  if (!hasPermission(session.member, permission)) {
    console.log(`User no tiene permiso para ${permission}`);
    return <Navigate to="/dashboard" replace />;
  }

  return <Fragment>{children}</Fragment>;
}
