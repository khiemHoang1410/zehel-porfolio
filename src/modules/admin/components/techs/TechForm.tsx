'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateTechDTO, CreateTechSchema, TECH_CATEGORIES, TECH_LEVELS, ITech } from '@/modules/core/dtos/teck.dto';
import { createTechAction, updateTechAction } from '@/modules/admin/actions';
import { toast } from 'sonner';
import { Loader2, Plus, Palette, Hash, Star, Layers, BarChart, Save, X, Wrench, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // 🔥 Import Framer Motion
import ColorPicker from '@/shared/components/ui/ColorPicker';

interface TechFormProps {
    editingTech: ITech | null;
    onCancelEdit: () => void;
    onSuccess: () => void;
}

export default function TechForm({ editingTech, onCancelEdit, onSuccess }: TechFormProps) {
    const [isPending, setIsPending] = useState(false);

    const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<CreateTechDTO>({
        resolver: zodResolver(CreateTechSchema),
        defaultValues: {
            name: '', iconName: '', color: '#000000',
            category: 'tool', level: 'intermediate', isFeatured: false
        }
    });

    // Effect reset form khi đổi tech (giữ nguyên logic cũ)
    useEffect(() => {
        if (editingTech) {
            reset({
                name: editingTech.name,
                iconName: editingTech.iconName,
                color: editingTech.color,
                category: editingTech.category,
                level: editingTech.level,
                isFeatured: editingTech.isFeatured
            });
        }
    }, [editingTech, reset]);

    const onSubmit = async (data: CreateTechDTO) => {
        setIsPending(true);
        let res;

        if (editingTech) {
            res = await updateTechAction(editingTech._id, data);
        } else {
            res = await createTechAction(data);
        }

        setIsPending(false);

        if (res.success) {
            toast.success(res.message);
            handleCancel();
            onSuccess();
        } else {
            toast.error(res.message);
        }
    };

    const handleCancel = () => {
        reset({ name: '', iconName: '', color: '#000000', category: 'tool', level: 'intermediate', isFeatured: false });
        onCancelEdit();
    };

    const isEditMode = !!editingTech;

    return (
        <AnimatePresence mode='wait'>
            <motion.div
                // 🔥 MAGIC KEY: Key đổi -> Animation chạy lại từ đầu
                key={editingTech ? editingTech._id : 'create-form'}

                // Hiệu ứng xuất hiện
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200, damping: 20 }}

                className={`
                bg-white border-2 p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sticky top-6 
                ${isEditMode ? 'border-yellow-500' : 'border-black'}
            `}
            >
                {/* HEADLINE VỚI ANIMATION RIÊNG */}
                <motion.h3
                    layout
                    className="font-black text-lg mb-4 uppercase flex items-center justify-between border-b-2 border-gray-100 pb-2"
                >
                    <div className="flex items-center gap-2">
                        {isEditMode ? (
                            <motion.div
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                            >
                                <Wrench size={18} className="text-yellow-600" />
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                            >
                                <Plus size={18} />
                            </motion.div>
                        )}

                        <span className={isEditMode ? "text-yellow-700" : ""}>
                            {isEditMode ? 'Upgrading System' : 'New Weaponry'}
                        </span>
                    </div>

                    {isEditMode && (
                        <motion.span
                            initial={{ scale: 0 }} animate={{ scale: 1 }}
                            className="text-[10px] bg-yellow-300 px-2 py-0.5 border border-black text-black flex items-center gap-1"
                        >
                            <Sparkles size={10} /> {editingTech.name}
                        </motion.span>
                    )}
                </motion.h3>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                    {/* Các Input (Thêm stagger effect nếu muốn xịn hơn, nhưng thế này là đủ clean) */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase">Tên Tech</label>
                            <input {...register('name')} placeholder="React..." className="w-full border-2 border-black p-2 font-bold outline-none focus:bg-yellow-50 transition-colors" />
                            {errors.name && <p className="text-red-500 text-[10px] font-bold">{errors.name.message}</p>}
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Hash size={10} /> Icon Name</label>
                            <input {...register('iconName')} placeholder="SiReact..." className="w-full border-2 border-black p-2 font-mono text-sm outline-none focus:bg-blue-50 transition-colors" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><Layers size={10} /> Loại</label>
                            <select {...register('category')} className="w-full border-2 border-black p-2 bg-white cursor-pointer outline-none uppercase text-xs font-bold focus:bg-gray-50">
                                {TECH_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-bold text-gray-500 uppercase flex items-center gap-1"><BarChart size={10} /> Trình độ</label>
                            <select {...register('level')} className="w-full border-2 border-black p-2 bg-white cursor-pointer outline-none uppercase text-xs font-bold focus:bg-gray-50">
                                {TECH_LEVELS.map(l => <option key={l} value={l}>{l}</option>)}
                            </select>
                        </div>
                    </div>

                    <ColorPicker
                        label="Màu Đại Diện"
                        value={watch('color')}
                        onChange={(val) => setValue('color', val, { shouldValidate: true })}
                        error={errors.color?.message}
                    />

                    <motion.div className="pt-2" layout>
                        <label className="flex items-center gap-3 cursor-pointer group border-2 border-dashed border-gray-300 p-2 hover:border-black transition-colors bg-gray-50">
                            <input type="checkbox" {...register('isFeatured')} className="w-5 h-5 accent-black cursor-pointer" />
                            <span className="text-sm font-bold uppercase flex items-center gap-2 group-hover:text-yellow-600 transition-colors">
                                <Star size={16} className={watch('isFeatured') ? "fill-yellow-400 text-yellow-600" : "text-gray-400"} />
                                Nổi bật
                            </span>
                        </label>
                    </motion.div>

                    {/* BUTTON GROUP */}
                    <div className="flex gap-2 pt-2">
                        {isEditMode && (
                            <motion.button
                                initial={{ width: 0, opacity: 0 }}
                                animate={{ width: "33.333%", opacity: 1 }}
                                type="button"
                                onClick={handleCancel}
                                className="border-2 border-black bg-white text-black font-bold hover:bg-gray-100 hover:text-red-500 transition-colors flex justify-center items-center overflow-hidden whitespace-nowrap"
                            >
                                <X size={18} /> <span className="ml-1 text-xs">HỦY</span>
                            </motion.button>
                        )}

                        <button
                            disabled={isPending}
                            className={`
                            flex-1 py-3 font-black text-white transition-all flex justify-center items-center gap-2 border-2 border-transparent
                            ${isEditMode
                                    ? 'bg-yellow-500 hover:bg-yellow-400 text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                    : 'bg-black hover:bg-zinc-800 hover:shadow-[-4px_4px_0px_0px_rgba(250,204,21,1)] hover:-translate-y-1'
                                }
                        `}
                        >
                            {isPending ? <Loader2 className="animate-spin" size={18} /> : (isEditMode ? <Save size={18} /> : <Plus size={18} />)}
                            {isPending ? 'Đang lưu...' : (isEditMode ? 'LƯU THAY ĐỔI' : 'THÊM MỚI')}
                        </button>
                    </div>
                </form>
            </motion.div>
        </AnimatePresence>
    );
}