import { z } from "zod";
import { WorkhourZodSchema } from "./workhour.interface";
import { Permission } from "@/lib/constants/permissions";
import { ROLES_VALUES } from "@/lib/constants/role";
import { ACCOUNT_TYPE_VALUES } from "@/lib/constants/accout-type";

export const UserApiSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  lastName: z.string().min(1),
  userName: z.string().min(1),
  password: z.string().min(1),
  fullName: z.string(),
  email: z.string().min(1),
  role: z.enum(ROLES_VALUES),
  companyName: z.string().optional(),
  tenantName: z.string().optional(),
  phone: z.string().optional(),
  image: z.string().optional(),
  emailConfirmed: z.boolean().optional(),
  membership_status: z.boolean().optional(),
  confirmationToken: z.string().optional(),
  confirmationTokenExpiresAt: z.date().optional(),
  EnterpriseId: z.string(),
  workhours: z.array(WorkhourZodSchema).optional(),
  account_type: z.enum(ACCOUNT_TYPE_VALUES).optional(),
  CompanyId: z.string().optional(),
  createdAt: z.string().optional(),
  permissions: z
    .array(z.nativeEnum(Permission), { message: "El permiso no es válido" })
    .optional(),
});

export type IAPIUser = z.infer<typeof UserApiSchema>;
