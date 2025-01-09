import { parse } from 'path';
import { z } from 'zod';


export const ResetPasswordCommand = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const parseResetPasswordCommand = (payload: unknown) => {
  const command = ResetPasswordCommand.safeParse(payload);
  if (!command.success) {
    throw new (command.error.errors[0].message);
  }
  return command.data;
}

export type ResetPasswordCommand = z.infer<typeof ResetPasswordCommand>;