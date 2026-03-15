// src/modules/admin/components/mail/MessageItem.tsx
'use client';

import { useState, useTransition } from 'react';
import { Trash2, MailOpen, Mail, Clock, User, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { deleteMessageAction, toggleMessageReadStatusAction } from '@/modules/admin/actions';

interface MessageItemProps {
    msg: any; // Dùng IMessage nếu có type chuẩn
}

export default function MessageItem({ msg }: MessageItemProps) {
    const [isPending, startTransition] = useTransition();
    const [isExpanded, setIsExpanded] = useState(false); // State mở rộng nội dung

    // Xử lý xóa
    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation(); // Chặn sự kiện click lan ra ngoài (để không bị mở rộng item khi bấm xóa)
        if (!confirm('Xóa vĩnh viễn tin nhắn này?')) return;

        startTransition(async () => {
            const res = await deleteMessageAction(msg._id);
            res.success ? toast.success(res.message) : toast.error(res.message);
        });
    };

    // Xử lý đánh dấu đã đọc
    const handleToggleRead = (e: React.MouseEvent) => {
        e.stopPropagation();
        startTransition(async () => {
            const res = await toggleMessageReadStatusAction(msg._id, msg.isRead);
            if (res.success) toast.success(res.message);
        });
    };

    return (
        <div 
            onClick={() => setIsExpanded(!isExpanded)}
            className={`
                group relative bg-white border-2 border-black p-5 
                shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                transition-all cursor-pointer select-none
                ${msg.isRead ? 'opacity-90' : 'bg-blue-50/50'} 
                ${isPending ? 'opacity-50 pointer-events-none' : ''}
            `}
        >
            {/* Dải màu đánh dấu chưa đọc */}
            {!msg.isRead && (
                <div className="absolute top-0 left-0 bottom-0 w-2 bg-blue-600 animate-pulse"></div>
            )}

            {/* HEADER: Tên + Email + Thời gian */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-3 pl-3">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <User size={18} className="text-black" />
                        <h3 className={`text-lg font-black uppercase truncate ${!msg.isRead ? 'text-blue-700' : 'text-gray-800'}`}>
                            {msg.name}
                        </h3>
                        {!msg.isRead && (
                            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 font-bold border border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                NEW
                            </span>
                        )}
                    </div>
                    <p className="text-sm font-mono text-gray-500 font-bold ml-6 truncate">{msg.email}</p>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 bg-gray-100 px-2 py-1 border border-black rounded">
                    <Clock size={12} />
                    {new Date(msg.createdAt).toLocaleDateString('vi-VN')}
                </div>
            </div>

            {/* CONTENT: Preview hoặc Full */}
            <div className={`pl-3 pr-2 text-gray-800 font-medium leading-relaxed border-l-2 border-gray-200 ml-1 ${isExpanded ? '' : 'line-clamp-2'}`}>
                {msg.content}
            </div>

            {/* ACTION BAR: Chỉ hiện khi Hover hoặc khi Expanded */}
            <div className={`flex justify-end items-center gap-3 mt-4 pt-4 border-t border-dashed border-gray-300 ${isExpanded ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} transition-opacity`}>
                <span className="text-xs font-bold text-gray-400 mr-auto uppercase">
                    {isExpanded ? 'Click để thu gọn' : 'Click để xem chi tiết'}
                </span>

                {/* Nút Đánh dấu đã đọc */}
                <button 
                    onClick={handleToggleRead}
                    title={msg.isRead ? "Đánh dấu chưa đọc" : "Đánh dấu đã đọc"}
                    className="p-2 border-2 border-black hover:bg-yellow-400 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 bg-white"
                >
                    {msg.isRead ? <Mail size={16} /> : <MailOpen size={16} />}
                </button>

                {/* Nút Xóa */}
                <button 
                    onClick={handleDelete}
                    title="Xóa tin nhắn"
                    className="p-2 border-2 border-black hover:bg-red-500 hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-1 bg-white"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );
}