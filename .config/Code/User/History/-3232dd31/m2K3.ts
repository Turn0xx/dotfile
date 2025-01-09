import { z } from "zod";

const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type ForgotPasswordCommand = z.infer<typeof ForgotPasswordSchema>;

