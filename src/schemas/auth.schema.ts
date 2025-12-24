import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    global_id: z.string().uuid(),
  }),
});
