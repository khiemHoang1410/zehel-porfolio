import { NextResponse } from 'next/server';
import connectDB from '@/shared/lib/db';
import Experience from '@/modules/core/models/Experience';

// GET: Lấy danh sách (Sắp xếp mới nhất lên đầu)
export async function GET() {
  await connectDB();
  const exps = await Experience.find().sort({ createdAt: -1 });
  return NextResponse.json(exps);
}

// POST: Thêm mới
export async function POST(req: Request) {
  try {
    const secret = req.headers.get('x-admin-secret');
    if (secret !== process.env.ADMIN_SECRET) return NextResponse.json({}, { status: 401 });

    const body = await req.json();
    await connectDB();
    const newExp = await Experience.create(body);
    return NextResponse.json(newExp, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi server' }, { status: 500 });
  }
}