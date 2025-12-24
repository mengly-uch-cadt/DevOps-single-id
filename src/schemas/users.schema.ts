import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(255),
    password: z.string().min(1).max(255),
    global_id: z.string().uuid().optional(),
  }),
});

export const updateUserSchema = z.object({
  body: z
    .object({
      name: z.string().min(1).max(255).optional(),
      password: z.string().min(1).max(255).optional(),
    })
    .refine((data) => data.name !== undefined || data.password !== undefined, {
      message: "name or password is required",
    }),
});

export const globalIdParamsSchema = z.object({
  params: z.object({
    global_id: z.string().uuid(),
  }),
});

export type CreateUserBody = z.infer<typeof createUserSchema>["body"];
export type UpdateUserBody = z.infer<typeof updateUserSchema>["body"];
