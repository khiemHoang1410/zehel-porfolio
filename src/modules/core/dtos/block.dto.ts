// src/modules/core/dtos/block.dto.ts
import { z } from 'zod';

// 1. Định nghĩa Enum chuẩn
export const BlockTypeEnum = z.enum(['project', 'snippet', 'social', 'note']);
export const BlockSizeEnum = z.enum(['small', 'medium', 'large']);

// 2. Schema Create (Đầu vào từ Form)
export const CreateBlockSchema = z.object({
    title: z
        .string()
        .min(1, "Tiêu đề không được để trống")
        .max(100, "Tiêu đề tối đa 100 ký tự"), // Rõ ràng hơn

    content: z.string().optional(),

    type: BlockTypeEnum,

    size: BlockSizeEnum,

    // Nâng cấp: Validate URL chuẩn
    // Nếu rỗng thì OK, nếu có chữ thì phải là URL hợp lệ
    link: z.string().url("Link phải đúng định dạng URL (http/https)").optional().or(z.literal('')),

    imageUrl: z.string().url("Link ảnh không hợp lệ").optional().or(z.literal('')),

    isVisible: z.boolean().default(true),
});

// 3. Schema Full (Dữ liệu từ DB trả về)
export const BlockSchema = CreateBlockSchema.extend({
    // Mongoose trả về _id, nhưng Frontend thường thích dùng id.
    // Ta chấp nhận cả 2 hoặc transform
    id: z.string(),

    order: z.number().int(),

    // 🔥 FIX QUAN TRỌNG: Coerce Date
    // Cho phép nhận String (từ JSON) và tự ép kiểu về Date Object để dùng trong JS
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
});

// 4. Schema Update Order (Cho Drag & Drop)
export const UpdateBlockOrderSchema = z.array(
    z.object({
        id: z.string(),
        order: z.number(),
    })
);

// 5. Export Types tự động (Để dùng ở mọi nơi)
export type CreateBlockDTO = z.infer<typeof CreateBlockSchema>;
export type BlockDTO = z.infer<typeof BlockSchema>; // Dùng cái này cho React Component Props
export type BlockType = z.infer<typeof BlockTypeEnum>; // Dùng cho biến check type
export type BlockSize = z.infer<typeof BlockSizeEnum>; // Dùng cho biến check type