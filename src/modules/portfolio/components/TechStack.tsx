// src/app/components/ui/TechStack.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { getIconComponent } from '@/shared/lib/iconMap';

// Định nghĩa kiểu dữ liệu nhận vào
type TechItem = {
  _id: string;
  name: string;
  iconName: string;
  color: string;
};

// Nhận techs từ props thay vì tự fetch
export default function TechStack({ techs }: { techs: TechItem[] }) {
  
  if (!techs || techs.length === 0) return null;

  // Nhân đôi mảng để chạy Marquee vô tận
  const marqueeTechs = [...techs, ...techs, ...techs]; 

  return (
    <div className="w-full flex justify-center py-10 overflow-hidden">
      <div className="flex w-full max-w-4xl items-center overflow-hidden rounded-full border-2 border-black/5 bg-white/30 backdrop-blur-md py-3 shadow-[0_8px_32px_rgba(0,0,0,0.05)] relative">
        
        {/* Mask Gradient */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-linear-to-r from-white/80 to-transparent z-10"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-linear-to-l from-white/80 to-transparent z-10"></div>

        <motion.div
          className="flex min-w-full shrink-0 items-center gap-12 px-4"
          animate={{ x: "-50%" }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {marqueeTechs.map((tech, index) => {
            const Icon = getIconComponent(tech.iconName);
            return (
              <div 
                key={`${tech._id}-${index}`} 
                className="group flex items-center gap-2 cursor-pointer relative"
              >
                <div className="relative">
                    <Icon 
                      className="w-8 h-8 transition-all duration-300 grayscale group-hover:grayscale-0 group-hover:scale-125 group-hover:drop-shadow-lg"
                      style={{ color: tech.color }}
                    />
                </div>
                <span className="text-sm font-bold font-mono text-black opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 absolute left-full ml-2 whitespace-nowrap bg-white border border-black px-2 py-0.5 rounded shadow-sm">
                  {tech.name}
                </span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}