// src/app/components/ui/PageTransition.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ghost, Cat, Bot, Rocket, Gamepad2 } from 'lucide-react';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  // State để kiểm soát: Chạy xong thanh loading -> Mới mở vòng tròn
  const [isFinished, setIsFinished] = useState(false);

  return (
    <div className="bg-[#f0f0f0] min-h-screen w-full relative">
      
      {/* 1. MÀN HÌNH "GIẢ" LOADING (Chạy nốt đoạn cuối) */}
      <AnimatePresence>
        {!isFinished && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f0f0f0] text-black"
            // Khi biến mất thì mờ dần nhẹ
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
             {/* 1.1. CON VẬT CHẠY (Giữ nguyên vị trí như loading.tsx) */}
            <div className="w-full max-w-md relative h-20 overflow-hidden mb-2">
                <motion.div
                className="absolute flex gap-8 items-end bottom-0"
                // Chạy tiếp 1 đoạn ngắn cho cảm giác liên tục
                animate={{ x: ["0%", "100%"] }} 
                transition={{ duration: 2, ease: "linear" }}
                >
                <Ghost size={32} className="text-black mb-2 animate-bounce" />
                <Cat size={28} className="text-black mb-1 animate-pulse" />
                <Bot size={30} className="text-black mb-2" />
                <Gamepad2 size={32} className="text-black mb-1 rotate-12" />
                <Rocket size={34} className="text-black rotate-45 mb-4" />
                </motion.div>
            </div>

            {/* 1.2. THANH LOADING (Chạy nốt 90% -> 100%) */}
            <div className="w-64 h-8 border-4 border-black bg-white rounded-lg p-1 relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <motion.div 
                className="h-full bg-black rounded-sm"
                initial={{ width: "90%" }} // Bắt đầu từ chỗ loading.tsx dừng lại
                animate={{ width: "100%" }} // Vụt lên 100%
                transition={{ 
                    duration: 0.4, // Chạy nhanh trong 0.4s
                    ease: "easeOut"
                }}
                onAnimationComplete={() => setIsFinished(true)} // Chạy xong thì báo hiệu để mở map
                />
            </div>

            <h2 className="mt-4 font-black font-mono text-lg uppercase tracking-widest">
                Sẵn sàng!
            </h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. NỘI DUNG CHÍNH (Chờ hiệu ứng Iris Wipe) */}
      <motion.div
        // Chỉ bắt đầu mở vòng tròn khi loading giả đã chạy xong (isFinished = true)
        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
        animate={isFinished ? { clipPath: 'circle(150% at 50% 50%)' } : { clipPath: 'circle(0% at 50% 50%)' }}
        transition={{ 
          duration: 1.2, 
          ease: [0.22, 1, 0.36, 1], // Custom Bezier vút bay
        }}
        className="min-h-screen w-full relative z-0"
      >
        {children}
      </motion.div>
    </div>
  );
}