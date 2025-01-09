import { z } from "zod";
import { AppointmentZodSchema } from "./appointments.interface";

export const CustomerZodSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  tenantName: z.string().optional(),
  email: z.string(),
  createdAt: z.string(),
  phone: z.string(),
  apointments: z.array(AppointmentZodSchema),
});
export const CreateCustomerZodSchema = CustomerZodSchema.omit({
  id: true,
  apointments: true,
  createdAt: true,
});
export const UpdateCustomerZodSchema = CustomerZodSchema.omit({
  id: true,
  apointments: true,
  createdAt: true,
}).optional();

export type ICustomer = z.infer<typeof CustomerZodSchema>;
export type ICreateCustomer = z.infer<typeof CreateCustomerZodSchema>;
export type IUpdateCustomer = z.infer<typeof UpdateCustomerZodSchema>;
