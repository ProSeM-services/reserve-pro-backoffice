import { z } from "zod";
export const EnterpriseSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email format").optional(),
  address: z.string(),
  company_count: z.number(),
});
export type IEnterprise = z.infer<typeof EnterpriseSchema>;
export const CreateEnterpriseSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email format").optional(),
  address: z.string(),
  company_count: z.string(),
});
export type ICreateEnterprise = z.infer<typeof EnterpriseSchema>;
