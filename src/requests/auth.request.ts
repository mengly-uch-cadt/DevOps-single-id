import { z } from 'zod';
import { loginSchema, ssoLoginSchema } from '../schemas/auth.schema';

export const loginRequest = z.object({
  body: loginSchema,
});

export const ssoLoginRequest = z.object({
  body: ssoLoginSchema,
});
