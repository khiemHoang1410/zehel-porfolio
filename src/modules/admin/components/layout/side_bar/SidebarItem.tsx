'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'; // Import React để dùng ReactNode

interface SidebarItemProps {
    // THAY ĐỔI: Chuyển từ LucideIcon sang React.ReactNode
    icon: React.ReactNode;
    label: string;
    href: string;
}

export default function SidebarItem({ icon, label, href }: SidebarItemProps) {
    const pathname = usePathname();

    // Logic active giữ nguyên
    const isActive = href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-bold transition-all hover:translate-x-1 ${isActive
                    ? "bg-yellow-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black"
                    : "text-gray-400 hover:text-white hover:bg-zinc-800"
                }`}
        >
            {/* THAY ĐỔI: Render trực tiếp icon vì nó đã là một JSX Element (<LayoutDashboard size={20} />) */}
            {icon}
            <span>{label}</span>
        </Link>
    );
}
