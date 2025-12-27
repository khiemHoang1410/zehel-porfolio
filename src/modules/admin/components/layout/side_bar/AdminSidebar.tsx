import { LayoutDashboard, Box, Cpu, Briefcase, Mail } from 'lucide-react';
import SidebarItem from './SidebarItem';
import SidebarFooter from './SidebarFooter';

// 1. CHỈNH SỬA: Để icon vào một mảng riêng hoặc render trực tiếp bên dưới
// Không nên để Component vào object tĩnh ở ngoài nếu truyền trực tiếp qua Client Component
const MENU_DATA = [
  { label: 'Dashboard', Icon: LayoutDashboard, href: '/admin' },
  { label: 'Projects', Icon: Box, href: '/admin?tab=projects' },
  { label: 'Tech Stack', Icon: Cpu, href: '/admin?tab=techs' },
  { label: 'Experience', Icon: Briefcase, href: '/admin?tab=experience' },
  { label: 'Inbox', Icon: Mail, href: '/admin?tab=inbox' },
];

export default function AdminSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 flex-col bg-black text-white p-6 shadow-xl hidden md:flex border-r-4 border-yellow-400">
      {/* 1. Logo Brand */}
      <div className="mb-10 px-2">
        <h1 className="text-2xl font-black tracking-tighter text-yellow-400 uppercase">
          ZEHEL.<span className="text-white">OS</span>
        </h1>
        <p className="text-[10px] text-gray-500 font-mono mt-1 tracking-widest">
          V2.0 • MADNESS MODE
        </p>
      </div>

      {/* 2. Menu List */}
      <nav className="flex-1 space-y-2">
        {MENU_DATA.map((item) => (
          <SidebarItem
            key={item.label}
            label={item.label}
            href={item.href}
            // QUAN TRỌNG: Render Icon thành JSX element tại đây
            // Lúc này thứ truyền đi là "kết quả render" (một plain object), không phải "hàm"
            icon={<item.Icon size={20} />}
          />
        ))}
      </nav>

      {/* 3. Footer */}
      <SidebarFooter />
    </aside>
  );
}
