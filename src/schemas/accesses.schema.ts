import { z } from 'zod';

export const createAccessSchema = z.object({
  body: z.object({
    allow_endpoint: z.string().min(1).max(255),
  }),
});

export const validateAccessSchema = z.object({
  body: z.object({
    endpoint: z.string().min(1).max(255).optional(),
  }),
});
