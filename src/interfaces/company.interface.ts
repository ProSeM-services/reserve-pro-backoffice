import { z } from "zod";
import { WorkhourZodSchema } from "./workhour.interface";
import { CATEGORY_VALUES } from "./categeory.interface";
import { LocationZodSchema } from "./location.interface";
import { MemberZodSchema } from "./member.iterface";
import { ServiceZodSchema } from "./services.interface";

export const CompanyZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: LocationZodSchema,
  status: z.boolean().optional(),
  category: z
    .array(z.enum(CATEGORY_VALUES))
    .max(3, "Puedes elegir como máximo 3 categorías.")
    .min(1, "Debes elegir por lo menos 1 categoría."),
  image: z.string().optional(),
  city: z.string().optional(),
  email: z.string().email("Correo electrónico no válido").optional(),
  workhours: z.array(WorkhourZodSchema).optional(),
  members: z.array(z.string()).optional(),
  services: z.array(z.string()).optional(),
  Users: z.array(MemberZodSchema).optional(),
  Services: z.array(ServiceZodSchema).optional(),
});
export const CreateCompanyZodSchema = z.object({
  name: z.string(),
  address: z.string(),
  status: z.boolean().optional(),
  category: z
    .array(z.enum(CATEGORY_VALUES))
    .max(3, "Puedes elegir como máximo 3 categorías.")
    .min(1, "Debes elegir por lo menos 1 categoría."),
  image: z.string().optional(),
  email: z.string().email("Correo electrónico no válido").optional(),
  workhours: z.array(WorkhourZodSchema).optional(),
});

export type ICompany = z.infer<typeof CompanyZodSchema>;
export const CompanyEditSchema = CompanyZodSchema.optional();
export type IEditCompany = z.infer<typeof CompanyEditSchema>;

export type ICreateCompany = z.infer<typeof CreateCompanyZodSchema>;

export const AddMemberSchema = z.object({
  companyId: z.string(),
  userId: z.string(),
});
export type IAddMember = z.infer<typeof AddMemberSchema>;
