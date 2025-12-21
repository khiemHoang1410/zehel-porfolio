// app/api/blocks/[id]/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/shared/lib/db';
import Block from '@/modules/core/models/Block';

// Kiểu dữ liệu cho params trong Next.js 15 phải là Promise
type Props = {
  params: Promise<{ id: string }>
}

// Xử lý XÓA (DELETE)
export async function DELETE(
  req: Request,
  { params }: Props // Nhận vào là Props
) {
  try {
    // 1. Check mã bí mật
    const secret = req.headers.get('x-admin-secret');
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ message: 'Không có cửa đâu sói ạ!' }, { status: 401 });
    }

    // 2. QUAN TRỌNG: Phải await params trước khi lấy ID
    const { id } = await params; 

    await connectDB();
    
    // Tìm và diệt
    const deletedBlock = await Block.findByIdAndDelete(id);

    if (!deletedBlock) {
      return NextResponse.json({ message: 'Không tìm thấy cái block này để xoá' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Đã tiễn vong thành công!' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Lỗi khi xoá', error }, { status: 500 });
  }
}

// Xử lý SỬA (PUT) - Sửa luôn cho đồng bộ
export async function PUT(
  req: Request,
  { params }: Props
) {
  try {
    const secret = req.headers.get('x-admin-secret');
    if (secret !== process.env.ADMIN_SECRET) {
        return NextResponse.json({ message: 'Sai mật khẩu!' }, { status: 401 });
    }

    const { id } = await params; // <--- Await ở đây nữa
    const body = await req.json();
    
    await connectDB();

    const updatedBlock = await Block.findByIdAndUpdate(id, body, { new: true });
    return NextResponse.json(updatedBlock, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Lỗi update', error }, { status: 500 });
  }
}