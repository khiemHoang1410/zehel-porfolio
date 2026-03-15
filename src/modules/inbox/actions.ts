'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/shared/lib/db';
import Message from '../core/models/Message';

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