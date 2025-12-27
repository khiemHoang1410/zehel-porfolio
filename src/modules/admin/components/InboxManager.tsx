import { Mail, MessageSquare } from 'lucide-react';

export default function InboxManager({ messages }: { messages: any[] }) {
    if (messages.length === 0) {
        return <div className="text-center py-20 text-gray-500 italic">Hộp thư trống trơn... 🍃</div>;
    }

    return (
        <div className="space-y-4 max-w-3xl mx-auto">
            {messages.map((msg: any) => (
                <div key={msg._id} className="bg-white border-2 border-black p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex justify-between items-start mb-4 border-b border-gray-200 pb-2">
                        <div>
                            <h3 className="font-bold text-lg flex items-center gap-2">
                                <MessageSquare size={18} className="text-blue-600" /> {msg.name}
                            </h3>
                            <p className="text-sm text-gray-500">{msg.email}</p>
                        </div>
                        <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded border border-gray-300">
                            {new Date(msg.createdAt).toLocaleString('vi-VN')}
                        </span>
                    </div>
                    <p className="text-gray-800 whitespace-pre-line leading-relaxed">
                        {msg.content}
                    </p>
                </div>
            ))}
        </div>
    );
}