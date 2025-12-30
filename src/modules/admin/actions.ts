'use server'; // 👈 Quan trọng: Code này chỉ chạy trên Server

import connectDB from '@/shared/lib/db';
import Block from '@/modules/core/models/Block'; // Import model cũ của ngài
import { CreateBlockSchema } from './dtos';
import { revalidatePath } from 'next/cache';
import Tech from '../core/models/Tech';
import Experience from '../core/models/Experience';
import Message from '../core/models/Message';
import { CreateTechDTO, CreateTechSchema } from '../core/dtos/teck.dto';


const ORDER_BUFFER = 10_000;

export async function createBlockAction(formData: FormData) {
    try {
        await connectDB();

        // 1. Convert FormData (Giữ nguyên của ngài - ổn rồi)
        const rawData = {
            title: formData.get('title'),
            content: formData.get('content'),
            type: formData.get('type'),
            size: formData.get('size'),
            link: formData.get('link'),
            imageUrl: formData.get('imageUrl'),
            isVisible: formData.get('isVisible') === 'true',
            // TODO: Sau này nên thêm field 'section' (vd: 'lab', 'social') để phân loại order
        };

        // 2. Validate
        const validated = CreateBlockSchema.safeParse(rawData);
        if (!validated.success) {
            return {
                success: false,
                message: 'Dữ liệu không hợp lệ',
                errors: validated.error.flatten().fieldErrors
            };
        }

        // 3. LOGIC ORDER "CHUẨN CÔNG NGHIỆP" (Thay cho countDocuments)
        // - Tìm block có order lớn nhất hiện tại
        // - .select('order'): Chỉ lấy trường order cho nhẹ
        // - .lean(): Trả về plain object cho nhanh (bỏ qua hydration của Mongoose)
        const lastBlock = await Block.findOne({}) // Nếu có scope thì thêm { section: '...' }
            .sort({ order: -1 }) // Sắp xếp giảm dần để lấy thằng to nhất
            .select('order')
            .lean();

        // - Nếu có lastBlock thì lấy order cũ + 10,000
        // - Nếu chưa có (bảng rỗng) thì bắt đầu từ 10,000
        const newOrder = lastBlock ? (lastBlock.order + ORDER_BUFFER) : ORDER_BUFFER;

        // 4. Create
        await Block.create({
            ...validated.data,
            order: newOrder,
        });

        // 5. Refresh (Chuẩn rồi)
        revalidatePath('/admin');
        revalidatePath('/');
        revalidatePath('/lab');

        return { success: true, message: 'Đã thêm Project mới! 🚀' };
    } catch (error) {
        console.error("Create Block Error:", error);
        // Lưu ý: Trong thực tế nên log error vào hệ thống monitoring (như Sentry)
        return { success: false, message: 'Lỗi Server: Không thể lưu.' };
    }
}

// --- DELETE ---
// Hàm này chỉ cần nhận ID là đủ
export async function deleteBlockAction(id: string) {
    try {
        await connectDB();

        await Block.findByIdAndDelete(id);

        revalidatePath('/admin');
        revalidatePath('/'); // Refresh cả trang chủ luôn cho chắc

        return { success: true, message: 'Đã xóa bay màu! 🗑️' };
    } catch (error) {
        console.error("Delete Error:", error);
        return { success: false, message: 'Lỗi xóa Project.' };
    }
}

export async function createTechAction(data: CreateTechDTO) {
    try {
        await connectDB();

        // 1. Validate dữ liệu Server-side (Dùng data trực tiếp, không cần parse từ FormData nữa)
        const validatedFields = CreateTechSchema.safeParse(data);

        if (!validatedFields.success) {
            return {
                success: false,
                message: "Dữ liệu không hợp lệ!",
                errors: validatedFields.error.flatten().fieldErrors
            };
        }

        // 2. Lưu vào DB
        await Tech.create(validatedFields.data);

        revalidatePath('/admin');
        return { success: true, message: "Đã nạp đạn vào kho vũ khí! 🔫" };
    } catch (error) {
        console.error("Lỗi tạo Tech:", error);
        return { success: false, message: "Lỗi Server, không lưu được!" };
    }
}


export async function deleteTechAction(id: string) {
    try {
        await connectDB();
        await Tech.findByIdAndDelete(id);
        revalidatePath('/admin');
        revalidatePath('/');
        return { success: true, message: 'Đã xóa Tech!' };
    } catch (error) {
        return { success: false, message: 'Lỗi xóa Tech' };
    }
}

// --- EXPERIENCE ACTIONS ---
export async function createExpAction(formData: FormData) {
    try {
        await connectDB();
        const rawData = Object.fromEntries(formData.entries());
        // Convert string tags "React, NextJS" -> Array ["React", "NextJS"]
        const tags = (rawData.tags as string).split(',').map(t => t.trim());

        await Experience.create({ ...rawData, tags });

        revalidatePath('/admin');
        return { success: true, message: 'Đã thêm Kinh nghiệm!' };
    } catch (error) {
        return { success: false, message: 'Lỗi thêm Exp' };
    }
}


export async function deleteExpAction(id: string) {
    try {
        await connectDB();
        await Experience.findByIdAndDelete(id);
        revalidatePath('/admin');
        revalidatePath('/');
        return { success: true, message: 'Đã xóa Exps!' };
    } catch (error) {
        return { success: false, message: 'Lỗi xóa Exps' };
    }
}


export async function deleteMessageAction(id: string) {
    try {
        await connectDB();
        await Message.findByIdAndDelete(id);
        revalidatePath('/admin');
        return { success: true, message: "Đã xóa tin nhắn thành công! 🗑️" };
    } catch (error) {
        return { success: false, message: "Lỗi Server, không xóa được!" };
    }
}

// 2. Đánh dấu đã đọc / chưa đọc
export async function toggleMessageReadStatusAction(id: string, currentStatus: boolean) {
    try {
        await connectDB();
        await Message.findByIdAndUpdate(id, { isRead: !currentStatus });
        revalidatePath('/admin');
        return { success: true, message: currentStatus ? "Đã đánh dấu chưa đọc" : "Đã xem ✔️" };
    } catch (error) {
        return { success: false, message: "Lỗi cập nhật trạng thái!" };
    }
}


export async function updateTechAction(id: string, data: CreateTechDTO) {
    try {
        // 1. Kết nối DB
        await connectDB();

        // 2. Validate dữ liệu - Có thể cân nhắc dùng .partial() nếu muốn update linh hoạt
        const validatedFields = CreateTechSchema.safeParse(data);
        if (!validatedFields.success) {
            return {
                success: false,
                message: "Dữ liệu không hợp lệ! Check lại đi ngài Zehel ơi.",
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        // 3. Thực hiện Update và check xem có tồn tại record không
        const updatedTech = await Tech.findByIdAndUpdate(
            id,
            { $set: validatedFields.data }, // Dùng $set cho nó tường minh
            { new: true, runValidators: true } // runValidators để nó check cả schema bên Mongoose
        );

        if (!updatedTech) {
            return { success: false, message: "Vũ khí này không tồn tại trong kho rồi! 🕵️‍♂️" };
        }

        // 4. Reset cache để UI cập nhật ngay lập tức
        revalidatePath('/admin');

        return {
            success: true,
            message: "Đã nâng cấp vũ khí thành công! Sức mạnh đã được tăng cường. 🛠️",
            data: JSON.parse(JSON.stringify(updatedTech)) // Trả về data mới nếu cần dùng ở UI
        };

    } catch (error) {
        console.error("🔥 Lỗi UpdateTech:", error);
        return { success: false, message: "Server 'nổ tung' rồi, không update được ngài ạ!" };
    }
}