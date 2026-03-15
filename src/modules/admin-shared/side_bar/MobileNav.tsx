'use client';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function MobileNav() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="p-2 md:hidden">
                <Menu size={24} />
            </button>

            {/* Overlay & Menu Drawer */}
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setIsOpen(false)}>
                    <div className="absolute left-0 top-0 h-full w-64 bg-black p-4" onClick={e => e.stopPropagation()}>
                        <div className="flex justify-end mb-4">
                            <button onClick={() => setIsOpen(false)} className="text-white"><X /></button>
                        </div>
                        {/* Render lại nội dung Sidebar ở đây hoặc component hóa phần ruột sidebar để tái sử dụng */}
                        <div className="text-white text-center mt-10">Menu Mobile (Ngài tự làm đẹp nhé)</div>
                    </div>
                </div>
            )}
        </>
    );
}