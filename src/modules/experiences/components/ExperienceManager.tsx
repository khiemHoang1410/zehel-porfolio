'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Briefcase } from 'lucide-react';
import ExperienceForm from './ExperienceForm';
import ExperienceList from './ExperienceList';

interface IExpItem {
    _id: string;
    title: string;
    company: string;
    year: string;
    description?: string;
    tags?: string[];
}

interface ExperienceManagerProps {
    initialData: IExpItem[];
}

export default function ExperienceManager({ initialData }: ExperienceManagerProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const handleRefresh = () => {
        startTransition(() => {
            router.refresh();
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-4 md:p-8 max-w-7xl mx-auto">
            {/* FORM (Cột trái) */}
            <aside className="lg:col-span-4 w-full lg:sticky lg:top-6 z-20">
                <div className="mb-4 pl-2 border-l-4 border-black">
                    <h3 className="font-black text-xl uppercase tracking-tighter">
                        Career Log
                    </h3>
                    <p className="text-xs font-bold text-gray-500">THÊM KINH NGHIỆM</p>
                </div>
                <ExperienceForm onSuccess={handleRefresh} />
            </aside>

            {/* LIST (Cột phải) */}
            <main className="lg:col-span-8 w-full min-w-0">
                <div className="mb-6 border-b-2 border-black pb-4 flex justify-between items-end">
                    <div>
                        <h2 className="font-black text-3xl text-black uppercase tracking-tighter flex items-center gap-3">
                            <Briefcase size={32} /> Hành Trình
                        </h2>
                        <p className="text-sm font-medium text-gray-600 mt-1">
                            Hiển thị trong phần About / Timeline
                        </p>
                    </div>
                    <div className="hidden sm:block text-right">
                        <span className="text-xs font-bold text-gray-500 uppercase">
                            Total
                        </span>
                        <div className="text-4xl font-black leading-none">
                            {initialData?.length || 0}
                        </div>
                    </div>
                </div>

                <div className={`transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
                    <ExperienceList data={initialData} />
                </div>
            </main>
        </div>
    );
}
