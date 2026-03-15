'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/shared/lib/db';
import Experience from '../core/models/Experience';

export async function createExpAction(formData: FormData) {
    try {
        await connectDB();
        const rawData = Object.fromEntries(formData.entries());
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