'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTechAction } from '@/modules/admin/actions';
import { toast } from 'sonner';
import { Loader2, Plus, Palette, Hash, Star, Layers, BarChart } from 'lucide-react';
import { useState } from 'react';
import { CreateTechDTO, CreateTechSchema, TECH_CATEGORIES, TECH_LEVELS } from '@/modules/core/dtos/teck.dto';

export default function TechForm({ onSuccess }: { onSuccess: () => void }) {
    const [isPending, setIsPending] = useState(false);

    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<CreateTechDTO>({
        resolver: zodResolver(CreateTechSchema),
        defaultValues: {
            name: '', iconName: '', color: '#000000',
            category: 'tool', level: 'intermediate', isFeatured: false
        }
    });

    const currentColor = watch('color');

    const onSubmit = async (data: CreateTechDTO) => {
        setIsPending(true);
        const res = await createTechAction(data);
        setIsPending(false);

        if (res.success) {
            toast.success(res.message);
            reset();
            onSuccess();
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="bg-white border-2 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sticky top-6">
            <h3 className="font-black text-lg mb-4 uppercase flex items-center gap-2 border-b-2 border-gray-100 pb-2">
                <Plus size={18} /> New Weaponry
            </h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                {/* Tên & Icon */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase">Tên Tech</label>
                        <input {...register('name')} placeholder="React..." className="w-full border-2 border-black p-2 font-bold outline-none focus:bg-yellow-50" />
                        {errors.name && <p className="text-red-500 text-[10px] font-bold">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Hash size={10} /> Icon Name</label>
                        <input {...register('iconName')} placeholder="SiReact..." className="w-full border-2 border-black p-2 font-mono text-sm outline-none focus:bg-blue-50" />
                    </div>
                </div>

                {/* Category & Level */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Layers size={10} /> Loại</label>
                        <select {...register('category')} className="w-full border-2 border-black p-2 bg-white cursor-pointer outline-none uppercase text-xs font-bold">
                            {TECH_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><BarChart size={10} /> Trình độ</label>
                        <select {...register('level')} className="w-full border-2 border-black p-2 bg-white cursor-pointer outline-none uppercase text-xs font-bold">
                            {TECH_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                        </select>
                    </div>
                </div>

                {/* Color Picker */}
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Palette size={10} /> Mã Màu</label>
                    <div className="flex gap-2">
                        <div className="relative w-10 h-10 border-2 border-black overflow-hidden">
                            <input type="color" {...register('color')} className="absolute -top-2 -left-2 w-16 h-16 cursor-pointer" />
                        </div>
                        <input {...register('color')} className="flex-1 border-2 border-black p-2 font-mono uppercase text-sm outline-none" placeholder="#000000" />
                    </div>
                    <div className="mt-1 text-xs font-bold flex items-center gap-2">
                        Preview: <span style={{ color: currentColor, fontWeight: 900 }}>{watch('name') || 'TECH NAME'}</span>
                    </div>
                </div>

                {/* Is Featured Toggle */}
                <div className="pt-2">
                    <label className="flex items-center gap-3 cursor-pointer group border-2 border-dashed border-gray-300 p-2 hover:border-black transition-colors">
                        <input type="checkbox" {...register('isFeatured')} className="w-5 h-5 accent-black cursor-pointer" />
                        <span className="text-sm font-bold uppercase flex items-center gap-2 group-hover:text-yellow-600">
                            <Star size={16} className={watch('isFeatured') ? "fill-yellow-400 text-yellow-600" : "text-gray-400"} />
                            Nổi bật (Hiện trang chủ)
                        </span>
                    </label>
                </div>

                <button disabled={isPending} className="w-full bg-black text-white py-3 font-black hover:bg-zinc-800 hover:shadow-[-4px_4px_0px_0px_rgba(250,204,21,1)] hover:-translate-y-1 transition-all flex justify-center items-center gap-2 mt-2">
                    {isPending ? <Loader2 className="animate-spin" size={18} /> : <Plus size={18} />}
                    {isPending ? 'Đang xử lý...' : 'THÊM VÀO KHO'}
                </button>
            </form>
        </div>
    );
}