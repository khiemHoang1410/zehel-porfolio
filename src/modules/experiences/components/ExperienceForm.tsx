'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, Plus, Briefcase, Building2, Calendar, FileText, Tags } from 'lucide-react';
import { createExpAction } from '@/modules/experiences/actions';

interface ExperienceFormProps {
    onSuccess?: () => void;
}

export default function ExperienceForm({ onSuccess }: ExperienceFormProps) {
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);

        const title = formData.get('title') as string;
        const company = formData.get('company') as string;
        const year = formData.get('year') as string;

        if (!title.trim() || !company.trim() || !year.trim()) {
            toast.error('Vui lòng điền đầy đủ các trường bắt buộc!');
            return;
        }

        setIsPending(true);
        const res = await createExpAction(formData);
        setIsPending(false);

        if (res.success) {
            toast.success(res.message);
            form.reset();
            onSuccess?.();
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sticky top-6">
            <h3 className="font-black text-lg mb-4 uppercase flex items-center gap-2 border-b-2 border-gray-100 pb-2">
                <Plus size={18} /> Thêm Kinh Nghiệm
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Chức danh */}
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1">
                        <Briefcase size={12} /> Chức danh <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="title"
                        required
                        className="w-full border-2 border-black p-2 font-bold focus:bg-yellow-50 outline-none transition-colors"
                        placeholder="Senior Frontend Developer..."
                    />
                </div>

                {/* Công ty */}
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1">
                        <Building2 size={12} /> Công ty <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="company"
                        required
                        className="w-full border-2 border-black p-2 font-bold focus:bg-blue-50 outline-none transition-colors"
                        placeholder="Google, FPT Software..."
                    />
                </div>

                {/* Thời gian */}
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1">
                        <Calendar size={12} /> Thời gian <span className="text-red-500">*</span>
                    </label>
                    <input
                        name="year"
                        required
                        className="w-full border-2 border-black p-2 font-bold focus:bg-green-50 outline-none transition-colors"
                        placeholder="2023 - Present"
                    />
                </div>

                {/* Mô tả */}
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1">
                        <FileText size={12} /> Mô tả ngắn
                    </label>
                    <textarea
                        name="description"
                        rows={3}
                        className="w-full border-2 border-black p-2 text-sm outline-none resize-none focus:bg-gray-50"
                        placeholder="Làm gì ở đây, đóng góp gì nổi bật..."
                    />
                </div>

                {/* Tags */}
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1">
                        <Tags size={12} /> Tech Tags
                    </label>
                    <input
                        name="tags"
                        className="w-full border-2 border-black p-2 text-sm font-mono outline-none focus:bg-purple-50 transition-colors"
                        placeholder="React, TypeScript, Node.js (cách nhau bằng dấu phẩy)"
                    />
                    <p className="text-[10px] text-gray-400">Nhập các tag cách nhau bằng dấu phẩy</p>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-black text-white py-3 font-black hover:bg-zinc-800 hover:translate-x-1 hover:shadow-[-4px_4px_0px_0px_rgba(250,204,21,1)] transition-all flex justify-center items-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isPending ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                    {isPending ? 'Đang lưu...' : 'THÊM KINH NGHIỆM'}
                </button>
            </form>
        </div>
    );
}
