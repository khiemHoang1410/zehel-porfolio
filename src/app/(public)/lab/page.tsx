// src/app/lab/page.tsx
import React from 'react';
import connectDB from '@/shared/lib/db';
import Block from '@/modules/core/models/Block';
import LabBoard from '../../../modules/portfolio/components/lab/LabBoard'; // Component giao diện mình sẽ tạo ở bước 2
import PageTransition from '../../../shared/components/ui/PageTransition'; // Hiệu ứng chuyển trang cũ

async function getLabData() {
  await connectDB();
  // Chỉ lấy Project và Snippet
  const blocks = await Block.find({ 
    type: { $in: ['project', 'snippet'] } 
  }).sort({ createdAt: -1 }).lean();

  // Serialize dữ liệu (ép kiểu string cho _id và date)
  return blocks.map((b: any) => ({
    ...b,
    _id: b._id.toString(),
    createdAt: b.createdAt?.toString(),
  }));
}

export default async function LabPage() {
  const blocks = await getLabData();

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#f0f0f0] p-4 md:p-8 pb-32">
        <LabBoard blocks={blocks} />
      </main>
    </PageTransition>
  );
}