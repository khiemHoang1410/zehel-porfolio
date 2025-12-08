// app/page.tsx
import connectDB from '@/lib/db';
import Block, { IBlock } from '@/models/Block';
import BlockCard from '@/app/components/bento/BlockCard';
import BentoGrid from './components/bento/BentoGrid';
import TeckStack from './components/ui/TeckStack';
import PageTransition from './components/ui/PageTransition';

import Tech from '@/models/Tech';
// Hàm lấy dữ liệu (Chạy trên Server)
async function getBlocks() {
  await connectDB();
  // Lấy hết block, sort theo order, chuyển sang plain object để tránh lỗi Next.js warning

  const blocks = await Block.find({ isVisible: true }).sort({ order: 1 }).lean();


  // Hack nhẹ: Chuyển _id và Date thành string để React không khóc thét
  return blocks.map((block: any) => ({
    ...block,
    _id: block._id.toString(),
    createdAt: block.createdAt?.toString(),
  }));
}

// Hàm lấy data Tech trên Server
async function getTechs() {
  await connectDB();
  const techs = await Tech.find().sort({ createdAt: 1 }).lean();
  // Serialize dữ liệu (biến _id và Date thành string) để truyền qua Client Component
  return techs.map((t: any) => ({
    ...t,
    _id: t._id.toString(),
    createdAt: t.createdAt?.toString(),
  }));
}

export default async function Home() {
  const blocks = await getBlocks();
  const techs = await getTechs();
  return (
    <PageTransition>

      <main className="min-h-screen bg-[#f0f0f0] p-4 md:p-8 font-sans text-black">
        {/* Header giới thiệu nhanh */}
        <header className="mb-12 max-w-2xl mx-auto text-center mt-10">
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">
            Zehel Portfolio
          </h1>
          <p className="text-lg md:text-xl font-medium text-gray-600 bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block rotate-1">
            IT Student. ADHD Brain. Coder "Hệ Tư Tưởng". 🤪
          </p>
        </header>

        <TeckStack techs={techs}/>
        {/* Gọi Component BentoGrid và truyền data vào */}
        {blocks.length > 0 ? (
          <BentoGrid blocks={blocks} />
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold">Chưa có gì hết trơn á!</h2>
            <p>Vào Admin thêm vài cục gạch đi ngài Zehel.</p>
          </div>
        )}

        <footer className="mt-20 text-center text-sm font-bold opacity-50">
          © 2025 Zehel. Built with Next.js & Caffeine.
        </footer>
      </main>
    </PageTransition>

  );
}