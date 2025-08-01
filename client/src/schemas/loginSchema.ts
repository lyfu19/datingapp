import z from 'zod';

export const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
