import { z } from 'zod';
export declare const loginSchema: z.ZodObject<{
    user_id: z.ZodString;
    hash: z.ZodString;
}, "strip", z.ZodTypeAny, {
    hash: string;
    user_id: string;
}, {
    hash: string;
    user_id: string;
}>;
export declare const ssoLoginSchema: z.ZodObject<{
    token: z.ZodString;
}, "strip", z.ZodTypeAny, {
    token: string;
}, {
    token: string;
}>;
export type LoginInput = z.infer<typeof loginSchema>;
export type SSOLoginInput = z.infer<typeof ssoLoginSchema>;
//# sourceMappingURL=auth.schema.d.ts.map