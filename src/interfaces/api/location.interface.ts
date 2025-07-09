import { z } from "zod";

export const LocationZodSchema = z.object({
  value: z.string(),
  city: z.string(),
  lat: z.number(),
  lng: z.number(),
});
export type Location = z.infer<typeof LocationZodSchema>;
