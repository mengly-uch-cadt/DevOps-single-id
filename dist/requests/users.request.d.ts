import { z } from 'zod';
export declare const createUserRequest: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodString;
        hash: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name: string;
        hash?: string | undefined;
    }, {
        name: string;
        hash?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name: string;
        hash?: string | undefined;
    };
}, {
    body: {
        name: string;
        hash?: string | undefined;
    };
}>;
export declare const updateUserRequest: z.ZodObject<{
    body: z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        hash: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        name?: string | undefined;
        hash?: string | undefined;
    }, {
        name?: string | undefined;
        hash?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        name?: string | undefined;
        hash?: string | undefined;
    };
}, {
    body: {
        name?: string | undefined;
        hash?: string | undefined;
    };
}>;
//# sourceMappingURL=users.request.d.ts.map