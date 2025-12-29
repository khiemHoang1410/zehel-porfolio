'use client';

import { useState } from 'react';
import { Layers, Code2, Database, Terminal, Smartphone, Wrench, Star } from 'lucide-react';
// Import đại diện vài icon phổ biến từ react-icons (Ông cài gói: npm i react-icons)
import * as SiIcons from 'react-icons/si'; 
import * as FaIcons from 'react-icons/fa';

// 1. Mapping Level ra phần trăm để vẽ thanh Skill Bar
const getLevelWidth = (level: string) => {
    switch(level) {
        case 'beginner': return 'w-[25%] bg-gray-400';
        case 'intermediate': return 'w-[50%] bg-blue-500';
        case 'advanced': return 'w-[75%] bg-purple-500';
        case 'master': return 'w-[100%] bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.5)]';
        default: return 'w-[10%] bg-gray-200';
    }
};

// 2. Component hiển thị Icon động (Magic ở đây nè ✨)
const DynamicIcon = ({ name, color }: { name: string; color: string }) => {
    // Tìm icon trong thư viện dựa trên tên (VD: "SiReact" -> lấy component SiReact)
    // @ts-ignore
    const IconComponent = SiIcons[name] || FaIcons[name];

    if (!IconComponent) {
        // Fallback: Nếu không tìm thấy icon thì hiện chữ cái đầu
        return (
            <div className="w-10 h-10 rounded-lg border-2 border-black flex items-center justify-center font-black text-xl bg-white shadow-sm" style={{ color: color }}>
                {name.charAt(2)} 
            </div>
        );
    }
    return <IconComponent size={32} style={{ color: color }} />;
};

export default function TechArsenal({ techs }: { techs: any[] }) {
    const [activeTab, setActiveTab] = useState('all');

    // Lọc tech theo tab
    const filteredTechs = activeTab === 'all' 
        ? techs 
        : techs.filter(t => t.category === activeTab);

    // Danh sách tabs
    const categories = [
        { id: 'all', label: 'ALL', icon: Layers },
        { id: 'frontend', label: 'FRONTEND', icon: Code2 },
        { id: 'backend', label: 'BACKEND', icon: Terminal },
        { id: 'database', label: 'DATABASE', icon: Database },
        { id: 'mobile', label: 'MOBILE', icon: Smartphone },
        { id: 'tool', label: 'TOOLS', icon: Wrench },
    ];

    return (
        <section className="py-10">
            {/* HEADLINE */}
            <div className="mb-10 text-center">
                <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">
                    Kho Vũ Khí <span className="text-blue-600">Hạng Nặng</span>
                </h2>
                <p className="text-gray-500 font-medium">Những công nghệ tôi sử dụng để chinh phục thế giới ảo.</p>
            </div>

            {/* TABS CONTROL */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                {categories.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = activeTab === cat.id;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id)}
                            className={`
                                flex items-center gap-2 px-4 py-2 border-2 border-black font-bold uppercase transition-all
                                ${isActive 
                                    ? 'bg-black text-white shadow-[4px_4px_0px_0px_rgba(250,204,21,1)] -translate-y-1' 
                                    : 'bg-white text-black hover:bg-gray-100'
                                }
                            `}
                        >
                            <Icon size={16} /> {cat.label}
                        </button>
                    );
                })}
            </div>

            {/* TECH GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
                {filteredTechs.map((t: any) => (
                    <div 
                        key={t._id} 
                        className="group relative bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all"
                    >
                        {/* Featured Star */}
                        {t.isFeatured && (
                            <div className="absolute -top-3 -right-3 bg-yellow-400 border-2 border-black p-1.5 rounded-full z-10 animate-bounce">
                                <Star size={14} fill="black" />
                            </div>
                        )}

                        <div className="flex justify-between items-start mb-4">
                            {/* Icon Box */}
                            <div className="p-2 bg-gray-50 border-2 border-black rounded-lg group-hover:bg-yellow-50 transition-colors">
                                <DynamicIcon name={t.iconName} color={t.color} />
                            </div>
                            
                            {/* Category Badge */}
                            <span className="text-[10px] font-black uppercase border border-black px-2 py-0.5 rounded bg-gray-200">
                                {t.category}
                            </span>
                        </div>

                        {/* Name */}
                        <h3 className="text-xl font-black uppercase mb-1">{t.name}</h3>
                        
                        {/* Level Bar (RPG Style) */}
                        <div className="mt-4">
                            <div className="flex justify-between text-[10px] font-bold uppercase mb-1">
                                <span className="text-gray-500">Mastery</span>
                                <span style={{ color: t.color }}>{t.level}</span>
                            </div>
                            <div className="w-full h-3 border-2 border-black bg-gray-100 rounded-full overflow-hidden relative">
                                {/* Thanh progress */}
                                <div 
                                    className={`h-full absolute top-0 left-0 transition-all duration-1000 group-hover:animate-pulse ${getLevelWidth(t.level)}`}
                                ></div>
                                {/* Họa tiết sọc chéo cho đẹp */}
                                <div className="w-full h-full absolute top-0 left-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-30"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredTechs.length === 0 && (
                <div className="text-center py-20 text-gray-400 italic font-bold">
                    Chưa cập nhật tech cho mục này...
                </div>
            )}
        </section>
    );
}