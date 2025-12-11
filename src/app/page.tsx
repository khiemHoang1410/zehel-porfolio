// app/page.tsx
import connectDB from '@/lib/db';
import Block from '@/models/Block';
import BlockCard from '@/app/components/bento/BlockCard';
import BentoGrid from './components/bento/BentoGrid';
import TeckStack from './components/ui/TeckStack';
import PageTransition from './components/ui/PageTransition';
import Marquee from './components/ui/Marquee'; // Import cái mới làm
import { ArrowRight, Terminal, Zap } from 'lucide-react';
import Tech from '@/models/Tech';

// --- PHẦN FETCH DATA GIỮ NGUYÊN ---
async function getBlocks() {
  await connectDB();
  const blocks = await Block.find({ isVisible: true }).sort({ order: 1 }).lean();
  return blocks.map((block: any) => ({
    ...block,
    _id: block._id.toString(),
    createdAt: block.createdAt?.toString(),
  }));
}

async function getTechs() {
  await connectDB();
  const techs = await Tech.find().sort({ createdAt: 1 }).lean();
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
      <main className="min-h-screen bg-[#f0f0f0] font-sans text-black selection:bg-yellow-300 selection:text-black">
        
        {/* 1. HERO SECTION: KHÔNG CANH GIỮA NỮA, CHIA 2 CỘT CHO NGẦU */}
        <section className="relative pt-20 pb-12 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Cột trái: Text giới thiệu */}
            <div className="space-y-6">
                <div className="inline-block bg-yellow-300 border-2 border-black px-3 py-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg]">
                    👋 Hi, I'm Zehel
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                    Code Like A <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Madness</span>
                </h1>
                
                <p className="text-lg md:text-xl font-medium text-gray-700 max-w-md border-l-4 border-black pl-4">
                    Sinh viên IT. Bộ não ADHD đầy ý tưởng điên rồ. Chuyên biến caffeine thành code (và đôi khi là bug). 🤪
                </p>

                <div className="flex gap-4">
                    <button className="flex items-center gap-2 bg-black text-white px-6 py-3 font-bold text-lg hover:bg-gray-800 transition-all hover:shadow-[4px_4px_0px_0px_#fbbf24] hover:-translate-y-1">
                        <Terminal size={20}/> View GitHub
                    </button>
                    <button className="flex items-center gap-2 bg-white text-black border-2 border-black px-6 py-3 font-bold text-lg hover:bg-yellow-100 transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1">
                        Contact Me <ArrowRight size={20}/>
                    </button>
                </div>
            </div>

            {/* Cột phải: Trang trí (Hoặc để ảnh avatar ngầu lòi vào đây) */}
            <div className="hidden md:flex justify-center relative">
                {/* Giả lập một cái khung code hoặc card profile */}
                <div className="w-80 h-96 bg-white border-4 border-black relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-3 flex flex-col items-center justify-center p-6">
                    <div className="absolute -top-6 -right-6 bg-red-500 text-white font-black px-4 py-2 border-2 border-black rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        AVAILABLE!
                    </div>
                    <Zap size={64} className="text-yellow-400 mb-4 fill-current"/>
                    <h3 className="text-2xl font-black text-center">FULLSTACK <br/> DEVELOPER</h3>
                    <p className="text-center mt-2 text-sm text-gray-500 font-mono">React • Next.js • Node</p>
                    <div className="mt-8 w-full h-2 bg-gray-200 rounded-full overflow-hidden border border-black">
                         <div className="h-full bg-green-500 w-[85%]"></div>
                    </div>
                    <p className="text-xs font-bold mt-1 text-right w-full">Power: 85%</p>
                </div>
            </div>
        </section>

        {/* 2. MARQUEE CHẠY CHẠY */}
        <div className="my-8 transform -rotate-1">
            <Marquee text="ZEHEL PORTFOLIO • EAT SLEEP CODE REPEAT • REACT NEXTJS NODEJS MONGODB • SẴN SÀNG LÀM VIỆC" />
        </div>

        {/* 3. TECH STACK (THE ARSENAL) */}
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-1 flex-1 bg-black"></div>
                <h2 className="text-3xl font-black uppercase tracking-widest bg-white px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                   Kho Đồ Nghề
                </h2>
                <div className="h-1 flex-1 bg-black"></div>
            </div>
            {/* Gọi Component TechStack cũ của ông */}
            <TeckStack techs={techs}/>
        </section>

        {/* 4. BENTO GRID (THE PLAYGROUND) */}
        <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto min-h-[500px]">
             <div className="mb-10 text-left">
                <h2 className="text-4xl md:text-5xl font-black inline-block relative z-10">
                    Dự Án Đã Làm
                    {/* Họa tiết gạch chân vàng */}
                    <span className="absolute bottom-1 left-0 w-full h-4 bg-yellow-300 -z-10 -rotate-1"></span>
                </h2>
                <p className="mt-2 text-gray-600 font-medium">Một vài thứ hay ho tôi đã build trong lúc mất ngủ.</p>
             </div>

            {blocks.length > 0 ? (
                <BentoGrid blocks={blocks} />
            ) : (
                <div className="border-4 border-dashed border-gray-400 rounded-xl p-12 text-center bg-gray-100">
                    <h2 className="text-2xl font-bold text-gray-500">Khu vực đang thi công 🚧</h2>
                    <p className="text-gray-400">Vào Admin thêm vài project đi Zehel ơi.</p>
                </div>
            )}
        </section>

        {/* 5. FOOTER */}
        <footer className="mt-20 border-t-4 border-black bg-white py-12 text-center">
            <h2 className="text-3xl font-black mb-6 uppercase">Let's Work Together!</h2>
            <p className="text-lg font-bold opacity-50">
            © 2025 Zehel. Built with ❤️ & ☕.
            </p>
        </footer>

      </main>
    </PageTransition>
  );
} 