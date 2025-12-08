'use client'; // 👈 Quan trọng: Đánh dấu đây là Client Component

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import FloatingDock from './FloatingDock'; // Nhớ trỏ đúng đường dẫn file FloatingDock của ông

const DockWrapper = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Logic xác định tab nào đang sáng dựa trên URL
  const getActiveTab = () => {
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/about')) return 'about';
    if (pathname.startsWith('/projects')) return 'project';
    if (pathname.startsWith('/snippets')) return 'snippet';
    if (pathname.startsWith('/notes')) return 'note';
    return '';
  };

  // Logic điều hướng
  const handleDockClick = (id: string) => {
    const routes: Record<string, string> = {
      home: '/',
      about: '/about',
      project: '/projects',
      snippet: '/snippets',
      note: '/notes',
      resume: '/resume.pdf', // Ví dụ
    };

    if (routes[id]) {
      // Nếu là link ngoài hoặc file PDF thì mở tab mới
      if (id === 'resume') {
         window.open(routes[id], '_blank');
      } else {
         router.push(routes[id]);
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <FloatingDock 
        currentFilter={getActiveTab()} 
        onFilterChange={handleDockClick} 
      />
    </div>
  );
};

export default DockWrapper;