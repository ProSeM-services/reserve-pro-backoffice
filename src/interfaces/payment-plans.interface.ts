import { z } from "zod";

export const PaymentPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
  duration: z.number(), // Duration in months or days
  isActive: z.boolean(),
  description: z.string().optional(),
  createdAt: z.date().optional(),
  company_limit: z
    .number()
    .int()
    .min(1, "Company limit must be a positive integer"), // Duration in months or days
});

export const CreatePaymentPlanSchema = z.object({
  name: z.string().min(1, "Name is required"),
  price: z.number().min(0, "Price must be a positive number"),
  duration: z.number().int().min(1, "Duration must be a positive integer"), // Duration in months or days
  company_limit: z
    .number()
    .int()
    .min(1, "Company limit must be a positive integer"), // Duration in months or days
  description: z.string().optional(),
  isActive: z.boolean().default(true), // Indicates if the payment plan is currently active
});
export type PaymentPlan = z.infer<typeof PaymentPlanSchema>;
export type CreatePaymentPlan = z.infer<typeof CreatePaymentPlanSchema>;
