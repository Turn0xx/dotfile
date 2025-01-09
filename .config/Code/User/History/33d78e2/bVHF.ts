import { z } from 'zod';

const TokenValidationCommand = z.object({
  id: z.number(),
  token: z.string().length(11),
});

export type TokenValidationCommand = z.infer<typeof TokenValidationCommand>;

