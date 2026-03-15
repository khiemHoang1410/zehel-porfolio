'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/shared/lib/db';
import Tech from '../core/models/Tech';
import { CreateTechDTO, CreateTechSchema } from './tech.dto';

export async function createTechAction(data: CreateTechDTO) {
    try {
        await connectDB();
        const validatedFields = CreateTechSchema.safeParse(data);

        if (!validatedFields.success) {
            return {
                success: false,
                message: "Dữ liệu không hợp lệ!",
                errors: validatedFields.error.flatten().fieldErrors
            };
        }

        await Tech.create(validatedFields.data);
        revalidatePath('/admin');
        return { success: true, message: "Đã nạp đạn vào kho vũ khí! 🔫" };
    } catch (error) {
        console.error("Lỗi tạo Tech:", error);
        return { success: false, message: "Lỗi Server, không lưu được!" };
    }
}

export async function updateTechAction(id: string, data: CreateTechDTO) {
    try {
        await connectDB();
        const validatedFields = CreateTechSchema.safeParse(data);
        if (!validatedFields.success) {
            return {
                success: false,
                message: "Dữ liệu không hợp lệ! Check lại đi ngài Zehel ơi.",
                errors: validatedFields.error.flatten().fieldErrors,
            };
        }

        const updatedTech = await Tech.findByIdAndUpdate(
            id,
            { $set: validatedFields.data },
            { new: true, runValidators: true }
        );

        if (!updatedTech) {
            return { success: false, message: "Vũ khí này không tồn tại trong kho rồi! 🕵️‍♂️" };
        }

        revalidatePath('/admin');
        return {
            success: true,
            message: "Đã nâng cấp vũ khí thành công! 🛠️",
            data: JSON.parse(JSON.stringify(updatedTech))
        };
    } catch (error) {
        console.error("🔥 Lỗi UpdateTech:", error);
        return { success: false, message: "Server 'nổ tung' rồi, không update được!" };
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