import { z } from "zod";
export enum PaymentStatus {
  PAID = "paid",
  PENDING = "pending",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

const isoStringRegex =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+-]\d{2}:\d{2}))$/;

const paymentStatusValues = Object.values(PaymentStatus) as [
  string,
  ...string[]
];

export const PaymentSchema = z.object({
  id: z.string(),
  date: z
    .string()
    .trim()
    .refine((value) => isoStringRegex.test(value), {
      message:
        "Date must be a valid ISO 8601 string including time and timezone",
    }),
  amount: z.number().min(1),
  status: z.enum(paymentStatusValues),
  payment_by: z.string(),
  EnterpriseId: z.string(),
  start_date: z
    .string()
    .trim()
    .refine((value) => isoStringRegex.test(value), {
      message:
        "Date must be a valid ISO 8601 string including time and timezone",
    }),
  end_date: z
    .string()
    .trim()
    .refine((value) => isoStringRegex.test(value), {
      message:
        "Date must be a valid ISO 8601 string including time and timezone",
    }),
  payment_method: z.string().optional(),
  notes: z.string().optional(),
});
export type IPayment = z.infer<typeof PaymentSchema>;

export const CreatePaymentSchema = z.object({
  date: z
    .string()
    .trim()
    .refine((value) => isoStringRegex.test(value), {
      message:
        "Date must be a valid ISO 8601 string including time and timezone",
    }),
  amount: z.number().min(1),
  start_date: z
    .string()
    .trim()
    .refine((value) => isoStringRegex.test(value), {
      message:
        "Date must be a valid ISO 8601 string including time and timezone",
    }),
  payment_method: z.string().optional(),
  notes: z.string().optional(),
});

export type ICreatePayment = z.infer<typeof CreatePaymentSchema>;
