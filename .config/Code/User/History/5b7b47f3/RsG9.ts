import { z } from 'zod';


export const ResetPasswordCommand = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export parse

export type ResetPasswordCommand = z.infer<typeof ResetPasswordCommand>;