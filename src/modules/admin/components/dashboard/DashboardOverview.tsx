// src/modules/admin/components/dashboard/DashboardOverview.tsx
'use client';

import { Box, Code2, Mail, ArrowUpRight, Plus, Activity } from 'lucide-react';
import Link from 'next/link';
import { IBlock } from '@/modules/core/dtos/block.dto';

interface OverviewProps {
    stats: {
        totalBlocks: number;
        totalTechs: number;
        totalMessages: number;
    };
    recentMessages: any[]; // Thay any bằng IMessage nếu có
    recentBlocks: IBlock[];
}

export default function  DashboardOverview({ stats, recentMessages, recentBlocks }: OverviewProps) {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">

            {/* 1. GREETING AREA */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b-2 border-black pb-6">
                <div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter">
                        welcome back, boss 👋
                    </h2>
                    <p className="text-gray-500 font-medium mt-1">
                        Hệ thống đang hoạt động bình thường. Hôm nay ngài muốn làm gì?
                    </p>
                </div>
                <div className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full border border-green-600">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-xs font-bold text-green-700 uppercase">System Online</span>
                </div>
            </div>

            {/* 2. STATS CARDS (Neo-Brutalism Style) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1: Blocks */}
                <div className="bg-yellow-300 border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-black text-white rounded-lg">
                            <Box size={24} />
                        </div>
                        <span className="text-xs font-black uppercase border border-black px-2 py-1 bg-white">Projects</span>
                    </div>
                    <div className="text-5xl font-black mb-1">{stats.totalBlocks}</div>
                    <div className="text-sm font-bold opacity-70">Block đang hiển thị</div>
                </div>

                {/* Card 2: Messages */}
                <div className="bg-blue-300 border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-black text-white rounded-lg">
                            <Mail size={24} />
                        </div>
                        <span className="text-xs font-black uppercase border border-black px-2 py-1 bg-white">Inbox</span>
                    </div>
                    <div className="text-5xl font-black mb-1">{stats.totalMessages}</div>
                    <div className="text-sm font-bold opacity-70">Tin nhắn liên hệ</div>
                </div>

                {/* Card 3: Techs */}
                <div className="bg-purple-300 border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-black text-white rounded-lg">
                            <Code2 size={24} />
                        </div>
                        <span className="text-xs font-black uppercase border border-black px-2 py-1 bg-white">Stack</span>
                    </div>
                    <div className="text-5xl font-black mb-1">{stats.totalTechs}</div>
                    <div className="text-sm font-bold opacity-70">Công nghệ đã học</div>
                </div>
            </div>

            {/* 3. LOWER SECTION: Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Recent Inbox (Chiếm 2/3) */}
                <div className="lg:col-span-2 border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-black text-xl uppercase flex items-center gap-2">
                            <Mail size={20} /> Tin nhắn mới nhất
                        </h3>
                        <Link href="/admin?tab=messages" className="text-xs font-bold underline hover:text-blue-600">
                            Xem tất cả
                        </Link>
                    </div>

                    <div className="space-y-4">
                        {recentMessages.length === 0 ? (
                            <div className="text-center py-8 text-gray-400 italic font-medium">Hòm thư trống trơn...</div>
                        ) : (
                            recentMessages.map((msg: any, idx) => (
                                <div key={idx} className="flex items-start gap-4 p-4 border border-gray-200 hover:bg-gray-50 transition-colors">
                                    <div className="h-10 w-10 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg">
                                        {msg.name?.charAt(0) || '?'}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between mb-1">
                                            <h4 className="font-bold text-sm">{msg.name}</h4>
                                            <span className="text-[10px] text-gray-500 font-mono">
                                                {new Date(msg.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 line-clamp-1">{msg.message}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Quick Actions (Chiếm 1/3) */}
                <div className="space-y-6">
                    {/* Quick Actions Panel */}
                    <div className="border-2 border-black bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h3 className="font-black text-xl uppercase mb-4 flex items-center gap-2">
                            <Activity size={20} /> Tác vụ nhanh
                        </h3>
                        <div className="space-y-3">
                            <Link href="/admin?tab=projects" className="flex items-center justify-between p-3 bg-zinc-100 hover:bg-yellow-300 hover:text-black hover:border-black border border-transparent transition-all font-bold group">
                                <span className="flex items-center gap-2"><Plus size={16} /> Thêm Dự Án Mới</span>
                                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                            <Link href="/admin?tab=techs" className="flex items-center justify-between p-3 bg-zinc-100 hover:bg-purple-300 hover:text-black hover:border-black border border-transparent transition-all font-bold group">
                                <span className="flex items-center gap-2"><Plus size={16} /> Thêm Tech Stack</span>
                                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </Link>
                        </div>
                    </div>

                    {/* Mini Project List */}
                    <div className="border-2 border-black bg-zinc-900 text-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <h3 className="font-black text-sm uppercase mb-4 text-gray-400">Dự án vừa update</h3>
                        <ul className="space-y-3">
                            {recentBlocks.slice(0, 3).map(block => (
                                <li key={block._id} className="text-sm font-bold flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${block.isVisible ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                    {block.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}