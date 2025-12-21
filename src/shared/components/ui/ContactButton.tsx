// src/app/components/ui/ContactButton.tsx
'use client';
import React, { useState } from 'react';
import { Mail, X, Send, User, AtSign, MessageSquare } from 'lucide-react';

const ContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  
  // State lưu dữ liệu form
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    content: ''
  });

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert('✅ Đã gửi thư thành công! Zehel sẽ phản hồi sớm.');
        setFormData({ name: '', email: '', content: '' }); // Reset form
        setIsOpen(false);
      } else {
        alert('❌ Gửi thất bại. Server đang hắt hơi sổ mũi.');
      }
    } catch (error) {
      alert('❌ Lỗi kết nối mạng!');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Nút tròn nổi */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all border-2 border-transparent hover:border-black hover:bg-white hover:text-black group"
      >
        <Mail size={24} className="group-hover:scale-110 transition-transform"/>
      </button>

      {/* Modal Contact */}
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>
          
          <div className="relative bg-white border-4 border-black w-full max-w-md p-6 shadow-[8px_8px_0px_0px_rgba(255,255,0,1)] rounded-xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black uppercase flex items-center gap-2">
                <Mail className="text-black"/> Liên hệ Zehel
              </h2>
              <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="font-bold text-sm mb-1 flex items-center gap-1"><User size={14}/> Tên của bạn</label>
                <input 
                  required 
                  className="w-full p-3 border-2 border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-shadow rounded-lg" 
                  placeholder="Ví dụ: Elon Musk" 
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="font-bold text-sm mb-1 flex items-center gap-1"><AtSign size={14}/> Email liên hệ</label>
                <input 
                  required type="email"
                  className="w-full p-3 border-2 border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-shadow rounded-lg" 
                  placeholder="elon@tesla.com" 
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label className="font-bold text-sm mb-1 flex items-center gap-1"><MessageSquare size={14}/> Lời nhắn</label>
                <textarea 
                  required rows={4}
                  className="w-full p-3 border-2 border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-shadow rounded-lg" 
                  placeholder="Thuê bạn làm CEO lương 1 tỷ/tháng..." 
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                />
              </div>
              <button disabled={isSending} className="w-full bg-black text-white font-bold py-3 hover:bg-zinc-800 flex justify-center items-center gap-2 transition-colors rounded-lg">
                {isSending ? 'Đang gửi...' : <><Send size={18} /> GỬI NGAY</>}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactButton;