// app/components/ui/BlockModal.tsx

import React from 'react';
import ReactMarkdown from 'react-markdown';
import { X } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  block: any; // Dữ liệu của cái ô đang mở
}

const BlockModal = ({ isOpen, onClose, block }: ModalProps) => {
  if (!isOpen || !block) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Lớp nền mờ màu đen */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Nội dung Modal */}
      <div 
        className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col bg-white border-4 border-black shadow-[10px_10px_0px_0px_rgba(255,255,0,1)] rounded-lg animation-pop-in"
      >
        {/* Header của Modal */}
        <div className={`p-4 border-b-4 border-black flex justify-between items-center ${block.color}`}>
          <h2 className="text-2xl font-black uppercase truncate pr-4">{block.title}</h2>
          <button 
            onClick={onClose}
            className="bg-black text-white p-2 rounded hover:rotate-90 transition-transform duration-300"
          >
            <X size={24} />
          </button>
        </div>

        {/* Nội dung cuộn được (Markdown render ở đây) */}
        <div className="p-6 overflow-y-auto bg-white text-black leading-relaxed text-lg">
          <ReactMarkdown
            components={{
              // Tô màu cho code block
              code({node, inline, className, children, ...props} : any) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={`${className} bg-gray-200 px-1 rounded text-red-500 font-mono`} {...props}>
                    {children}
                  </code>
                )
              },
              // Style cho các thẻ khác
              h1: ({node, ...props}) => <h1 className="text-3xl font-bold mb-4 mt-6 border-b-4 border-black inline-block" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-bold mb-3 mt-5 text-purple-600" {...props} />,
              p: ({node, ...props}) => <p className="mb-4 text-gray-800" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-2" {...props} />,
              a: ({node, ...props}) => <a className="text-blue-600 font-bold hover:underline decoration-2" target="_blank" {...props} />,
              img: ({node, ...props}) => <img className="w-full rounded-lg border-2 border-black my-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" {...props} />,
            }}
          >
            {block.content || '*Chưa có nội dung chi tiết...*'}
          </ReactMarkdown>

          {/* Nút Link tham khảo nếu có */}
          {block.link && (
            <div className="mt-8 pt-4 border-t-2 border-dashed border-gray-400">
              <a 
                href={block.link} 
                target="_blank" 
                className="inline-block bg-black text-white font-bold py-3 px-6 rounded hover:translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(100,100,100,1)] transition-all"
              >
                🔗 Xem Project / Demo
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlockModal;