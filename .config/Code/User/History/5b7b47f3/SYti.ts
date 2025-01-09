import { parse } from 'path';
import { z } from 'zod';
import {
  ValidationException,
  mapValidationErrors,
} from '../../../../../shared/parsing-errors/zod-parsing.handler';

export const ResetPasswordCommand = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const parseResetPasswordCommand = (payload: unknown) => {
  const command = ResetPasswordCommand.safeParse(payload);
  if (!command.success) {
    throw new ValidationException(
      mapValidationErrors(command['error'].message),
    );
  }
  return command.data;
};

export type ResetPasswordCommand = z.infer<typeof ResetPasswordCommand>;