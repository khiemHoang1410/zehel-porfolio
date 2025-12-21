// src/app/components/ui/LoaderVisual.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Ghost, Cat, Bot, Rocket, Gamepad2 } from 'lucide-react';

interface LoaderVisualProps {
  targetProgress: number;
  duration: number;
  onComplete?: () => void;
}

export default function LoaderVisual({ targetProgress, duration, onComplete }: LoaderVisualProps) {
  return (
    <div 
      // 👇 SỬA Ở ĐÂY:
      // - Thay 'inset-0' (bị ảnh hưởng bởi thanh cuộn)
      // - Bằng 'top-0 left-0 w-screen h-screen' (luôn full màn hình vật lý, đè lên cả thanh cuộn)
      className="fixed top-0 left-0 w-screen h-screen z-[9999] flex flex-col items-center justify-center bg-[#f0f0f0] text-black overflow-hidden"
    >
      
      {/* 1. ANIMATION CON VẬT */}
      <div className="w-full max-w-md relative h-24 overflow-hidden mb-4">
        <motion.div
          className="absolute flex gap-8 items-end bottom-2"
          animate={{ x: ["-20%", "120%"] }} 
          transition={{ duration: 2.5, ease: "linear", repeat: Infinity }}
        >
          <Ghost size={32} className="text-purple-600 mb-2 animate-bounce" />
          <Cat size={28} className="text-orange-600 mb-1 animate-pulse" />
          <Bot size={30} className="text-blue-600 mb-2" />
          <Gamepad2 size={32} className="text-green-600 mb-1 rotate-12" />
          <Rocket size={34} className="text-red-600 rotate-45 mb-4" />
        </motion.div>
      </div>

      {/* 2. THANH LOADING */}
      <div className="w-72 h-8 border-4 border-black bg-white rounded-xl p-1 relative overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <motion.div 
          className="h-full rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
          initial={{ width: targetProgress === 100 ? "95%" : "0%" }}
          animate={{ width: `${targetProgress}%` }}
          transition={{ duration: duration, ease: "circOut" }}
          onAnimationComplete={onComplete}
        />
      </div>

      {/* 3. TEXT */}
      <motion.h2 
        className="mt-6 font-black font-mono text-xl uppercase tracking-widest text-black drop-shadow-sm"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        Loading...
      </motion.h2>
    </div>
  );
}