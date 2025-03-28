import { ACCOUNT_TYPE_VALUES } from "@/lib/constants/accout-type";
import { Permission } from "@/lib/constants/permissions";
import { ROLES_VALUES } from "@/lib/constants/role";
import { z } from "zod";
export const UserZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.enum(ROLES_VALUES),
  image: z.string().optional(),
  tenantName: z.string().optional(),
  membership_status: z.boolean().optional(),
  companyName: z.string().optional(),
  account_type: z.enum(ACCOUNT_TYPE_VALUES).optional(),
  permissions: z
    .array(z.nativeEnum(Permission), { message: "El permiso no es válido" })
    .optional(),
});

export type UserZod = z.infer<typeof UserZodSchema>;
