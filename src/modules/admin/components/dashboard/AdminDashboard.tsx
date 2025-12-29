// src/modules/admin/components/dashboard/AdminDashboard.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { LayoutDashboard, Mail, Cpu, Briefcase } from 'lucide-react';
import ProjectManager from '../projects/ProjectManager';
import { IBlock } from '@/modules/core/dtos/block.dto';

interface DashboardProps {
    initialBlocks?: IBlock[]; // Thêm ? để an toàn
    initialTechs?: any[];
    initialMessages?: any[];
}

export default function AdminDashboard({
    initialBlocks = [],
    initialTechs = [],
    initialMessages = []
}: DashboardProps) {

    const searchParams = useSearchParams();
    const currentTab = searchParams.get('tab') || 'projects';

    const getPageTitle = () => {
        switch (currentTab) {
            case 'projects': return { title: 'Quản lý Dự Án / Blocks', icon: LayoutDashboard };
            case 'techs': return { title: 'Kho Vũ Khí (Tech Stack)', icon: Cpu };
            case 'messages': return { title: 'Hòm Thư Liên Hệ', icon: Mail };
            case 'experience': return { title: 'Hành Trình Sự Nghiệp', icon: Briefcase };
            default: return { title: 'Dashboard', icon: LayoutDashboard };
        }
    };

    const { title, icon: Icon } = getPageTitle();

    return (
        <div className="w-full h-full">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3 border-b-2 border-gray-200 pb-4">
                <div className="p-2 bg-black text-white rounded-lg shadow-lg">
                    <Icon size={24} />
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-gray-800">
                    {title}
                </h2>
            </div>

            {/* Content Area */}
            <div className="min-h-[500px]">
                {currentTab === 'projects' && (
                    // 👇 Gọi Manager, truyền data blocks vào
                    <ProjectManager initialData={initialBlocks} />
                )}

                {currentTab === 'techs' && (
                    <div className="p-10 border-4 border-dashed text-center text-gray-400">
                        Tech Stack Manager (Coming soon)
                    </div>
                )}

                {currentTab === 'messages' && (
                    <div className="p-10 border-4 border-dashed border-gray-300 text-center text-gray-400 rounded-xl">
                        <Mail size={48} className="mx-auto mb-2 opacity-50" />
                        <p>Inbox: {initialMessages.length} tin nhắn (Đang xây dựng...)</p>
                    </div>
                )}
            </div>
        </div>
    );
}