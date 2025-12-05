// app/page.tsx
import connectDB from '@/lib/db';
import Block, { IBlock } from '@/models/Block';
import BlockCard from '@/app/components/bento/BlockCard';

// Hàm lấy dữ liệu (Chạy trên Server)
async function getBlocks() {
  await connectDB();
  // Lấy hết block, sort theo order, chuyển sang plain object để tránh lỗi Next.js warning

  const blocks = await Block.find({ isVisible: true }).sort({ order: 1 }).lean();
  
  // Dữ liệu FAKE để test giao diện
  // const blocks = [
  //   { _id: '1', title: 'Spotify', type: 'social', content: 'Đang nghe: Nhạc Lofi chill', size: 'small', color: 'bg-green-400' },
  //   { _id: '2', title: 'Project X', type: 'project', content: 'Web app quản lý người yêu cũ', size: 'medium', color: 'bg-purple-400' },
  //   { _id: '3', title: 'Github', type: 'social', content: 'Follow tui đi', size: 'small', color: 'bg-gray-200', link: 'https://github.com' },
  //   { _id: '4', title: 'About Me', type: 'note', content: 'Sinh viên IT, thích code dạo, ghét bug.', size: 'large', color: 'bg-yellow-400' },
  // ];
  
  // Hack nhẹ: Chuyển _id và Date thành string để React không khóc thét
  return blocks.map((block: any) => ({
    ...block,
    _id: block._id.toString(),
    createdAt: block.createdAt?.toString(),
  }));
}

export default async function Home() {
  const blocks = await getBlocks();

  return (
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

      {/* Đây là cái lưới BENTO GRID thần thánh */}
      {blocks.length > 0 ? (
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[200px]">
          {blocks.map((block: any) => (
            <BlockCard
              key={block._id}
              title={block.title}
              type={block.type}
              content={block.content}
              size={block.size}
              color={block.color}
              link={block.link}
            />
          ))}
        </div>
      ) : (
        // Fallback khi chưa có data
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Chưa có gì hết trơn á!</h2>
          <p>Vào Database hoặc Admin thêm vài cục gạch đi ngài Zehel.</p>
        </div>
      )}

      <footer className="mt-20 text-center text-sm font-bold opacity-50">
        © 2025 Zehel. Built with Next.js & Caffeine.
      </footer>
    </main>
  );
}