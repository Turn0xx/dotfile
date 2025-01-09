import { z } from 'zod';
import {
  ValidationException,
  mapValidationErrors,
} from '../../../../parsing-errors/zod-parsing.handler';

const TokenValidationSchema = z.object({
  id: z.number(),
  token: z.string().min(10).max(11),
});

export type TokenValidationCommand = z.infer<typeof TokenValidationSchema>;

export const parseTokenValidationCommand = (
  data: TokenValidationCommand,
): TokenValidationCommand => {
  const validationResult = TokenValidationSchema.safeParse(data);

  if (!validationResult.success) {
    throw new ValidationException(
      mapValidationErrors(validationResult['error'].issues),
    );
  }

  return data;
};
