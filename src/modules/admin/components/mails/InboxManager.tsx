// src/modules/admin/components/inbox/InboxManager.tsx
import { Mail, Inbox } from 'lucide-react';
import MessageItem from './MessageItem';

interface InboxManagerProps {
    messages: any[];
}

export default function InboxManager({ messages = [] }: InboxManagerProps) {
    // Tính toán thống kê nhanh
    const unreadCount = messages.filter((m: any) => !m.isRead).length;

    if (messages.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 border-4 border-dashed border-black/20 bg-gray-50 rounded-lg">
                <Inbox size={64} className="text-gray-300 mb-4" />
                <p className="text-xl font-black uppercase text-gray-400">Không có tin nhắn nào</p>
                <p className="text-sm text-gray-400">Hòm thư sạch sẽ! ✨</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto pb-20">
            {/* HEADER THỐNG KÊ */}
            <div className="flex flex-col sm:flex-row justify-between items-end border-b-4 border-black pb-6 mb-8 gap-4">
                <div>
                    <h2 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-3">
                        <Mail size={36} className="text-black" /> 
                        Hòm Thư
                    </h2>
                    <p className="text-gray-600 font-bold mt-1">
                        Quản lý tin nhắn liên hệ từ khách hàng
                    </p>
                </div>

                <div className="flex gap-4">
                    <div className="bg-white border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="block text-[10px] font-black uppercase text-gray-400">Tổng số</span>
                        <span className="text-2xl font-black">{messages.length}</span>
                    </div>
                    <div className={`bg-white border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)] ${unreadCount > 0 ? 'bg-red-50' : ''}`}>
                        <span className="block text-[10px] font-black uppercase text-red-500">Chưa đọc</span>
                        <span className="text-2xl font-black text-red-600">{unreadCount}</span>
                    </div>
                </div>
            </div>

            {/* DANH SÁCH MESSAGE */}
            <div className="space-y-4">
                {messages.map((msg: any) => (
                    <MessageItem key={msg._id} msg={msg} />
                ))}
            </div>
            
            <div className="text-center mt-10">
                <p className="text-xs font-bold text-gray-400 uppercase">--- Hết danh sách ---</p>
            </div>
        </div>
    );
}