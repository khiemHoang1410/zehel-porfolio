// src/app/components/ui/Marquee.tsx
import React from 'react';

export default function Marquee({ text }: { text: string }) {
  return (
    <div className="w-full bg-black text-yellow-300 border-y-4 border-black py-3 overflow-hidden whitespace-nowrap relative">
      <div className="inline-block animate-marquee font-black font-mono text-xl uppercase tracking-widest">
        {/* Lặp lại text nhiều lần để nó chạy liên tục */}
        <span className="mx-4">{text}</span>
        <span className="mx-4">✦</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">✦</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">✦</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">✦</span>
        <span className="mx-4">{text}</span>
        <span className="mx-4">✦</span>
        <span className="mx-4">{text}</span>
      </div>
    </div>
  );
}