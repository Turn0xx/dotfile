import { z } from 'zod';

const TokenValidationCommand = z.object({
  id: z.number(),
  token: z.string().min(1),
});