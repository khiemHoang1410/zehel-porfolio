// app/components/ui/BlockModal.tsx
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { X, Send } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  block: any;
}

const BlockModal = ({ isOpen, onClose, block }: ModalProps) => {
  const [formData, setFormData] = useState({ name: '', email: '', content: '' });
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (!isOpen || !block) return null;

  // Xử lý gửi tin nhắn
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
        setSent(true);
        setFormData({ name: '', email: '', content: '' }); // Reset form
      } else {
        alert('Gửi thất bại! Thử lại sau nha.');
      }
    } catch (err) {
      alert('Lỗi kết nối!');
    } finally {
      setIsSending(false);
    }
  };

  // --- RENDER FORM LIÊN HỆ ---
  const renderContactForm = () => {
    if (sent) {
      return (
        <div className="text-center py-20 animate-pulse">
          <h3 className="text-3xl font-black text-green-600 mb-4">ĐÃ GỬI THÀNH CÔNG! ✅</h3>
          <p>Cảm ơn bạn đã liên hệ. Zehel sẽ phản hồi sớm nhất!</p>
          <button 
            onClick={() => setSent(false)} 
            className="mt-6 text-sm underline hover:text-blue-600"
          >
            Gửi tin nhắn khác
          </button>
        </div>
      );
    }

    return (
      <form onSubmit={handleSend} className="space-y-4 mt-4">
        <div>
          <label className="block font-bold mb-1">Tên của bạn</label>
          <input 
            required
            className="w-full p-3 border-2 border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all"
            placeholder="Ví dụ: HR Google"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Email liên hệ</label>
          <input 
            required type="email"
            className="w-full p-3 border-2 border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all"
            placeholder="hr@google.com"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block font-bold mb-1">Lời nhắn</label>
          <textarea 
            required
            rows={5}
            className="w-full p-3 border-2 border-black focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] outline-none transition-all"
            placeholder="Zehel ơi, đi làm lương 5k$ không?"
            value={formData.content}
            onChange={e => setFormData({...formData, content: e.target.value})}
          />
        </div>
        <button 
          disabled={isSending}
          className="w-full bg-black text-white font-bold py-4 text-xl hover:bg-zinc-800 flex justify-center items-center gap-2"
        >
          {isSending ? 'ĐANG GỬI...' : <><Send size={20} /> GỬI NGAY</>}
        </button>
      </form>
    );
  };

  // --- RENDER CHÍNH ---
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(255,255,0,1)] rounded-lg">
        {/* Header */}
        <div className={`p-4 border-b-4 border-black flex justify-between items-center ${block.color}`}>
          <h2 className="text-2xl font-black uppercase truncate pr-4">{block.title}</h2>
          <button onClick={onClose} className="bg-black text-white p-2 rounded hover:rotate-90 transition-transform duration-300">
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto bg-white text-black leading-relaxed">
          {block.type === 'contact' ? (
             // Nếu là type contact -> Hiện Form
             renderContactForm()
          ) : (
             // Nếu không -> Hiện Markdown bình thường
             <>
                <ReactMarkdown
                  components={{
                    code({node, inline, className, children, ...props} : any) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <SyntaxHighlighter style={vscDarkPlus} language={match[1]} PreTag="div" {...props}>
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={`${className} bg-gray-200 px-1 rounded text-red-500 font-mono`} {...props}>
                          {children}
                        </code>
                      )
                    },
                    h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-4 mt-6 border-b-4 border-black inline-block" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl font-bold mb-3 mt-5 text-purple-600" {...props} />,
                    p: ({node, ...props}) => <p className="mb-4 text-gray-800" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-2" {...props} />,
                    a: ({node, ...props}) => <a className="text-blue-600 font-bold hover:underline decoration-2" target="_blank" {...props} />,
                    img: ({node, ...props}) => <img className="w-full rounded-lg border-2 border-black my-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" {...props} />,
                  }}
                >
                  {block.content || '*Chưa có nội dung...*'}
                </ReactMarkdown>

                {block.link && (
                  <div className="mt-8 pt-4 border-t-2 border-dashed border-gray-400">
                    <a href={block.link} target="_blank" className="inline-block bg-black text-white font-bold py-3 px-6 rounded hover:shadow-[4px_4px_0px_0px_rgba(100,100,100,1)] transition-all">
                      🔗 Xem Link
                    </a>
                  </div>
                )}
             </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockModal;