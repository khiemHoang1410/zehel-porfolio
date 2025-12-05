// app/components/ui/FloatingDock.tsx
import React from 'react';
import { Home, Code2, User, Coffee, LayoutGrid } from 'lucide-react';

interface DockProps {
  currentFilter: string;
  onFilterChange: (filter: string) => void;
}

const FloatingDock = ({ currentFilter, onFilterChange }: DockProps) => {
  const menuItems = [
    { id: 'all', icon: <LayoutGrid size={20} />, label: 'All' },
    { id: 'project', icon: <Code2 size={20} />, label: 'Projects' },
    { id: 'snippet', icon: <Code2 size={20} />, label: 'Snippets' }, // Dùng chung icon Code
    { id: 'social', icon: <User size={20} />, label: 'Social' },
    { id: 'note', icon: <Coffee size={20} />, label: 'Notes' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <div className="flex gap-2 bg-white border-4 border-black p-2 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onFilterChange(item.id)}
            className={`
              p-3 rounded-full border-2 transition-all duration-200
              ${currentFilter === item.id 
                ? 'bg-black text-white border-black scale-110 -translate-y-1' 
                : 'bg-transparent text-gray-500 border-transparent hover:bg-gray-200'}
            `}
            title={item.label}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FloatingDock;