'use client';
import { useState } from 'react';
import { createTechAction, deleteTechAction } from '../actions';
import { Trash2, Plus, Cpu } from 'lucide-react';
import { toast } from 'sonner';

// Nhận data từ props (được fetch từ Server Component cha)
export default function TechsManager({ techs }: { techs: any[] }) {
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsPending(true);
        const res = await createTechAction(formData);
        setIsPending(false);
        
        if (res.success) {
            toast.success(res.message);
            // Reset form bằng cách đơn giản nhất:
            (document.getElementById('tech-form') as HTMLFormElement).reset();
        } else {
            toast.error(res.message);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Form Thêm */}
            <div className="bg-white border-4 border-black p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] h-fit">
                <h2 className="font-bold text-xl mb-4 flex items-center gap-2"><Plus /> THÊM TECH</h2>
                <form id="tech-form" action={handleSubmit} className="space-y-4">
                    <input name="name" required placeholder="Tên (React)" className="w-full p-3 border-2 border-black outline-none" />
                    <input name="iconName" required placeholder="Icon Name (SiReact)" className="w-full p-3 border-2 border-black outline-none" />
                    <div className="flex items-center gap-2 border-2 border-black p-2 bg-white">
                        <label className="font-bold text-sm">Màu:</label>
                        <input name="color" type="color" className="w-8 h-8 cursor-pointer border-none bg-transparent" defaultValue="#000000" />
                    </div>
                    <button disabled={isPending} className="w-full bg-black text-white font-bold p-3 hover:bg-zinc-800">
                        {isPending ? 'Đang lưu...' : 'LƯU TECH'}
                    </button>
                </form>
            </div>

            {/* Danh sách */}
            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
                {techs.map((t: any) => (
                    <div key={t._id} className="flex justify-between items-center bg-white border-2 border-black p-3 hover:shadow-md transition-all">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 border border-black flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: t.color }}>
                                {t.name[0]}
                            </div>
                            <div>
                                <div className="font-bold">{t.name}</div>
                                <div className="text-xs text-gray-500 font-mono">{t.iconName}</div>
                            </div>
                        </div>
                        <button onClick={async () => {
                             if(confirm('Xóa?')) await deleteTechAction(t._id);
                        }} className="text-red-500 p-2 hover:bg-red-50 rounded"><Trash2 size={18} /></button>
                    </div>
                ))}
            </div>
        </div>
    );
}