// src/app/components/ui/FloatingDock.tsx
'use client';

import React, { useRef, useState } from 'react';
import { Home, FlaskConical, User, Coffee } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
  AnimatePresence,
} from 'framer-motion';

// --- 1. CONFIG: Cấu hình độ nảy ở đây ---
const CONFIG = {
  distance: 140, // Khoảng cách chuột bắt đầu ảnh hưởng
  baseSize: 50,  // Kích thước bình thường
  hoverSize: 90, // Kích thước khi hover max
  stiffness: 150, // Độ cứng lò xo
  damping: 15,    // Độ nảy
};

interface DockProps {
  currentFilter?: string;
  onFilterChange?: (filter: string) => void;
}

export default function FloatingDock({ currentFilter, onFilterChange }: DockProps) {
  const pathname = usePathname();
  const router = useRouter();

  // 🔑 KEY: Phải có cái này để track chuột
  const mouseX = useMotionValue(Infinity);

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home', href: '/' },
    { id: 'lab', icon: FlaskConical, label: 'The Lab', href: '/lab' },
    // 👇 Update: Bỏ filter, gán href cứng
    { id: 'note', icon: Coffee, label: 'Notes', href: '/note' },
    { id: 'about', icon: User, label: 'About', href: '/about' },
  ];

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex h-24 items-end gap-4 px-4 pb-3"
      onMouseMove={(e) => mouseX.set(e.pageX)} // 👈 Bắt buộc: Cập nhật vị trí chuột
      onMouseLeave={() => mouseX.set(Infinity)} // 👈 Bắt buộc: Reset khi chuột ra ngoài
    >
      {/* Container nền trắng viền đen */}
      <div className="mx-auto flex h-fit gap-3 rounded-2xl bg-white/90 backdrop-blur-md border-4 border-black p-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] items-end transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {menuItems.map((item) => {
          // Logic Active
          const isActive = pathname === item.href;

          return (
            <DockIcon
              key={item.id}
              mouseX={mouseX}
              {...item}
              isActive={isActive || false}
              // 👇 Logic Click xử lý riêng cho Note
              onClick={() => {
                if (item.id === 'note') {
                  if (pathname !== '/') {
                    window.location.href = '/?filter=note';
                  } else {
                    onFilterChange?.('note');
                  }
                }
              }
              }
            />
          )
        })}
      </div>
    </div>
  );
}

// --- 2. SUB COMPONENT: QUAN TRỌNG NHẤT ---
// Đây là nơi phép thuật xảy ra (Kết hợp Animation + Link)

interface IconProps {
  mouseX: MotionValue;
  id: string;
  icon: React.ElementType;
  label: string;
  href: string | null;
  isActive: boolean;
  onClick?: () => void;
}

function DockIcon({ mouseX, icon: Icon, label, href, isActive, onClick }: IconProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setHovered] = useState(false);

  // --- Logic Toán học cho hiệu ứng phóng to ---
  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-CONFIG.distance, 0, CONFIG.distance], [CONFIG.baseSize, CONFIG.hoverSize, CONFIG.baseSize]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: CONFIG.stiffness, damping: CONFIG.damping });

  // --- Logic Render nội dung bên trong ---
  // Dù là Link hay Button thì giao diện bên trong giống hệt nhau
  const InnerContent = (
    <>
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <Icon className={`w-1/2 h-1/2 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-black'}`} />
      </div>

      {/* Label hiện ra khi hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-black px-2 py-1 text-xs font-bold text-white border-2 border-transparent shadow-lg z-20"
          >
            {label}
            {/* Mũi tên nhỏ trỏ xuống */}
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <motion.div
      ref={ref}
      style={{ width, height: width }} // Hình vuông, width = height = biến đổi theo chuột
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`
        group relative flex aspect-square items-center justify-center rounded-xl border-2 cursor-pointer
        ${isActive
          ? 'bg-black border-black shadow-none' // Active: Đen ngầu
          : 'bg-transparent border-transparent hover:bg-gray-100 hover:border-gray-200'} // Inactive: Trong suốt
      `}
    >
      {/* 👇 ĐOẠN NÀY LÀ CHỖ FIX LOGIC CLICK: 
         Nếu có href -> Dùng Link bọc lấy nội dung
         Nếu không -> Dùng div thường + onClick
      */}
      {href ? (
        <Link href={href} className="flex items-center justify-center w-full h-full">
          {InnerContent}
        </Link>
      ) : (
        <div onClick={onClick} className="flex items-center justify-center w-full h-full">
          {InnerContent}
        </div>
      )}
    </motion.div>
  );
}