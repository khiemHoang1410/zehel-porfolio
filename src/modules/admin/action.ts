'use server';

import connectDB from '@/shared/lib/db';
import Block from '@/modules/core/models/Block'; // Model chuyển về modules/core
import { CreateBlockSchema } from './dtos';
import { revalidatePath } from 'next/cache';

export async function createBlockAction(formData: FormData) {
  try {
    // 1. Convert FormData to Object
    const rawData = Object.fromEntries(formData.entries());
    const payload = { ...rawData, isVisible: rawData.isVisible === 'on' };

    // 2. Validate
    const validated = CreateBlockSchema.safeParse(payload);
    if (!validated.success) {
      return { success: false, error: validated.error.flatten().fieldErrors };
    }

    // 3. Execute DB Logic
    await connectDB();
    await Block.create(validated.data);

    // 4. Clear Cache
    revalidatePath('/');
    revalidatePath('/admin');
    
    return { success: true, message: 'Tạo Block thành công!' };
  } catch (error) {
    console.error(error);
    return { success: false, message: 'Lỗi hệ thống' };
  }
}