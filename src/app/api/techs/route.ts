// src/app/api/techs/route.ts
import { NextResponse } from 'next/server';
import connectDB from '@/shared/lib/db';
import Tech from '@/modules/core/models/Tech';

export async function GET() {
  await connectDB();
  const techs = await Tech.find().sort({ createdAt: 1 });
  return NextResponse.json(techs);
}

export async function POST(req: Request) {
  try {
    const secret = req.headers.get('x-admin-secret');
    if (secret !== process.env.ADMIN_SECRET) return NextResponse.json({}, { status: 401 });

    const body = await req.json();
    await connectDB();
    const newTech = await Tech.create(body);
    return NextResponse.json(newTech, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Lỗi tạo Tech' }, { status: 500 });
  }
}