// src/app/about/page.tsx
import React from 'react';
import Image from 'next/image';
import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import FloatingDock from '../../../shared/components/ui/FloatingDock';
import Timeline from '../../../shared/components/ui/Timeline';
import PageTransition from '../../../shared/components/ui/PageTransition';

export default function AboutPage() {
  return (
    <PageTransition>

      <main className="min-h-screen bg-[#f4f4f0] text-black font-sans selection:bg-black selection:text-white pb-32">
        {/* 1. HERO SECTION: Typography to bự */}
        <section className="px-6 pt-20 md:pt-32 max-w-6xl mx-auto">
          <h1 className="text-[12vw] md:text-[8rem] font-black leading-[0.8] tracking-tighter uppercase mb-8">
            Zehel<span className="text-gray-300">.</span>Dev
          </h1>
          <div className="border-t-4 border-black w-full my-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Cột trái: Giới thiệu ngắn */}
            <div className="md:col-span-2 space-y-6 text-xl md:text-2xl font-medium leading-relaxed">
              <p>
                Xin chào, tôi là <span className="font-black underline decoration-4 underline-offset-4">Zehel</span>.
                Một lập trình viên với cái đầu "bùng nổ" ý tưởng (và đôi khi là bug).
              </p>
              <p className="text-gray-600">
                Tôi không chỉ viết code, tôi kể chuyện qua những dòng lệnh.
                Thích sự hoàn hảo của Pixel, nghiện Clean Code và đam mê tạo ra những trải nghiệm Web "mượt như sunsilk".
              </p>

              {/* Stats vui vẻ */}
              <div className="grid grid-cols-3 gap-4 py-8">
                {[
                  { label: 'Kinh Nghiệm', value: '3+ Năm' },
                  { label: 'Dự Án', value: '20+' },
                  { label: 'Caffeine', value: '∞ Lít' }
                ].map((stat, idx) => (
                  <div key={idx} className="border-l-2 border-black pl-4">
                    <div className="font-black text-3xl">{stat.value}</div>
                    <div className="text-sm uppercase tracking-wider text-gray-500 font-bold">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cột phải: Ảnh chân dung (Placeholder nghệ thuật) */}
            <div className="relative group">
              <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-2xl"></div>
              <div className="relative bg-white border-4 border-black rounded-2xl overflow-hidden aspect-3/4 flex items-center justify-center group-hover:-translate-y-1 group-hover:-translate-x-1 transition-transform duration-300">
                {/* Thay src bằng ảnh thật của ngài sau này */}
                <Image
                  src="/globe.svg"
                  alt="Zehel Portrait"
                  width={200}
                  height={200}
                  className="opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 grayscale"
                />
                <span className="absolute font-black text-4xl uppercase opacity-10 -rotate-90">Portrait</span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. SKILLS MARQUEE: Chữ chạy chạy cho nó thời trang */}
        <div className="mt-24 border-y-4 border-black bg-white overflow-hidden py-4">
          <div className="animate-marquee whitespace-nowrap inline-flex gap-8 items-center">
            {/* Lặp lại 2 lần để chạy vô tận */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-8 text-4xl font-black uppercase text-transparent stroke-black tracking-tight" style={{ WebkitTextStroke: '1px black' }}>
                <span>ReactJS</span> ✦ <span>Next.js</span> ✦ <span>TypeScript</span> ✦ <span>Node.js</span> ✦ <span>Tailwind</span> ✦ <span>MongoDB</span> ✦ <span>Framer Motion</span> ✦
              </div>
            ))}
          </div>
        </div>

        {/* 3. CONNECT SECTION */}
        <section className="px-6 py-20 max-w-6xl mx-auto">
          <h2 className="text-4xl font-black uppercase mb-8 flex items-center gap-2">
            <span className="w-4 h-4 bg-black block"></span> Kết nối
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: 'Github', link: 'https://github.com', icon: <Github /> },
              { name: 'LinkedIn', link: 'https://linkedin.com', icon: <Linkedin /> },
              { name: 'Email', link: 'mailto:zehel@dev.com', icon: <Mail /> },
            ].map((item) => (
              <a
                key={item.name}
                href={item.link}
                target="_blank"
                className="flex items-center justify-between p-6 border-4 border-black bg-white hover:bg-black hover:text-white transition-all duration-300 group"
              >
                <span className="text-xl font-bold flex items-center gap-3">
                  {item.icon} {item.name}
                </span>
                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            ))}
          </div>
        </section>

        <Timeline />

      </main>
    </PageTransition>

  );
}