'use client';
import { useState } from 'react';
import { Layout, Mail, Cpu, Briefcase } from 'lucide-react';
import ProjectForm from '../projects/ProjectForm';
import { ProjectList } from '../projects/ProjectList'; // Lưu ý: ProjectList cần sửa lại thành Client Component hoặc accept props nếu muốn pass data từ đây
import TechsManager from '../TechsManager';
import InboxManager from '../InboxManager';
// import ExperiencesManager from './ExperiencesManager'; (Ngài tự tạo file này tương tự TechsManager nhé)

type TabType = 'blocks' | 'messages' | 'techs' | 'exp';

export default function AdminDashboard({ 
    messages, 
    techs, 
    // experiences 
}: { 
    messages: any[], 
    techs: any[], 
    // experiences: any[] 
}) {
    const [activeTab, setActiveTab] = useState<TabType>('blocks');

    const tabs = [
        { id: 'blocks', icon: Layout, label: 'Projects' },
        { id: 'messages', icon: Mail, label: `Inbox (${messages.length})` },
        { id: 'techs', icon: Cpu, label: 'Tech Stack' },
        { id: 'exp', icon: Briefcase, label: 'Experience' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8 text-black font-mono">
            <div className="max-w-6xl mx-auto">
                {/* Header & Menu */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    <h1 className="text-3xl font-black uppercase tracking-tighter">ZEHEL DASHBOARD</h1>
                    <div className="flex bg-white border-2 border-black rounded-lg overflow-hidden shadow-sm">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabType)}
                                className={`p-3 px-4 font-bold flex gap-2 items-center transition-colors ${
                                    activeTab === tab.id 
                                    ? 'bg-black text-white' 
                                    : 'hover:bg-gray-100 border-l border-black first:border-0'
                                }`}
                            >
                                <tab.icon size={18} /> {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div>
                    {activeTab === 'blocks' && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1"><ProjectForm /></div>
                            {/* ProjectList ngài có thể import trực tiếp vào đây vì nó tự fetch data riêng */}
                             {/* Hoặc nếu muốn đồng bộ, ngài chuyển ProjectList sang nhận props */}
                             <div className="lg:col-span-2">
                                {/* Tạm thời để text này, ngài import ProjectList vào là chạy */}
                                <div className="p-4 border-2 border-dashed border-gray-400 text-center">Load ProjectList Component Here</div>
                             </div>
                        </div>
                    )}

                    {activeTab === 'messages' && <InboxManager messages={messages} />}
                    
                    {activeTab === 'techs' && <TechsManager techs={techs} />}
                    
                    {activeTab === 'exp' && (
                        <div className="text-center">Khu vực Experience (Ngài Zehel tự code nốt nhé 😉)</div>
                    )}
                </div>
            </div>
        </div>
    );
}