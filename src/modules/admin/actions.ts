'use server'; // 👈 Quan trọng: Code này chỉ chạy trên Server

import connectDB from '@/shared/lib/db';
import Block from '@/modules/core/models/Block'; // Import model cũ của ngài
import { CreateBlockSchema } from './dtos';
import { revalidatePath } from 'next/cache';
import Tech from '../core/models/Tech';
import Experience from '../core/models/Experience';

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


export async function createTechAction(formData: FormData) {
    try {
        await connectDB();
        const rawData = Object.fromEntries(formData.entries());
        // Lưu ý: Ngài nên tạo Zod Schema cho Tech để validate nhé (tôi làm tắt cho gọn)
        await Tech.create(rawData);
        
        revalidatePath('/admin');
        revalidatePath('/'); // Update trang chủ luôn
        return { success: true, message: 'Đã thêm Tech!' };
    } catch (error) {
        return { success: false, message: 'Lỗi thêm Tech' };
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
