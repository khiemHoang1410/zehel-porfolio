// src/modules/admin/actions.ts
'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '@/shared/lib/db';
import Block from '@/modules/core/models/Block';
import { CreateBlockSchema } from '@/modules/core/dtos/block.dto';
import Tech from '../models/Tech';
import { CreateTechSchema } from './teck.dto';

// HẰNG SỐ CẤU HÌNH
// 10,000 là khoảng cách an toàn để sau này chèn 9,999 item vào giữa mà ko cần sửa lại DB
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


export async function deleteBlockAction(id: string) {
  try {
    await connectDB();

    // Xóa cứng (Hard Delete). 
    // PRO TIP: Các dự án lớn thường dùng "Soft Delete" (thêm field deletedAt: Date)
    // để có thể khôi phục lại khi lỡ tay. Nhưng MVP thì Hard Delete là OK.
    await Block.findByIdAndDelete(id);

    revalidatePath('/admin');
    revalidatePath('/');

    return { success: true, message: 'Đã xóa bay màu! 🗑️' };
  } catch (error) {
    console.error("Delete Error:", error); // Nhớ log lỗi ra để debug nhé
    return { success: false, message: 'Lỗi xóa Project.' };
  }
}


export async function createTechAction(data: any) {
  try {
    await connectDB();

    // 1. Validate
    const validatedFields = CreateTechSchema.safeParse(data);
    if (!validatedFields.success) {
      return {
        success: false,
        message: "Dữ liệu không hợp lệ!",
        errors: validatedFields.error.flatten().fieldErrors
      };
    }

    // 2. Lưu vào DB & Bắt lỗi trùng lặp
    try {
      await Tech.create(validatedFields.data);
    } catch (err: any) {
      if (err.code === 11000) {
        return { success: false, message: "Công nghệ này đã tồn tại rồi!" };
      }
      throw err; // Đẩy ra catch cha
    }

    revalidatePath('/admin');
    return { success: true, message: "Đã nạp đạn vào kho vũ khí! 🔫" };
  } catch (error) {
    console.error("CREATE_TECH_ERROR:", error);
    return { success: false, message: "Đã xảy ra lỗi hệ thống!" };
  }
}


export async function deleteTechAction(id: string) {
  try {
    if (!id) return { success: false, message: "ID không hợp lệ!" };

    await connectDB();
    const result = await Tech.findByIdAndDelete(id);

    if (!result) {
      return { success: false, message: "Không tìm thấy dữ liệu để xóa!" };
    }

    revalidatePath('/admin');
    return { success: true, message: "Đã gỡ bỏ công nghệ này! 🗑️" };
  } catch (error) {
    console.error("DELETE_TECH_ERROR:", error);
    return { success: false, message: "Không thể xóa, vui lòng thử lại sau!" };
  }
}
