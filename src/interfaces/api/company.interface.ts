import { z } from "zod";
import { WorkhourZodSchema } from "./workhour.interface";
import { CATEGORY_VALUES } from "./categeory.interface";
import { LocationZodSchema } from "./location.interface";
import { ServiceZodSchema } from "./services.interface";
import { UserApiSchema } from "./user.interface";

export const CompanyZodSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: LocationZodSchema,
  status: z.boolean().optional(),
  payment_methods: z.array(z.string()).optional(),
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
  Users: z.array(UserApiSchema).optional(),
  Services: z.array(ServiceZodSchema).optional(),
  floor: z.string().optional(),
  apartment: z.string().optional(),
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

export type IAPICompany = z.infer<typeof CompanyZodSchema>;
export const CompanyEditSchema = CompanyZodSchema.optional();
export type IEditCompany = z.infer<typeof CompanyEditSchema>;

export type ICreateCompany = z.infer<typeof CreateCompanyZodSchema>;

export const AddMemberSchema = z.object({
  companyId: z.string(),
  userId: z.string(),
});
export type IAddMember = z.infer<typeof AddMemberSchema>;
