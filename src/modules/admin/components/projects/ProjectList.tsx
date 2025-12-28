import connectDB from '@/shared/lib/db';
import Block from '@/modules/core/models/Block';
import { Eye, EyeOff } from 'lucide-react';
import DeleteButton from '../DeleteButton'; // Import từ file trên

export async function ProjectList() {
  await connectDB();
  const blocks = await Block.find().sort({ createdAt: -1 });

  if (blocks.length === 0) {
    return (
      <div className="text-center p-10 border-2 border-dashed border-gray-300 rounded text-gray-400 font-mono">
        CHƯA CÓ DỰ ÁN NÀO. THÊM MỚI ĐI NGÀI!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-black uppercase tracking-tighter italic">
        Danh sách hiện có ({blocks.length})
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {blocks.map((block: any) => (
          <div 
            key={block._id.toString()} 
            className="bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all relative group"
          >
            {/* Header Card */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full border border-black ${block.color}`}></span>
                <h3 className="font-bold text-lg leading-tight uppercase">{block.title}</h3>
              </div>
              
              {/* NÚT XÓA: Đã fix theo Action mới của ngài */}
              <DeleteButton id={block._id.toString()} />
            </div>

            {/* Metadata tags */}
            <div className="flex flex-wrap gap-2 mb-3 text-[10px] font-mono uppercase font-bold text-gray-500">
              <span className="bg-gray-100 px-1.5 py-0.5 border border-black">{block.type}</span>
              <span className="bg-gray-100 px-1.5 py-0.5 border border-black">{block.size}</span>
              {block.isVisible ? (
                <span className="flex items-center gap-1 text-green-600 border border-green-600 px-1.5 py-0.5 bg-green-50">
                  <Eye size={10}/> HIỆN
                </span>
              ) : (
                <span className="flex items-center gap-1 text-gray-400 border border-gray-400 px-1.5 py-0.5 bg-gray-50">
                  <EyeOff size={10}/> ẨN
                </span>
              )}
            </div>

            {/* Content preview */}
            <p className="text-sm text-gray-600 line-clamp-2 min-h-10 font-medium border-l-2 border-gray-100 pl-2">
              {block.content || "Không có mô tả..."}
            </p>
            
            {/* Link thực thi */}
            {block.link && (
              <a 
                href={block.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs font-black text-black underline decoration-2 underline-offset-2 hover:text-blue-600 mt-3 block"
              >
                🔗 XEM CHI TIẾT
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
