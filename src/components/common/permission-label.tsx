import { Permission } from "@/lib/constants/permissions";
import React from "react";

type PermissionLabelProps = {
  permission: Permission;
};

const permissionMap: Record<Permission, string> = {
  "create:company": "Crear Sucursal",
  "update:company": "Actualizar Sucursal",
  "delete:company": "Eliminar Sucursal",
  "view:company": "Ver Sucursal",
  "create:members": "Crear Miembro",
  "update:members": "Actualizar Miembro",
  "delete:members": "Eliminar Miembro",
  "view:members": "Ver Miembro",
  "create:services": "Crear Servicio",
  "update:services": "Actualizar Servicio",
  "delete:services": "Eliminar Servicio",
  "view:services": "Ver Servicio",
  "create:appointments": "Crear Cita",
  "update:appointments": "Actualizar Cita",
  "delete:appointments": "Eliminar Cita",
  "view:appointments": "Ver Cita",
  "create:workhours": "Crear Horarios de Trabajo",
  "update:workhours": "Actualizar Horarios de Trabajo",
  "delete:workhours": "Eliminar Horarios de Trabajo",
  "view:workhours": "Ver Horarios de Trabajo",
  "update:own_workhours": "Actualizar Propios Horarios de Trabajo",
  "view:customers": "Ver Clientes",
  "view:payments": "Ver Pagos",
  "create:payments": "Crear Pagos",
  "update:payments": "Actualizar Pagos",
  "delete:payments": "Eliminar Pagos",
  "view:enterprises": "Ver Empresas",
  "create:enterprises": "Crear Empresa",
  "update:enterprises": "Actualizar Empresa",
  "delete:enterprises": "Eliminar Empresa",
};

export const PermissionLabel: React.FC<PermissionLabelProps> = ({
  permission,
}) => {
  const readableLabel = permissionMap[permission] || "Permiso Desconocido";

  return <span>{readableLabel}</span>;
};
