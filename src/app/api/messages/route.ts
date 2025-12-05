// app/api/messages/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Message from '@/models/Message';

export async function POST(req: Request) {
  try {
    console.log("🔍 1. Bắt đầu nhận request..."); 
    
    // Bước 1: Nhận dữ liệu
    const body = await req.json();
    console.log("📦 2. Body nhận được:", body); 

    // Bước 2: Validate
    if (!body.name || !body.email || !body.content) {
      console.log("⚠️ Lỗi: Thiếu thông tin input");
      return NextResponse.json({ message: 'Nhập thiếu thông tin rồi bạn ơi!' }, { status: 400 });
    }

    // Bước 3: Kết nối DB
    console.log("🔌 3. Đang kết nối DB...");
    await connectDB();
    console.log("✅ 4. Kết nối DB thành công!");
    
    // Bước 4: Lưu vào DB
    console.log("💾 5. Đang lưu vào MongoDB...");
    const newMessage = await Message.create(body);
    console.log("🎉 6. Lưu thành công:", newMessage);

    return NextResponse.json({ message: 'Đã gửi tin nhắn thành công!' }, { status: 201 });
  } catch (error: any) {
    // In lỗi chi tiết ra Terminal để ngài đọc
    console.error("❌ LỖI TOANG RỒI:", error); 
    return NextResponse.json({ message: 'Lỗi server', error: error.message }, { status: 500 });
  }
}

// Giữ nguyên phần GET ở dưới (nếu có)
export async function GET(req: Request) {
    // ... code cũ ...
    try {
        await connectDB();
        const messages = await Message.find().sort({ createdAt: -1 });
        return NextResponse.json(messages);
    } catch (error) {
        return NextResponse.json({ error: 'Lỗi lấy tin' }, { status: 500 });
    }
}