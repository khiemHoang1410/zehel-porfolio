'use client';

import { useTransition } from 'react';
import { Trash2, Loader2, Briefcase, Building2, Calendar, Tag } from 'lucide-react';
import { toast } from 'sonner';
import { deleteExpAction } from '@/modules/experiences/actions';

interface IExpItem {
    _id: string;
    title: string;
    company: string;
    year: string;
    description?: string;
    tags?: string[];
}

export default function ExperienceList({ data }: { data: IExpItem[] }) {
    const [isPending, startTransition] = useTransition();

    const handleDelete = (id: string) => {
        if (!confirm('Xóa kinh nghiệm này vĩnh viễn?')) return;
        startTransition(async () => {
            const res = await deleteExpAction(id);
            if (res.success) {
                toast.success(res.message);
            } else {
                toast.error(res.message);
            }
        });
    };

    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-black border-dashed bg-yellow-50/50">
                <Briefcase size={40} className="mb-3 text-black opacity-20" />
                <p className="text-sm font-bold uppercase text-gray-500">Chưa có kinh nghiệm nào</p>
                <p className="text-xs text-gray-400 mt-1">Thêm kinh nghiệm làm việc của bạn vào đây</p>
            </div>
        );
    }

    return (
        <div className="space-y-4 max-h-[calc(100vh-150px)] overflow-y-auto pb-10 pr-2">
            {/* Header */}
            <div className="flex justify-between items-center sticky top-0 bg-white/95 backdrop-blur z-10 py-3 border-b-2 border-black mb-2">
                <h4 className="font-black text-black text-sm uppercase tracking-wider flex items-center gap-2">
                    🗂️ Danh sách ({data.length})
                </h4>
                <span className="text-[10px] bg-black text-white px-2 py-1 font-bold">
                    MỚI NHẤT
                </span>
            </div>

            {data.map((exp) => (
                <div
                    key={exp._id}
                    className={`group relative bg-white border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 flex gap-3 items-start ${isPending ? 'opacity-50 grayscale pointer-events-none' : ''}`}
                >
                    <div className="flex-1 min-w-0">
                        {/* Title + Company */}
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <div>
                                <h4 className="font-bold text-base text-black leading-tight flex items-center gap-1.5">
                                    <Briefcase size={14} className="shrink-0 text-yellow-600" />
                                    {exp.title}
                                </h4>
                                <p className="text-sm font-bold text-gray-600 flex items-center gap-1 mt-0.5">
                                    <Building2 size={12} className="shrink-0" />
                                    {exp.company}
                                </p>
                            </div>
                            <span className="text-[10px] font-bold border border-black bg-yellow-100 px-2 py-0.5 whitespace-nowrap flex items-center gap-1 shrink-0">
                                <Calendar size={10} /> {exp.year}
                            </span>
                        </div>

                        {/* Description */}
                        {exp.description && (
                            <p className="text-sm text-gray-600 line-clamp-2 mb-3 font-medium">
                                {exp.description}
                            </p>
                        )}

                        {/* Tags */}
                        {exp.tags && exp.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-dashed border-gray-300">
                                <Tag size={10} className="text-gray-400 mt-0.5" />
                                {exp.tags.map((tag, i) => (
                                    <span key={i} className="text-[10px] font-bold border border-black bg-blue-100 px-1.5 py-0.5">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Delete button */}
                    <button
                        onClick={() => handleDelete(exp._id)}
                        disabled={isPending}
                        title="Xóa kinh nghiệm này"
                        className="text-black hover:bg-red-500 hover:text-white border-2 border-transparent hover:border-black p-2 transition-all disabled:cursor-not-allowed shrink-0"
                    >
                        {isPending ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                    </button>
                </div>
            ))}
        </div>
    );
}
