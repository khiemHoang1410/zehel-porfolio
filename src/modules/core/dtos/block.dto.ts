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
        .max(100, "Tiêu đề tối đa 100 ký tự"),

    content: z.string().optional(),

    type: BlockTypeEnum,

    size: BlockSizeEnum,

    // Validate URL: Cho phép rỗng HOẶC phải là URL chuẩn
    link: z.string().url("Link phải đúng định dạng URL (http/https)").optional().or(z.literal('')),

    imageUrl: z.string().url("Link ảnh không hợp lệ").optional().or(z.literal('')),

    isVisible: z.boolean().default(true),
});

// 3. Schema Full (Dữ liệu từ DB trả về)
export const BlockSchema = CreateBlockSchema.extend({
    // ⚠️ QUAN TRỌNG: MongoDB trả về _id, ta phải khai báo _id để khớp dữ liệu
    _id: z.string(),

    order: z.number().int().default(0),

    // 🔥 FIX QUAN TRỌNG: Coerce Date
    // Tự động ép kiểu String (từ JSON/API) về Date Object để dùng trong JS
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
});

// 4. Schema Update Order (Cho Drag & Drop sau này)
export const UpdateBlockOrderSchema = z.array(
    z.object({
        id: z.string(),
        order: z.number(),
    })
);

// 5. Export Types tự động (Để dùng ở mọi nơi)
// Dùng cho Form Create
export type CreateBlockDTO = z.infer<typeof CreateBlockSchema>;

// Dùng cho React Props (Thay thế interface IBlock cũ)
export type IBlock = z.infer<typeof BlockSchema>; 
export type BlockDTO = IBlock; // Alias (tên gọi khác) nếu thích

// Dùng cho các biến check type
export type BlockType = z.infer<typeof BlockTypeEnum>; 
export type BlockSize = z.infer<typeof BlockSizeEnum>;