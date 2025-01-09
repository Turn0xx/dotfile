import { z } from "zod";

const ForgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type ForgotPasswordCommand = z.infer<typeof ForgotPasswordSchema>;

export const parseForgotPasswordCommand = (
  data: ForgotPasswordCommand,
): ForgotPasswordCommand => {
  const validationResult = ForgotPasswordSchema.safeParse(data);

  if (!validationResult.success) {
    
  }

  return data;
};