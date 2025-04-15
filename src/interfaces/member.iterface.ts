import { z } from "zod";
import { WorkhourZodSchema } from "./workhour.interface";
import { Permission } from "@/lib/constants/permissions";
import { ROLES_VALUES } from "@/lib/constants/role";

export const RegisterUserSchmea = z
  .object({
    name: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(1),
    userName: z.string().min(1),
    password: z.string().min(1),
    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword, // Comparación entre las contraseñas
    {
      path: ["confirmPassword"], // El campo al que se asignará el error si falla la validación
      message: "Las contraseñas no coinciden", // Mensaje de error
    }
  );
export const ZodTenantSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  role: z.enum(ROLES_VALUES),
  userName: z.string().min(1),
  password: z.string().min(1),
  phone: z.string().min(1),
  tenantName: z.string().optional(),
  companyName: z.string(),
  image: z.string().optional(),
  EnterpriseId: z.string().optional(),
});
export const CreateTenantZodSchema = ZodTenantSchema.omit({
  id: true,
})
  .extend({
    confirmPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.confirmPassword, // Comparación entre las contraseñas
    {
      path: ["confirmPassword"], // El campo al que se asignará el error si falla la validación
      message: "Las contraseñas no coinciden", // Mensaje de error
    }
  );
export type ITentant = z.infer<typeof ZodTenantSchema>;
export type ICreateTentant = z.infer<typeof CreateTenantZodSchema>;
export type IUserRegister = z.infer<typeof RegisterUserSchmea>;

export const MemberZodSchema = ZodTenantSchema.omit({
  tenantName: true,
}).extend({
  phone: z.string().optional(),
  workhours: z.array(WorkhourZodSchema).optional(),
  CompanyId: z.string().optional(),
  createdAt: z.string().optional(),
  membership_status: z.boolean().optional(),
  fullName: z.string(),
  permissions: z
    .array(z.nativeEnum(Permission), { message: "El permiso no es válido" })
    .optional(),
});
export const CreateMemberZodSchema = ZodTenantSchema.omit({
  tenantName: true,
  id: true,
}).extend({
  phone: z.string().optional(),
  workhours: z.array(WorkhourZodSchema).optional(),
  permissions: z
    .array(z.nativeEnum(Permission), { message: "El permiso no es válido" })
    .optional(),
});
export const EditMemberZodSchema = MemberZodSchema.omit({
  password: true,
  CompanyId: true,
})
  .partial()
  .extend({
    phone: z.string().optional(),
    workhours: z.array(WorkhourZodSchema).optional(),
    permissions: z
      .array(z.nativeEnum(Permission), { message: "El permiso no es válido" })
      .optional(),
  });

export type IMember = z.infer<typeof MemberZodSchema>;
export type ICreateMember = z.infer<typeof CreateMemberZodSchema>;
export type IEditMember = z.infer<typeof EditMemberZodSchema>;
