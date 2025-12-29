import { z } from 'zod';

export const TECH_CATEGORIES = ['frontend', 'backend', 'database', 'devops', 'mobile', 'tool'] as const;
export const TECH_LEVELS = ['beginner', 'intermediate', 'advanced', 'master'] as const;

// 1. Schema dùng để Validate khi tạo mới
export const CreateTechSchema = z.object({
    name: z.string().trim().min(1, "Tên không được trống"),
    iconName: z.string().trim().min(1, "Icon name không được trống"),
    color: z.string().regex(/^#([0-9A-F]{3,4}){1,2}$/i, "Màu phải là mã HEX hợp lệ"),

    category: z.enum(TECH_CATEGORIES),
    level: z.enum(TECH_LEVELS),
    isFeatured: z.boolean(),
});

// 2. Schema dùng để Validate khi cập nhật (Cho phép update lẻ từng trường)
export const UpdateTechSchema = CreateTechSchema.partial();

// 3. Types rút trích từ Zod
export type UpdateTechInput = z.infer<typeof UpdateTechSchema>;
export type CreateTechDTO = z.infer<typeof CreateTechSchema>;
// 4. Interface hiển thị (Sử dụng cho Frontend/Client)
export interface ITech {
    _id: string;
    name: string;
    iconName: string;
    color: string;
    category: typeof TECH_CATEGORIES[number];
    level: typeof TECH_LEVELS[number];
    isFeatured: boolean;
    createdAt: string; 
    updatedAt: string;
}
