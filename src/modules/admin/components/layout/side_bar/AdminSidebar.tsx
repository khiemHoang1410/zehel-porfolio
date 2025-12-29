//src\modules\admin\components\layout\side_bar\AdminSidebar.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import { LayoutDashboard, Cpu, Briefcase, Mail } from 'lucide-react';
import SidebarItem from './SidebarItem';
import LogoutButton from './LogoutButton';
import { Suspense } from 'react'; // Cần cái này để tránh lỗi build khi dùng useSearchParams

const MENU_ITEMS = [
  { label: 'Projects', icon: LayoutDashboard, href: '/admin?tab=projects', slug: 'projects' },
  { label: 'Tech Stack', icon: Cpu, href: '/admin?tab=techs', slug: 'techs' },
  { label: 'Experience', icon: Briefcase, href: '/admin?tab=experience', slug: 'experience' },
  { label: 'Inbox', icon: Mail, href: '/admin?tab=messages', slug: 'messages' },
];

function AdminSidebarContent() {
  const searchParams = useSearchParams();
  // Lấy tab hiện tại, mặc định là projects
  const currentTab = searchParams.get('tab') || 'projects';

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 flex flex-col bg-black text-white p-6 shadow-xl hidden md:flex border-r-4 border-yellow-400">
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-black tracking-tighter text-yellow-400 uppercase">
            ZEHEL.<span className="text-white">OS</span>
        </h1>
        <p className="text-[10px] text-zinc-500 font-mono mt-1 tracking-widest">
            V2.0 • MADNESS MODE
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {MENU_ITEMS.map((item) => (
          <SidebarItem 
            key={item.label} 
            {...item} 
            // So sánh slug với currentTab để quyết định ai được sáng đèn
            isActive={currentTab === item.slug}
          />
        ))}
      </nav>

      <div className="mb-4 px-2 py-2 bg-zinc-900 rounded border border-zinc-800 text-[10px] font-mono text-zinc-400">
         <p>STATUS: OPERATIONAL</p>
         <p>DATE: {new Date().toLocaleDateString('vi-VN')}</p>
      </div>

      <div className="mt-auto border-t border-zinc-800 pt-6">
        <LogoutButton />
      </div>
    </aside>
  );
}

// Bọc Suspense vào để Next.js không la làng khi build
export default function AdminSidebar() {
  return (
    <Suspense fallback={<div className="w-64 bg-black h-screen"></div>}>
      <AdminSidebarContent />
    </Suspense>
  );
}