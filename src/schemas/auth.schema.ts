import { z } from 'zod';

export const loginSchema = z.object({
  user_id: z.string().min(1, 'User ID is required'),
  hash: z.string().min(1, 'Hash is required'),
});

export const ssoLoginSchema = z.object({
  token: z.string().min(1, 'Token is required'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SSOLoginInput = z.infer<typeof ssoLoginSchema>;
