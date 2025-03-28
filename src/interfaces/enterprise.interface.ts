import { z } from "zod";

export const EnterpriseSchema = z.object({
  name: z.string().nonempty("Name is required"),
  address: z.string().nonempty("Address is required"),
  email: z.string().email("Invalid email format").optional(),
  website: z.string().url("Invalid URL format").optional(),
});

export type IEnterprise = z.infer<typeof EnterpriseSchema>;
