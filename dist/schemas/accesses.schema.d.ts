import { z } from 'zod';
export declare const createAccessSchema: z.ZodObject<{
    allow_endpoint: z.ZodString;
}, "strip", z.ZodTypeAny, {
    allow_endpoint: string;
}, {
    allow_endpoint: string;
}>;
export declare const updateAccessSchema: z.ZodObject<{
    allow_endpoint: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    allow_endpoint?: string | undefined;
}, {
    allow_endpoint?: string | undefined;
}>;
export type CreateAccessInput = z.infer<typeof createAccessSchema>;
export type UpdateAccessInput = z.infer<typeof updateAccessSchema>;
//# sourceMappingURL=accesses.schema.d.ts.map