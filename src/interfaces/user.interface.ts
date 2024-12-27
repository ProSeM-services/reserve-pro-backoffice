import { z } from "zod";
export const ROLES_VALUES = ["BASIC", "ADMIN", "OWNER"] as const;
export const UserZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  lastName: z.string(),
  email: z.string(),
  role: z.enum(ROLES_VALUES),
  image: z.string().optional(),
  tenantName: z.string().optional(),
  companyName: z.string().optional(),
});

export type UserZod = z.infer<typeof UserZodSchema>;
