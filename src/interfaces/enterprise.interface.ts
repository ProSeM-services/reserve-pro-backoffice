import { ENTERPRISE_STATUS_VALUES } from "@/constants/enterprise-status.constants";
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
  status: z.enum(ENTERPRISE_STATUS_VALUES),
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
