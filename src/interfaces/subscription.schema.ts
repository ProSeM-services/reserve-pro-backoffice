import { z } from "zod";

/*--------------------- CONSANTS TYPES --------------------- */

export const BILING_CYCLE_OPTIONS = ["monthly", "quarterly", "yearly"] as const;

export const BilingSchema = z.enum(BILING_CYCLE_OPTIONS);
export type TBilingCycle = z.infer<typeof BilingSchema>;

export const SUBSCRIPTION_STATUS_OPTIONS = [
  "active",
  "expired",
  "canceled",
] as const;

export const SubscriptionStatusSchema = z.enum(SUBSCRIPTION_STATUS_OPTIONS);
export type TSubscriptionStatus = z.infer<typeof SubscriptionStatusSchema>;

/*---------------------  -------------------------------- --------------------- */

export const SubscriptionSchema = z.object({
  id: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  EnterpriseId: z.string(),
  PlanId: z.string(),
  amount: z.number(),
  discountApplied: z.number(),
  status: SubscriptionStatusSchema,
  billingCycle: BilingSchema,
});
export type ISubscription = z.infer<typeof SubscriptionSchema>;
export const CreateSubscriptionSchema = SubscriptionSchema.omit({
  id: true,
}).optional();
export type ICreateSubscription = z.infer<typeof CreateSubscriptionSchema>;
