import { z } from 'zod';

export const postSchema = z.object({
  title: z.string().trim().min(3, 'Минимум 3 символа').max(100, 'Максимум 100 символов'),
  body: z.string().trim().min(10, 'Минимум 10 символов').max(500, 'Максимум 500 символов'),
});

export type PostFormValues = z.infer<typeof postSchema>;
