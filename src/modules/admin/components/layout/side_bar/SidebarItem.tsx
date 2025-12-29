//src\modules\admin\components\layout\side_bar\SidebarItem.tsx
'use client';

import Link from 'next/link';
import { LucideIcon } from 'lucide-react'; // Import Type cho chuẩn

interface SidebarItemProps {
    // SỬA: Nhận vào một Component (LucideIcon), không phải ReactNode
    icon: LucideIcon;
    label: string;
    href: string;
    // Props này nhận từ cha, không tự tính toán nữa
    isActive?: boolean;
}

// Destructuring đổi tên icon -> Icon (viết hoa) để React hiểu là Component
export default function SidebarItem({ icon: Icon, label, href, isActive }: SidebarItemProps) {

    // ĐÃ XÓA: const isActive = ... (Bỏ logic này đi vì mình dùng props từ cha)

    return (
        <Link
            href={href}
            aria-current={isActive ? 'page' : undefined}
            // Logic style giữ nguyên
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 font-bold transition-all hover:translate-x-1 ${isActive
                    ? "bg-yellow-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black"
                    : "text-gray-400 hover:text-white hover:bg-zinc-800"
                }`}
        >
            {/* SỬA: Render dưới dạng Component <Icon /> */}
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
            <span>{label}</span>
        </Link>
    );
}