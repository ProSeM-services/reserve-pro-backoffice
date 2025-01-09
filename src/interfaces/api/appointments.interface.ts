import { z } from "zod";
import { MemberZodSchema } from "./member.iterface";
const isoStringRegex =
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+-]\d{2}:\d{2}))$/;

export const AppointmentZodSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  time: z.string().min(1),
  duration: z.number().optional(),
  date: z
    .string()
    .trim()
    .refine((value) => isoStringRegex.test(value), {
      message:
        "Date must be a valid ISO 8601 string including time and timezone",
    }),
  UserId: z.string().min(1),
  ServiceId: z.string().min(1),
  CustomerId: z.string().optional(),
  tenantName: z.string().optional(),
  companyId: z.string().optional(),
  canceled: z.boolean().optional(),
  createdAt: z.string(),
  User: MemberZodSchema,
});

export const SlotsZodSchmea = z.object({
  date: z
    .string()
    .trim()
    .refine((value) => isoStringRegex.test(value), {
      message:
        "Date must be a valid ISO 8601 string including time and timezone",
    }),
  UserId: z.string().min(1),
  duration: z.number(),
});
export const CancelAppointmentZodSchema = z.object({
  UserId: z.string().min(1),
  appointmemntId: z.string().min(1),
});

export const ClientDataSchema = z.object({
  name: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
});
export const CreateAppointmentZodSchema = z.object({
  name: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  time: z.string().min(1),
  date: z
    .string()
    .trim()
    .refine((value) => isoStringRegex.test(value), {
      message:
        "Date must be a valid ISO 8601 string including time and timezone",
    }),
  UserId: z.string().min(1),
  ServiceId: z.string().min(1),
});
export type IClientData = z.infer<typeof ClientDataSchema>;
export type ICreateAppointment = z.infer<typeof CreateAppointmentZodSchema>;
export type IAppointment = z.infer<typeof AppointmentZodSchema>;

export type IAppointmentApiResponse = {
  appointments: IAppointment[];
  total: number;
  limit: number;
  offset: number;
  page: number;
};
