// src/modules/admin/components/projects/ProjectForm.tsx
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateBlockSchema, CreateBlockDTO } from '@/modules/core/dtos/block.dto';
import { createBlockAction } from '@/modules/admin/actions';
import { toast } from 'sonner';
import { Loader2, Plus, Save, Link as LinkIcon, Image as ImageIcon } from 'lucide-react'; // Thêm icon cho đẹp
import { useState } from 'react';

interface ProjectFormProps {
    onSuccess?: () => void; // Prop này không bắt buộc, nhưng nếu có thì gọi
}

export default function ProjectForm({ onSuccess }: ProjectFormProps) {
    const [isPending, setIsPending] = useState(false);

    const { register, handleSubmit, reset, setError, formState: { errors } } = useForm({
        resolver: zodResolver(CreateBlockSchema),
        defaultValues: {
            type: 'project',
            size: 'small',
            isVisible: true, // Zod default là true, nhưng khai báo ở đây cho chắc
            content: '',
            link: '',
            imageUrl: '',
        }
    });

    const onSubmit = async (data: CreateBlockDTO) => {
        setIsPending(true);

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('type', data.type);
        formData.append('size', data.size);
        formData.append('content', data.content || '');
        formData.append('link', data.link || '');
        formData.append('imageUrl', data.imageUrl || '');
        formData.append('isVisible', String(data.isVisible));

        const res = await createBlockAction(formData);
        setIsPending(false);

        if (res.success) {
            toast.success(res.message);
            reset();
            // 3. GỌI CALLBACK ĐỂ REFRESH DỮ LIỆU BÊN NGOÀI
            if (onSuccess) {
                onSuccess();
            }
        } else {
            // PRO TIP: Mapping lỗi từ Server về lại đúng Input form
            if (res.errors) {
                // Loop qua object lỗi và set vào form
                Object.entries(res.errors).forEach(([key, msg]) => {
                    // msg là mảng string, lấy phần tử đầu
                    setError(key as any, { type: 'server', message: msg[0] });
                });
                toast.error("Dữ liệu không hợp lệ, vui lòng kiểm tra lại!");
            } else {
                toast.error(res.message);
            }
        }
    };

    // Component phụ hiển thị lỗi cho gọn code
    const ErrorMsg = ({ msg }: { msg?: string }) =>
        msg ? <p className="text-red-500 text-xs font-bold mt-1 animate-pulse">{msg}</p> : null;

    return (
        <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sticky top-6">
            <h3 className="font-black text-lg mb-4 uppercase flex items-center gap-2 border-b-2 border-gray-100 pb-2">
                <Plus size={18} /> Tạo Block Mới
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Tiêu đề <span className="text-red-500">*</span></label>
                    <input {...register('title')} className="w-full border-2 border-black p-2 font-bold focus:bg-yellow-50 outline-none transition-colors" placeholder="Tên dự án..." />
                    <ErrorMsg msg={errors.title?.message} />
                </div>

                {/* Type & Size */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-500">Loại</label>
                        <select {...register('type')} className="w-full border-2 border-black p-2 bg-white font-medium outline-none cursor-pointer">
                            <option value="project">📦 Project</option>
                            <option value="snippet">📝 Snippet</option>
                            <option value="social">🌐 Social</option>
                            <option value="note">📌 Note</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-gray-500">Size</label>
                        <select {...register('size')} className="w-full border-2 border-black p-2 bg-white font-medium outline-none cursor-pointer">
                            <option value="small">Small (1x1)</option>
                            <option value="medium">Medium (2x1)</option>
                            <option value="large">Large (2x2)</option>
                        </select>
                    </div>
                </div>

                {/* Link */}
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1">
                        <LinkIcon size={12} /> Link URL
                    </label>
                    <input {...register('link')} className="w-full border-2 border-black p-2 text-sm outline-none font-mono focus:bg-blue-50" placeholder="https://github.com/zehel..." />
                    {/* 👇 Đã thêm hiển thị lỗi cho Link */}
                    <ErrorMsg msg={errors.link?.message} />
                </div>

                {/* Image URL (Mới thêm vào) */}
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1">
                        <ImageIcon size={12} /> Ảnh bìa (URL)
                    </label>
                    <input {...register('imageUrl')} className="w-full border-2 border-black p-2 text-sm outline-none font-mono focus:bg-purple-50" placeholder="https://imgur.com/..." />
                    <ErrorMsg msg={errors.imageUrl?.message} />
                </div>

                {/* Content */}
                <div className="space-y-1">
                    <label className="text-xs font-bold uppercase text-gray-500">Mô tả ngắn</label>
                    <textarea {...register('content')} rows={3} className="w-full border-2 border-black p-2 text-sm outline-none resize-none focus:bg-gray-50" placeholder="Dự án này làm về cái gì..." />
                    <ErrorMsg msg={errors.content?.message} />
                </div>

                {/* Visibility */}
                <div className="flex items-center gap-2 pt-2 group cursor-pointer">
                    <input type="checkbox" {...register('isVisible')} id="visible" className="w-4 h-4 accent-black cursor-pointer" />
                    <label htmlFor="visible" className="text-sm font-bold cursor-pointer select-none group-hover:underline">Hiển thị công khai ngay</label>
                </div>

                <button
                    disabled={isPending}
                    className="w-full bg-black text-white py-3 font-black hover:bg-zinc-800 hover:translate-x-1 hover:shadow-[-4px_4px_0px_0px_rgba(250,204,21,1)] transition-all flex justify-center items-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                    {isPending ? 'Đang xử lý...' : 'LƯU DỮ LIỆU'}
                </button>
            </form>
        </div>
    );
}