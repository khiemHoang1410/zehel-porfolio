// app/components/bento/BlockCard.tsx
import React from 'react';
import { MoveUpRight, Github, Code2, Coffee } from 'lucide-react';
import Link from 'next/link';

// Định nghĩa lại kiểu dữ liệu (tương tự cái Model bên Backend)
interface BlockProps {
  title: string;
  type: string;
  content?: string;
  size: 'small' | 'medium' | 'large';
  color: string;
  link: string | undefined | null; // Cho phép nhận null
  className?: string; // Để custom thêm nếu cần
}

const BlockCard = ({ title, type, content, size, color, link }: BlockProps) => {
  
  // Xử lý độ rộng của ô (Grid Column)
  const sizeClasses = {
    small: 'col-span-1 row-span-1',         // 1x1
    medium: 'col-span-1 md:col-span-2 row-span-1', // 2x1 (Trên mobile vẫn là 1 cột)
    large: 'col-span-1 md:col-span-2 row-span-2',  // 2x2
  };

  // Icon đại diện cho từng loại (Hard code tạm icon cho vui mắt)
  const renderIcon = () => {
    switch (type) {
      case 'project': return <Code2 size={24} />;
      case 'social': return <MoveUpRight size={24} />;
      case 'status': return <Coffee size={24} />;
      default: return <Code2 size={24} />;
    }
  };

  return (
    <div
      className={`
        ${sizeClasses[size]} 
        ${color} 
        relative group overflow-hidden
        rounded-xl border-4 border-black 
        shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
        transition-all duration-200 
        hover:translate-x-[2px] hover:translate-y-[2px] 
        hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
        p-6 flex flex-col justify-between
      `}
    >
      {/* Header của thẻ */}
      <div className="flex justify-between items-start mb-4">
        <div className="bg-white/20 p-2 rounded-lg border-2 border-black">
          {renderIcon()}
        </div>
        {link && (
          <Link href={link} target="_blank" className="p-1 hover:bg-black hover:text-white rounded-full transition-colors border-2 border-transparent hover:border-black">
             <MoveUpRight size={20} />
          </Link>
        )}
      </div>

      {/* Nội dung chính */}
      <div>
        <h3 className="text-xl font-bold font-mono mb-2 leading-tight uppercase">
          {title}
        </h3>
        {content && (
          <p className="text-sm font-medium opacity-90 line-clamp-3">
            {content}
          </p>
        )}
      </div>

      {/* Trang trí nền (Pattern chấm bi mờ mờ cho đỡ trống) */}
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <svg width="60" height="60" viewBox="0 0 100 100">
           <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
             <circle cx="2" cy="2" r="2" fill="currentColor"/>
           </pattern>
           <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
};

export default BlockCard;