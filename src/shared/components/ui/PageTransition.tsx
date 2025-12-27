// src/app/components/ui/PageTransition.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoaderVisual from './LoaderVisual'; // Import component xịn

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [isFinished, setIsFinished] = useState(false);

  return (
    <div className="bg-[#f0f0f0] min-h-screen w-full relative">
      
      {/* 1. MÀN HÌNH LOADING (Dùng chung component với file loading.tsx -> KHÔNG BAO GIỜ LỆCH) */}
      <AnimatePresence>
        {!isFinished && (
          <motion.div
            key="loader"
            className="fixed inset-0 z-100"
            exit={{ opacity: 0 }} // Fade out nhẹ khi xong
            transition={{ duration: 0.5 }}
          >
            <LoaderVisual 
                targetProgress={100} 
                duration={0.5} 
                onComplete={() => setIsFinished(true)} // Xong thì set state để mở màn
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. NỘI DUNG CHÍNH (Hiệu ứng Iris Wipe) */}
      <motion.div
        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
        animate={isFinished ? { clipPath: 'circle(150% at 50% 50%)' } : { clipPath: 'circle(0% at 50% 50%)' }}
        transition={{ 
          duration: 1.2, 
          ease: [0.22, 1, 0.36, 1],
        }}
        className="min-h-screen w-full relative z-0"
      >
        {children}
      </motion.div>
    </div>
  );
}