import { ACCOUNT_TYPE_VALUES } from "@/lib/constants/accout-type";
import { Permission } from "@/lib/constants/permissions";
import { ROLES_VALUES } from "@/lib/constants/role";
import { z } from "zod";
import { WorkhourZodSchema } from "./workhour.interface";

export const UserSchema = z.object({
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
export const CreatUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  emailConfirmed: true,
  confirmationToken: true,
  confirmationTokenExpiresAt: true,
  membership_status: true,
  permissions: true,
  tenantName: true,
  fullName: true,
});
export const UpdateUserSchema = UserSchema.omit({
  id: true,
}).partial();

export const RegisterUserSchmea = z
  .object({
    name: z.string().min(1),
    lastName: z.string().min(1),
    userName: z.string().min(1),
    password: z.string().min(1),
    email: z.string().min(1),
    phone: z.string().optional(),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword, // Comparación entre las contraseñas
    {
      path: ["confirmPassword"], // El campo al que se asignará el error si falla la validación
      message: "Las contraseñas no coinciden", // Mensaje de error
    }
  );
export type IUser = z.infer<typeof UserSchema>;
export type ICreateUser = z.infer<typeof CreatUserSchema>;
export type IUpdateUser = z.infer<typeof UpdateUserSchema>;
export type IUserRegister = z.infer<typeof RegisterUserSchmea>;
