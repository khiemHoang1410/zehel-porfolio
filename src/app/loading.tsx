// src/app/loading.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Ghost, Cat, Bot, Rocket, Gamepad2 } from 'lucide-react';

export default function Loading() {
  return (
    // Nền màu xám sáng (trùng màu nền chính)
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#f0f0f0] text-black">
      
      {/* 1. KHU VỰC "CON GÌ ĐÓ CHẠY CHẠY" */}
      <div className="w-full max-w-md relative h-20 overflow-hidden mb-2">
        <motion.div
          className="absolute flex gap-8 items-end bottom-0"
          animate={{ x: ["-100%", "400%"] }} 
          transition={{ 
            duration: 3, // Chạy nhanh hơn xíu cho vui mắt
            ease: "linear", 
            repeat: Infinity 
          }}
        >
          {/* Đàn em chạy lon ton */}
          <Ghost size={32} className="text-black mb-2 animate-bounce" />
          <Cat size={28} className="text-black mb-1 animate-pulse" />
          <Bot size={30} className="text-black mb-2" />
          <Gamepad2 size={32} className="text-black mb-1 rotate-12" />
          <Rocket size={34} className="text-black rotate-45 mb-4" />
        </motion.div>
      </div>

      {/* 2. THANH LOADING (Tiến độ thực tế hơn) */}
      <div className="w-64 h-8 border-4 border-black bg-white rounded-lg p-1 relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <motion.div 
          className="h-full bg-black rounded-sm"
          initial={{ width: "0%" }}
          // 👇 QUAN TRỌNG: Chỉ chạy đến 95% thôi rồi dừng lại đợi Data
          animate={{ width: "95%" }} 
          transition={{ 
            duration: 8, // Giả định mạng chậm nhất là 8s
            ease: "circOut", // Chạy nhanh lúc đầu, chậm dần về sau (cảm giác rất thật)
          }}
        />
      </div>

      {/* 3. TEXT NHẤP NHÁY */}
      <h2 className="mt-4 font-black font-mono text-lg uppercase tracking-widest animate-pulse">
        Đang tải ...
      </h2>
    </div>
  );
}