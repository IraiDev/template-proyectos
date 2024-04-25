import { VALIDATION_MESSAGE } from "@config/messages"
import { z } from "zod"

export const authSchema = z.object({
  correo: z
    .string()
    .min(1, { message: VALIDATION_MESSAGE.REQUIRED })
    .email(VALIDATION_MESSAGE.EMAIL),
  contrasena: z.string().min(1, { message: VALIDATION_MESSAGE.REQUIRED }),
})
export type AuthPayload = z.infer<typeof authSchema>
