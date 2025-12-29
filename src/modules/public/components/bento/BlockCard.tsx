// src/app/components/bento/BlockCard.tsx
import React from 'react';
import { MoveUpRight, Code2, Coffee, Github, Twitter, StickyNote, Hash } from 'lucide-react';
import { BlockType } from '@/types';

// Chỉ lấy những props cần thiết
type BlockCardProps = Pick<BlockType, 'title' | 'type' | 'content' | 'size' | 'color' | 'link'>;

const BlockCard = ({ title, type, content, size, color, link }: BlockCardProps) => {
  
  // 1. Config màu sắc & Icon xịn xò theo từng loại
  const getTheme = (type: string) => {
    switch (type) {
      case 'project': return { icon: <Code2 size={20} />, bgTag: 'bg-blue-100 text-blue-800' };
      case 'social': return { icon: <Twitter size={20} />, bgTag: 'bg-sky-100 text-sky-800' };
      case 'note': return { icon: <StickyNote size={20} />, bgTag: 'bg-yellow-100 text-yellow-800' };
      case 'snippet': return { icon: <Hash size={20} />, bgTag: 'bg-purple-100 text-purple-800' };
      case 'status': return { icon: <Coffee size={20} />, bgTag: 'bg-emerald-100 text-emerald-800' };
      default: return { icon: <Github size={20} />, bgTag: 'bg-gray-100 text-gray-800' };
    }
  };

  const theme = getTheme(type);

  // 2. Xử lý Grid Span (Độ rộng ô)
  const sizeClasses = {
    small: 'col-span-1 row-span-1',         // 1x1
    medium: 'col-span-1 md:col-span-2 row-span-1', // 2x1 (Ngang)
    large: 'col-span-1 md:col-span-2 row-span-2',  // 2x2 (Vuông to)
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        ${color} 
        relative group overflow-hidden h-full
        rounded-xl border-4 border-black 
        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
        transition-all duration-300 ease-out
        hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] 
        hover:-translate-y-1 hover:-translate-x-1
        flex flex-col
      `}
    >
      {/* --- HEADER: Icon & Tag --- */}
      <div className="p-5 flex justify-between items-start">
        <div className={`p-2.5 rounded-lg border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform group-hover:rotate-6`}>
          {theme.icon}
        </div>
        
        {/* Tag hiển thị loại (Project, Note...) */}
        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded border border-black/10 ${theme.bgTag}`}>
          {type}
        </span>
      </div>

      {/* --- BODY: Nội dung chính --- */}
      <div className="px-5 pb-5 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl font-black font-mono leading-none mb-3 uppercase tracking-tighter line-clamp-2 group-hover:underline decoration-4 decoration-black underline-offset-4">
            {title}
          </h3>
          {content && (
            <p className="text-sm font-medium text-gray-700 opacity-90 line-clamp-3 leading-relaxed">
              {content}
            </p>
          )}
        </div>

        {/* --- FOOTER: Link (Chỉ hiện khi hover hoặc size to) --- */}
        <div className="mt-4 flex items-center justify-end opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
           <span className="text-xs font-bold mr-1">XEM NGAY</span>
           <MoveUpRight size={16} />
        </div>
      </div>

      {/* --- DECORATION: Họa tiết nền mờ ảo --- */}
      <div className="absolute inset-0 opacity-5 pointer-events-none z-0 bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      {/* Hiệu ứng Shine khi hover */}
      <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[20deg] group-hover:animate-shine" />
    </div>
  );
};

export default BlockCard;