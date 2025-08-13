import { z } from "zod";
export const EnterpriseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email("Invalid email format").optional(),
  address: z.string(),
  company_count: z.number(),
  company_limit: z.number(),
  payment_plan: z.string().optional(),
  createdAt: z.string(),
});
export type IEnterprise = z.infer<typeof EnterpriseSchema>;
export const CreateEnterpriseSchema = z.object({
  name: z.string(),
  email: z.string().email("Invalid email format").optional(),
  address: z.string(),
  company_count: z.number(),
  payment_plan: z.string().optional(),
  createdAt: z.string().optional(),
});
export type ICreateEnterprise = z.infer<typeof EnterpriseSchema>;
