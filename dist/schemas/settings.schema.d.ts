import { z } from 'zod';
export declare const createSettingSchema: z.ZodObject<{
    body: z.ZodObject<{
        slug: z.ZodString;
        key: z.ZodString;
        value: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        key: string;
        value: string;
        description?: string | undefined;
    }, {
        slug: string;
        key: string;
        value: string;
        description?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        slug: string;
        key: string;
        value: string;
        description?: string | undefined;
    };
}, {
    body: {
        slug: string;
        key: string;
        value: string;
        description?: string | undefined;
    };
}>;
export declare const updateSettingSchema: z.ZodObject<{
    body: z.ZodObject<{
        slug: z.ZodOptional<z.ZodString>;
        key: z.ZodOptional<z.ZodString>;
        value: z.ZodOptional<z.ZodString>;
        description: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        slug?: string | undefined;
        key?: string | undefined;
        value?: string | undefined;
        description?: string | undefined;
    }, {
        slug?: string | undefined;
        key?: string | undefined;
        value?: string | undefined;
        description?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        slug?: string | undefined;
        key?: string | undefined;
        value?: string | undefined;
        description?: string | undefined;
    };
}, {
    body: {
        slug?: string | undefined;
        key?: string | undefined;
        value?: string | undefined;
        description?: string | undefined;
    };
}>;
export declare const paginationQuerySchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodDefault<z.ZodOptional<z.ZodString>>;
        limit: z.ZodDefault<z.ZodOptional<z.ZodString>>;
    }, "strip", z.ZodTypeAny, {
        page: string;
        limit: string;
    }, {
        page?: string | undefined;
        limit?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        page: string;
        limit: string;
    };
}, {
    query: {
        page?: string | undefined;
        limit?: string | undefined;
    };
}>;
export declare const getBySlugKeySchema: z.ZodObject<{
    params: z.ZodObject<{
        slug: z.ZodString;
        key: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        slug: string;
        key: string;
    }, {
        slug: string;
        key: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        slug: string;
        key: string;
    };
}, {
    params: {
        slug: string;
        key: string;
    };
}>;
export type CreateSettingBody = z.infer<typeof createSettingSchema>['body'];
export type UpdateSettingBody = z.infer<typeof updateSettingSchema>['body'];
export type PaginationQuery = z.infer<typeof paginationQuerySchema>['query'];
export type GetBySlugKeyParams = z.infer<typeof getBySlugKeySchema>['params'];
//# sourceMappingURL=settings.schema.d.ts.map