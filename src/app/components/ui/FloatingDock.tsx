// app/components/ui/FloatingDock.tsx
'use client'; // Nhớ cái này vì có dùng hooks

import React, { useRef, useState } from 'react';
import { Home, Code2, User, Coffee, LayoutGrid, Settings, FolderGit2, BookOpen, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
    motion,
    useMotionValue,
    useSpring,
    useTransform,
    MotionValue,
    AnimatePresence,
} from 'framer-motion';

interface DockProps {
    currentFilter: string;
    onFilterChange: (filter: string) => void;
}

// 1. Cấu hình độ nhạy của hiệu ứng
const CONFIG = {
    baseWidth: 40,      // Kích thước cơ bản
    hoverWidth: 80,     // Kích thước khi hover max
    distance: 150,      // Khoảng cách ảnh hưởng (chuột càng gần càng to)
    stiffness: 150,     // Độ cứng của lò xo (càng cao càng nảy)
    damping: 15,        // Độ hãm (để không bị rung quá đà)
};

export default function FloatingDock({ currentFilter, onFilterChange }: DockProps) {
    const router = useRouter();

    // 2. Tạo một biến motion để theo dõi vị trí chuột trên trục X
    const mouseX = useMotionValue(Infinity);

    const menuItems = [
        // 1. Home: Tổng quan
        { id: 'home', icon: Home, label: 'Home' },

        // 2. About: Ông là ai? (Thay icon User cũ ở social qua đây)
        { id: 'about', icon: User, label: 'About Me' },

        // 3. Projects: Sản phẩm
        { id: 'project', icon: FolderGit2, label: 'Projects' },

        // 4. Snippets: Kỹ năng code
        { id: 'snippet', icon: Code2, label: 'Code Snippets' },

        // 5. Notes: Viết lách (đổi icon Book nhìn tri thức hơn Coffee :v)
        { id: 'note', icon: BookOpen, label: 'Notes' },

        // 6. CV/Resume: "Tuyển em đi" (Quan trọng!)
        // Lưu ý: ID này có thể cần xử lý riêng để mở file PDF
        { id: 'resume', icon: FileText, label: 'Resume' },
        // { id: 'admin', icon: Settings, label: 'Admin Area' },
    ];


    const handleClick = (id: string) => {
        if (id === 'resume') {
            // Mở CV ở tab mới
            window.open('/path-to-your-cv.pdf', '_blank');
        } else if (id === 'admin') {
            // Logic ẩn (nếu ông vẫn muốn giữ nút admin nhưng chỉ hiện khi dev)
            // process.env.NODE_ENV === 'development' ? router.push('/admin') : null
        } else {
            onFilterChange(id);
        }
    };
    return (
        <div
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex h-16 items-end gap-4 rounded-full px-4 pb-3"
            // Khi chuột di vào vùng Dock, cập nhật vị trí chuột
            onMouseMove={(e) => mouseX.set(e.pageX)}
            // Khi chuột rời đi, reset về vô cực (để không icon nào bị to lên)
            onMouseLeave={() => mouseX.set(Infinity)}
        >
            {/* Container chính style Neo-brutalism */}
            <div className="mx-auto flex h-fit gap-4 rounded-full bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] items-end">
                {menuItems.map((item) => (
                    <DockIcon
                        key={item.id}
                        mouseX={mouseX}
                        {...item}
                        isActive={currentFilter === item.id}
                        onClick={() => handleClick(item.id)}
                    />
                ))}
            </div>
        </div>
    );
}

// --- Sub Component: Xử lý logic từng icon ---
interface IconProps {
    mouseX: MotionValue;
    id: string;
    icon: React.ElementType;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

function DockIcon({ mouseX, icon: Icon, label, isActive, onClick }: IconProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // 1. Logic chiều cao (giữ nguyên độ nảy)
  const heightSync = useTransform(distance, [-120, 0, 120], [45, 65, 45]);
  const height = useSpring(heightSync, { mass: 0.1, stiffness: 150, damping: 12 });
  
  // Icon scale
  const iconSize = useTransform(height, [45, 65], [20, 26]);

  return (
    <motion.button
      ref={ref}
      // ⚠️ QUAN TRỌNG: Đã BỎ prop 'layout' để tránh giật
      style={{ height }} 
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        relative flex items-center justify-center rounded-full transition-colors border
        ${isActive 
          ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-black' 
          : 'bg-zinc-50 text-zinc-500 border-transparent hover:bg-zinc-100 hover:border-zinc-200'}
        ${isHovered ? 'px-3' : 'aspect-square'} 
      `}
    >
      <motion.div 
        style={{ width: iconSize, height: iconSize }}
        className="flex items-center justify-center shrink-0"
      >
        <Icon className="w-full h-full" />
      </motion.div>

      {/* 2. Text Wrapper: Luôn render, chỉ animate width */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        animate={{ 
          width: isHovered ? "auto" : 0, 
          opacity: isHovered ? 1 : 0 
        }}
        transition={{ 
          // Dùng tween (chuyển động đều) thay vì spring để không bị rung
          type: "tween", 
          ease: "easeOut", 
          duration: 0.2 
        }}
        className="overflow-hidden whitespace-nowrap flex items-center"
      >
        {/* Padding nằm trong span để khi width=0 nó không bị lòi padding ra */}
        <span className="pl-2 text-sm font-medium">
          {label}
        </span>
      </motion.div>
    </motion.button>
  );
}