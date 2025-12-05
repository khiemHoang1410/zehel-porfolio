// app/api/blocks/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Block from '@/models/Block';

// 1. Method GET: Lấy danh sách Blocks về để hiển thị
export async function GET() {
  try {
    await connectDB();
    // Lấy tất cả, sắp xếp theo thứ tự (order), cái nào visible thì mới lấy (hoặc lấy hết tuỳ logic admin)
    // Ở đây mình lấy hết để test đã nhé
    const blocks = await Block.find().sort({ order: 1 });
    
    return NextResponse.json(blocks);
  } catch (error) {
    return NextResponse.json({ message: 'Lỗi lấy data rồi ngài ơi', error }, { status: 500 });
  }
}

// 2. Method POST: Tạo Block mới (Dành cho Admin)
export async function POST(req: Request) {
  try {
    // Check mã bí mật ngay tại đây (Bảo vệ API)
    // Lấy cái key từ header gửi lên
    const secret = req.headers.get('x-admin-secret');
    
    if (secret !== process.env.ADMIN_SECRET) {
      return NextResponse.json({ message: 'Sai mật khẩu! Cút ra chỗ khác chơi.' }, { status: 401 });
    }

    const body = await req.json();
    await connectDB();

    const newBlock = await Block.create(body);
    
    return NextResponse.json({ message: 'Đã thêm block mới!', data: newBlock }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Lỗi tạo block', error }, { status: 500 });
  }
}