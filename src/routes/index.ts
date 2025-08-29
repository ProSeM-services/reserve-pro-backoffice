import { Role } from "@/lib/constants/role";

import type { JSX } from "react";

// routes.ts
type TRoute = {
  path: string;
  name: string;
  icon: JSX.Element;
  element: JSX.Element;
  rolesAccess?: Role[];
  sidebarContent: boolean;
};

export const routes: TRoute[] = [];
