import z from 'zod';

export const registerSchema = z.object({
  displayName: z.string().nonempty('Display name is required'),
  email: z.email('Invalid email address'),
  password: z.string().min(4, 'Password must be at least 4 characters'),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
