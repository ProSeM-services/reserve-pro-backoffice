import { z } from "zod";
import { UserApiSchema } from "./user.interface";

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
  images: z.array(z.string()).nullable(),
  provision: z.enum(PROVISION_VALUES),
  Users: z.array(UserApiSchema),
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

export type IAPIService = z.infer<typeof ServiceZodSchema>;
