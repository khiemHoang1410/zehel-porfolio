// src/modules/admin/components/projects/ProjectList.tsx
'use client';

import { Trash2, ExternalLink, Box, GripVertical, Loader2 } from 'lucide-react';
import { deleteBlockAction } from '@/modules/admin/actions';
import { toast } from 'sonner';
import { useTransition } from 'react';
import { IBlock } from '@/modules/core/dtos/block.dto'; // Import đúng DTO

export default function ProjectList({ data }: { data: IBlock[] }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (!confirm('⚠️ XOÁ LÀ MẤT VĨNH VIỄN!\nNgài có chắc muốn xóa block này không?')) return;

    startTransition(async () => {
      try {
        const res = await deleteBlockAction(id);
        if (res.success) {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } catch (error) {
        toast.error("Có lỗi xảy ra khi xóa!");
      }
    });
  };

  const getHostname = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return 'Link';
    }
  };

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 border-2 border-black border-dashed bg-yellow-50/50">
        <Box size={40} className="mb-3 text-black opacity-20" />
        <p className="text-sm font-bold uppercase text-gray-500">Chưa có dự án nào</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[calc(100vh-150px)] overflow-y-auto pb-10 pr-2">
      {/* Header Sticky */}
      <div className="flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur z-10 py-3 border-b-2 border-black mb-2">
        <h4 className="font-black text-black text-sm uppercase tracking-wider flex items-center gap-2">
          🗂️ Danh sách ({data.length})
        </h4>
        <span className="text-[10px] bg-black text-white px-2 py-1 font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
          MỚI NHẤT
        </span>
      </div>

      {data.map((block) => (
        <div
          // 🔥 FIX: Dùng _id thay vì id
          key={block._id}
          className={`group relative bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex gap-3 items-start ${isPending ? 'opacity-50 grayscale pointer-events-none' : ''}`}
        >
          {/* Drag Handle */}
          <div className="cursor-grab active:cursor-grabbing text-black/20 hover:text-black mt-1">
            <GripVertical size={20} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <div
                className={`w-3 h-3 border border-black ${block.isVisible ? 'bg-green-400' : 'bg-gray-300'}`}
                title={block.isVisible ? "Hiển thị" : "Đang ẩn"}
              />

              <h4 className="font-bold text-lg text-black truncate leading-tight">
                {block.title}
              </h4>

              <div className="flex gap-1 ml-auto sm:ml-2">
                <span className="text-[10px] font-bold uppercase border border-black bg-yellow-200 px-1.5 py-0.5">
                  {block.type}
                </span>
                <span className="text-[10px] font-bold uppercase border border-black bg-blue-200 px-1.5 py-0.5">
                  {block.size}
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-600 line-clamp-2 mb-3 font-medium">
              {block.content || 'Không có mô tả...'}
            </p>

            <div className="flex items-center gap-3 pt-2 border-t border-dashed border-gray-300">
              {block.link && (
                <a
                  href={block.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:underline decoration-2 underline-offset-2"
                >
                  <ExternalLink size={12} /> {getHostname(block.link)}
                </a>
              )}
            </div>
          </div>

          <button
            // 🔥 FIX: Dùng _id thay vì id
            onClick={() => handleDelete(block._id)}
            disabled={isPending}
            title="Xóa block này"
            className="text-black hover:bg-red-500 hover:text-white border-2 border-transparent hover:border-black p-2 transition-all disabled:cursor-not-allowed"
          >
            {isPending ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
          </button>
        </div>
      ))}
    </div>
  );
}