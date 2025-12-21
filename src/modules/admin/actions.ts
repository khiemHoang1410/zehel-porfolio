'use server'; // 👈 Quan trọng: Code này chỉ chạy trên Server

import connectDB from '@/shared/lib/db';
import Block from '@/modules/core/models/Block'; // Import model cũ của ngài
import { CreateBlockSchema } from './dtos';
import { revalidatePath } from 'next/cache';

export async function createBlockAction(formData: FormData) {
  try {
    // 1. Chuyển FormData thành Object
    const rawData = Object.fromEntries(formData.entries());
    const payload = { 
        ...rawData, 
        isVisible: rawData.isVisible === 'on' // Checkbox trả về 'on' nếu tick
    };

    // 2. Validate bằng Zod
    const validated = CreateBlockSchema.safeParse(payload);
    
    if (!validated.success) {
      // Trả về lỗi chi tiết cho từng trường
      return { success: false, error: validated.error.flatten().fieldErrors };
    }

    // 3. Lưu vào DB
    await connectDB();
    await Block.create(validated.data);

    // 4. Refresh lại data (F5 ngầm)
    revalidatePath('/');      // Update trang chủ
    revalidatePath('/admin'); // Update trang admin
    
    return { success: true, message: '✅ Thêm Block thành công!' };
  } catch (error) {
    console.error(error);
    return { success: false, message: '❌ Lỗi hệ thống rồi đại vương ơi!' };
  }
}

export async function deleteBlockAction(prevState: any, id: string) {
    try {
        await connectDB();
        await Block.findByIdAndDelete(id);
        revalidatePath('/admin');
        return { success: true, message: 'Đã xóa thành công!' };
    } catch (error) {
        return { success: false, message: 'Lỗi xóa block' };
    }
}
