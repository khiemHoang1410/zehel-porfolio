'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/shared/lib/db';
import Block from '@/modules/core/models/Block';
import { CreateBlockSchema } from '../core/dtos/block.dto';

const ORDER_BUFFER = 10_000;

export async function createBlockAction(formData: FormData) {
    try {
        await connectDB();

        const rawData = {
            title: formData.get('title'),
            content: formData.get('content'),
            type: formData.get('type'),
            size: formData.get('size'),
            link: formData.get('link'),
            imageUrl: formData.get('imageUrl'),
            isVisible: formData.get('isVisible') === 'true',
        };

        const validated = CreateBlockSchema.safeParse(rawData);
        if (!validated.success) {
            return {
                success: false,
                message: 'Dữ liệu không hợp lệ',
                errors: validated.error.flatten().fieldErrors
            };
        }

        const lastBlock = await Block.findOne({})
            .sort({ order: -1 })
            .select('order')
            .lean();

        const newOrder = lastBlock ? (lastBlock.order + ORDER_BUFFER) : ORDER_BUFFER;

        await Block.create({
            ...validated.data,
            order: newOrder,
        });

        revalidatePath('/admin');
        revalidatePath('/');
        revalidatePath('/lab');

        return { success: true, message: `Đã thêm ${validated.data.type}` };
    } catch (error) {
        console.error("Create Block Error:", error);
        return { success: false, message: 'Lỗi Server: Không thể lưu.' };
    }
}

export async function deleteBlockAction(id: string) {
    try {
        await connectDB();
        await Block.findByIdAndDelete(id);
        revalidatePath('/admin');
        revalidatePath('/');
        return { success: true, message: 'Đã xóa bay màu! 🗑️' };
    } catch (error) {
        console.error("Delete Error:", error);
        return { success: false, message: 'Lỗi xóa Project.' };
    }
}