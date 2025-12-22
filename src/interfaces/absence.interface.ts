import { z } from "zod";

export const AbsenceSchema = z.object({
  id: z.string(),
  UserId: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  reason: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const CreateAbsenceSchema = AbsenceSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  startDate: z.string().min(1),
  endDate: z.string().min(1),
});

export type IAbsence = z.infer<typeof AbsenceSchema>;
export type ICreateAbsence = z.infer<typeof CreateAbsenceSchema>;
