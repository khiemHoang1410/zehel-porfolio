'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateBlockSchema, CreateBlockDTO } from '../../dtos'; // Import từ cùng module
import { createBlockAction } from '../../actions';
import { toast } from 'sonner';
import { useState } from 'react';
import { Loader2, Save } from 'lucide-react';

export default function ProjectForm() {
    const [isPending, setIsPending] = useState(false);

    // Hook Form kết hợp Zod Resolver
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CreateBlockDTO>({
        resolver: zodResolver(CreateBlockSchema),
        defaultValues: {
            title: '',      // Bổ sung title
            type: 'project',
            content: '',    // Bổ sung content
            link: '',       // Bổ sung link
            size: 'small',
            color: 'bg-white',
            isVisible: true
        }
    });


    const onSubmit = async (data: CreateBlockDTO) => {
        setIsPending(true);

        // Convert data sang FormData để gửi Server Action
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
            formData.append(key, String(value));
        });

        const res = await createBlockAction(formData);

        setIsPending(false);
        if (res.success) {
            toast.success(res.message);
            reset(); // Xóa form sau khi thêm
        } else {
            toast.error('Có lỗi xảy ra!');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
            <h2 className="text-xl font-black uppercase mb-4 border-b-2 border-gray-200 pb-2">Thêm Block Mới</h2>

            {/* Title Input */}
            <div>
                <label className="block font-bold text-sm mb-1">Tiêu đề</label>
                <input {...register('title')} className="w-full p-2 border-2 border-gray-300 focus:border-black outline-none font-mono" />
                {errors.title && <span className="text-red-500 text-xs font-bold">{errors.title.message}</span>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block font-bold text-sm mb-1">Loại</label>
                    <select {...register('type')} className="w-full p-2 border-2 border-gray-300 focus:border-black outline-none">
                        <option value="project">Dự án</option>
                        <option value="snippet">Snippet</option>
                        <option value="social">Social</option>
                        <option value="note">Ghi chú</option>
                    </select>
                </div>
                <div>
                    <label className="block font-bold text-sm mb-1">Size</label>
                    <select {...register('size')} className="w-full p-2 border-2 border-gray-300 focus:border-black outline-none">
                        <option value="small">Nhỏ (1x1)</option>
                        <option value="medium">Dài (2x1)</option>
                        <option value="large">To (2x2)</option>
                    </select>
                </div>
            </div>

            {/* Content */}
            <div>
                <label className="block font-bold text-sm mb-1">Nội dung / Mô tả</label>
                <textarea {...register('content')} className="w-full p-2 border-2 border-gray-300 focus:border-black outline-none h-24" />
            </div>

            <button disabled={isPending} type="submit" className="w-full bg-black text-white font-bold py-3 hover:bg-zinc-800 hover:-translate-y-1 transition-all flex justify-center items-center gap-2">
                {isPending ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                {isPending ? 'Đang lưu...' : 'LƯU VÀO DATABASE'}
            </button>
        </form>
    );
}