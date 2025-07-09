import { z } from "zod";
import { UserSchema } from "./user.interface";

export const PROVISION_VALUES = [
  "Presencial",
  "Online",
  "A Domicilio",
] as const;
export type Provision = (typeof PROVISION_VALUES)[number];

export const ServiceZodSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().optional(),
  price: z.number(),
  duration: z.number(),
  images: z.array(z.string()).default([]).nullable(),
  provision: z.enum(PROVISION_VALUES),
  Users: z.array(UserSchema),
  companyId: z.string().optional(),
});

export const CreateServiceZodSchema = ServiceZodSchema.omit({
  id: true,
  Users: true,
  companyId: true,
});
export const UpdateServiceZodSchema = ServiceZodSchema.omit({
  id: true,
  Users: true,
}).partial();

export type IService = z.infer<typeof ServiceZodSchema>;
export type ICreateService = z.infer<typeof CreateServiceZodSchema>;
export type IUpdateService = z.infer<typeof UpdateServiceZodSchema>;
export const AddServiceToCompanySchema = z.object({
  companyId: z.string().min(1),
  serviceId: z.string().min(1),
});

export const AddServiceSchema = z.object({
  companyId: z.string(),
  serviceId: z.string(),
});
export const AddMemberToService = z.object({
  serviceId: z.string(),
  userId: z.string(),
});
export type IAddMemberToService = z.infer<typeof AddMemberToService>;
export type IAddService = z.infer<typeof AddServiceSchema>;
