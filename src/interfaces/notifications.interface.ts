import { z } from "zod";

export const NotificationsSchema = z.object({
  id: z.string(),
  title: z.string().min(1, "El título es requerido"),
  message: z.string().min(1, "El mensaje es requerido"),
  read: z.boolean().default(false),
  relatedEntityId: z.string().optional(),
  type: z.enum(["payment", "appointment", "system"]),
  adminId: z.string().optional(),
  EnterpriseId: z.string().optional(),
});
export type INotification = z.infer<typeof NotificationsSchema>;
