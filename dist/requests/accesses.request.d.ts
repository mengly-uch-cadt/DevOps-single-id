import { z } from 'zod';
export declare const createAccessRequest: z.ZodObject<{
    body: z.ZodObject<{
        allow_endpoint: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        allow_endpoint: string;
    }, {
        allow_endpoint: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        allow_endpoint: string;
    };
}, {
    body: {
        allow_endpoint: string;
    };
}>;
export declare const updateAccessRequest: z.ZodObject<{
    body: z.ZodObject<{
        allow_endpoint: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        allow_endpoint?: string | undefined;
    }, {
        allow_endpoint?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        allow_endpoint?: string | undefined;
    };
}, {
    body: {
        allow_endpoint?: string | undefined;
    };
}>;
//# sourceMappingURL=accesses.request.d.ts.map