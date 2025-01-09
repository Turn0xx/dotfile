import { z } from 'zod';

const TokenValidationSchema = z.object({
  id: z.number(),
  token: z.string().length(11),
});

export type TokenValidationCommand = z.infer<typeof TokenValidationSchema>;

export const parseTokenValidationCommand = (data: TokenValidationCommand): TokenValidationCommand => {
  const validationResult = TokenValidationSchema.safeParse(data);

  if (!validationResult.success) {
    throw new Error('Invalid token');
  }

  return data;
};

