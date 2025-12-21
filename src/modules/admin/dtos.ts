import { z } from 'zod';

export const CreateBlockSchema = z.object({
  title: z.string().min(1, 'Tiêu đề là bắt buộc'),
  type: z.enum(['project', 'snippet', 'social', 'note', 'status']),
  content: z.string().optional(),
  link: z.string().url().optional().or(z.literal('')),
  size: z.enum(['small', 'medium', 'large']),
  color: z.string().default('bg-white'),
  isVisible: z.boolean().default(true),
});

export type CreateBlockDTO = z.infer<typeof CreateBlockSchema>;