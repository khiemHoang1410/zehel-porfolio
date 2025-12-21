// src/app/components/lab/LabBoard.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Fingerprint, Layers, Terminal, ArrowUpRight, FolderOpen, AlertCircle } from 'lucide-react';
import BlockModal from '../../../../shared/components/ui/BlockModal';

export default function LabBoard({ blocks }: { blocks: any[] }) {
  const [activeTab, setActiveTab] = useState<'all' | 'project' | 'snippet'>('all');
  const [selectedBlock, setSelectedBlock] = useState<null | any>(null);

  const filteredBlocks = activeTab === 'all' 
    ? blocks 
    : blocks.filter(b => b.type === activeTab);

  // --- HÀM RENDER ICON THEO TYPE ---
  const getTypeIcon = (type: string) => {
    return type === 'project' ? <FolderOpen size={16} /> : <Terminal size={16} />;
  };

  return (
    <div className="min-h-screen bg-[#f0f0f0] text-black font-mono relative overflow-hidden">
        
      {/* BACKGROUND LƯỚI KỸ THUẬT (GRID) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10"
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        
        {/* 1. HEADER KIỂU BẢNG ĐIỀU KHIỂN */}
        <header className="mb-16 border-b-4 border-black pb-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold tracking-widest uppercase">System Online</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                        THE LAB<span className="text-4xl align-top">®</span>
                    </h1>
                    <p className="mt-2 text-lg font-bold text-gray-600 max-w-xl">
                        [CLASSIFIED] Khu vực lưu trữ các thí nghiệm, dự án dang dở và những đoạn mã điên rồ của Zehel.
                    </p>
                </div>

                {/* BỘ LỌC KIỂU CÔNG TẮC */}
                <div className="flex bg-white border-2 border-black p-1 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    {[
                        { id: 'all', label: 'ALL_DATA', icon: Layers },
                        { id: 'project', label: 'PROJECTS', icon: FolderOpen },
                        { id: 'snippet', label: 'SNIPPETS', icon: Terminal },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as any)}
                            className={`
                                flex items-center gap-2 px-4 py-2 text-sm font-bold uppercase transition-all
                                ${activeTab === tab.id 
                                    ? 'bg-black text-white' 
                                    : 'hover:bg-gray-200 text-gray-500'}
                            `}
                        >
                            <tab.icon size={16} />
                            <span className="hidden md:inline">{tab.label}</span>
                        </button>
                    ))}
                </div>
            </div>
        </header>

        {/* 2. DANH SÁCH BLOCK KIỂU HỒ SƠ KỸ THUẬT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-12">
            <AnimatePresence mode="popLayout">
                {filteredBlocks.map((block, index) => (
                    <motion.div
                        layout
                        key={block._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        onClick={() => setSelectedBlock(block)}
                        className="group relative cursor-pointer"
                    >
                        {/* DECORATION LINES */}
                        <div className="absolute -left-4 top-0 bottom-0 w-[2px] bg-gray-300 group-hover:bg-black transition-colors"></div>
                        <div className="absolute -left-4 top-4 w-4 h-[2px] bg-black"></div>

                        {/* CARD CONTENT - TỐI GIẢN NHƯNG CHẤT */}
                        <div className="pl-4">
                            {/* Meta Info */}
                            <div className="flex items-center gap-3 text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest group-hover:text-black transition-colors">
                                <span className="flex items-center gap-1">
                                    {getTypeIcon(block.type)}
                                    {block.type === 'project' ? 'PROJ_ID:' : 'SNIP_ID:'} {block._id.substring(0, 6)}
                                </span>
                                <span>—</span>
                                <span>{new Date(block.createdAt).toLocaleDateString('vi-VN')}</span>
                            </div>

                            {/* Title & Description */}
                            <div className="bg-white border-2 border-black p-6 shadow-[6px_6px_0px_0px_#e5e7eb] group-hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                                
                                {/* Label góc phải */}
                                <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold text-white border-l-2 border-b-2 border-black
                                    ${block.type === 'project' ? 'bg-blue-600' : 'bg-purple-600'}`}>
                                    {block.type}
                                </div>

                                <h3 className="text-2xl font-black uppercase mb-3 pr-12 group-hover:text-purple-700 transition-colors">
                                    {block.title}
                                </h3>
                                
                                <p className="text-sm font-medium text-gray-600 line-clamp-3 leading-relaxed border-l-2 border-gray-200 pl-3 mb-4 group-hover:border-black transition-colors">
                                    {block.content}
                                </p>

                                {/* Tech Stack Tags (Giả lập) */}
                                <div className="flex flex-wrap gap-2 mt-auto">
                                    {/* Nếu block có field tags thì render, ko thì hardcode vài cái demo */}
                                    {['React', 'NextJS', 'CrazyIdea'].map((tag) => (
                                        <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 bg-gray-100 border border-black">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Arrow Icon hiện ra khi hover */}
                                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                    <ArrowUpRight size={24} className="text-black" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>

        {/* EMPTY STATE */}
        {filteredBlocks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-32 border-4 border-dashed border-gray-300 bg-gray-50">
                <AlertCircle size={48} className="text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-gray-500 uppercase">No Data Found in Sector {activeTab.toUpperCase()}</h3>
                <p className="text-gray-400 text-sm mt-2">Try switching frequency or add more data.</p>
            </div>
        )}
      </div>

      {/* Modal giữ nguyên */}
      <BlockModal
        isOpen={!!selectedBlock}
        onClose={() => setSelectedBlock(null)}
        block={selectedBlock}
      />
    </div>
  );
}