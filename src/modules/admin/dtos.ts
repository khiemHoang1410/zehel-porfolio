import { z } from 'zod';

// Validate dữ liệu đầu vào chặt chẽ
export const CreateBlockSchema = z.object({
  title: z.string().min(1, 'Tiêu đề không được để trống'),
  type: z.enum(['project', 'snippet', 'social', 'note', 'status']),
  content: z.string().default(''), // Thay vì optional, hãy để mặc định là chuỗi rỗng
  link: z.string().optional().or(z.literal('')),
  size: z.enum(['small', 'medium', 'large']),
  color: z.string().default('bg-white'),
  isVisible: z.boolean().default(true),
});


// Tạo type TS từ Schema trên (đỡ phải viết interface thủ công)
export type CreateBlockDTO = z.input<typeof CreateBlockSchema>; // Dùng z.input thay vì z.infer
