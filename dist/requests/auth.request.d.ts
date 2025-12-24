import { z } from 'zod';
export declare const loginRequest: z.ZodObject<{
    body: z.ZodObject<{
        user_id: z.ZodString;
        hash: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        hash: string;
        user_id: string;
    }, {
        hash: string;
        user_id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        hash: string;
        user_id: string;
    };
}, {
    body: {
        hash: string;
        user_id: string;
    };
}>;
export declare const ssoLoginRequest: z.ZodObject<{
    body: z.ZodObject<{
        token: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        token: string;
    }, {
        token: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        token: string;
    };
}, {
    body: {
        token: string;
    };
}>;
//# sourceMappingURL=auth.request.d.ts.map