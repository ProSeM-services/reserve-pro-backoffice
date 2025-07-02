import { z } from "zod";

export const UpdatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "La cadena debe contener al menos 1 carácter(es)"),
    newPassword: z
      .string()
      .min(1, "La cadena debe contener al menos 1 carácter(es)"),
    confirmNewPassowrd: z
      .string()
      .min(1, "La cadena debe contener al menos 1 carácter(es)"),
  })
  .refine(
    (data) => data.newPassword === data.confirmNewPassowrd, // Comparación entre las contraseñas
    {
      path: ["confirmNewPassowrd"], // El campo al que se asignará el error si falla la validación
      message: "Las contraseñas no coinciden", // Mensaje de error
    }
  );

export type IUpdatePassword = z.infer<typeof UpdatePasswordSchema>;
