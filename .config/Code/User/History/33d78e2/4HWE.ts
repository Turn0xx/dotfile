import { z } from 'zod';
import { ValidationException, mapValidationErrors } from '../zod-parsing.handler';

const TokenValidationSchema = z.object({
  id: z.number(),
  token: z.string().length(11),
});

export type TokenValidationCommand = z.infer<typeof TokenValidationSchema>;

export const parseTokenValidationCommand = (data: TokenValidationCommand): TokenValidationCommand => {
  const validationResult = TokenValidationSchema.safeParse(data);

  if (!validationResult.success) {
    mapValidationErrors
  }

  return data;
};

