import React from 'react';
import { Terminal, ArrowRight, Zap } from 'lucide-react';
import Marquee from './components/Marquee';
import BentoGrid from './components/bento/BentoGrid';
import TechStack from './components/TechStack';
import PageTransition from '@/shared/components/ui/PageTransition';

interface PortfolioProps {
    data: {
        blocks: any[];
        techs: any[];
    };
}

export default function PortfolioPage({ data }: PortfolioProps) {
    const { blocks, techs } = data;

    return (
        <PageTransition>
            <main className="min-h-screen font-sans text-black selection:bg-yellow-300 selection:text-black pb-20">

                {/* 1. HERO SECTION */}
                <section className="relative pt-20 pb-12 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Cột trái: Text */}
                    <div className="space-y-6">
                        <div className="inline-block bg-yellow-300 border-2 border-black px-3 py-1 font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rotate-[-2deg]">
                            👋 Hi, I'm Zehel
                        </div>

                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
                            Code Like A <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Madness</span>
                        </h1>

                        <p className="text-lg md:text-xl font-medium text-gray-700 max-w-md border-l-4 border-black pl-4">
                            Sinh viên IT. Bộ não ADHD đầy ý tưởng điên rồ. Chuyên biến caffeine thành code. 🤪
                        </p>

                        <div className="flex gap-4">
                            <a href="https://github.com/khiemhoang1410" target="_blank" className="flex items-center gap-2 bg-black text-white px-6 py-3 font-bold text-lg hover:bg-gray-800 transition-all hover:shadow-[4px_4px_0px_0px_#fbbf24] hover:-translate-y-1">
                                <Terminal size={20} /> GitHub
                            </a>
                            <button className="flex items-center gap-2 bg-white text-black border-2 border-black px-6 py-3 font-bold text-lg hover:bg-yellow-100 transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1">
                                Contact Me <ArrowRight size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Cột phải: Trang trí */}
                    <div className="hidden md:flex justify-center relative">
                        <div className="w-80 h-96 bg-white border-4 border-black relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-3 flex flex-col items-center justify-center p-6">
                            <div className="absolute -top-6 -right-6 bg-red-500 text-white font-black px-4 py-2 border-2 border-black rotate-12 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                                OPEN TO WORK!
                            </div>
                            <Zap size={64} className="text-yellow-400 mb-4 fill-current" />
                            <h3 className="text-2xl font-black text-center">FULLSTACK <br /> DEVELOPER</h3>
                            <div className="mt-8 w-full h-2 bg-gray-200 rounded-full overflow-hidden border border-black">
                                <div className="h-full bg-green-500 w-[85%]"></div>
                            </div>
                            <p className="text-xs font-bold mt-1 text-right w-full">Power: 100%</p>
                        </div>
                    </div>
                </section>

                {/* 2. MARQUEE */}
                <div className="my-8 transform -rotate-1">
                    <Marquee text="ZEHEL PORTFOLIO • EAT SLEEP CODE REPEAT • NEXTJS 16 • TAILWIND 4 • MONGODB • SẴN SÀNG CHIẾN ĐẤU" />
                </div>

                {/* 3. TECH STACK */}
                <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-1 flex-1 bg-black"></div>
                        <h2 className="text-3xl font-black uppercase tracking-widest bg-white px-4 py-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            Kho Đồ Nghề
                        </h2>
                        <div className="h-1 flex-1 bg-black"></div>
                    </div>
                    {/* Nếu component TechStack chưa sửa xong import thì comment tạm lại nhé */}
                    <TechStack techs={techs} />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {techs.map((t: any) => (
                            <div key={t._id} className="border-2 border-black p-4 font-bold flex items-center gap-2 bg-white shadow-sm hover:-translate-y-1 transition-transform">
                                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: t.color }}></span>
                                {t.name}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 4. BENTO GRID */}
                <section className="py-12 px-4 md:px-8 max-w-7xl mx-auto min-h-[500px]">
                    <div className="mb-10 text-left">
                        <h2 className="text-4xl md:text-5xl font-black inline-block relative z-10">
                            Dự Án & Ghi Chú
                            <span className="absolute bottom-1 left-0 w-full h-4 bg-yellow-300 -z-10 -rotate-1"></span>
                        </h2>
                    </div>

                    {blocks.length > 0 ? (
                        <BentoGrid blocks={blocks} />
                    ) : (
                        <div className="border-4 border-dashed border-gray-400 rounded-xl p-12 text-center bg-gray-100">
                            <h2 className="text-2xl font-bold text-gray-500">Chưa có gì cả 🚧</h2>
                            <p className="text-gray-400">Vào Admin thêm vài project đi đại vương.</p>
                        </div>
                    )}
                </section>

            </main>
        </PageTransition>
    );
}