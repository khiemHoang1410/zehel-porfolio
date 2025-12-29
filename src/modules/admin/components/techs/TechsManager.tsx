'use client';

import { useRouter } from 'next/navigation';
import TechForm from './TechForm';
import TechList from './TechList';
import { Cpu } from 'lucide-react';
import { ITech } from '@/modules/core/dtos/teck.dto';

export default function TechManager({ initialData }: { initialData: ITech[] }) {
    const router = useRouter();

    const refreshData = () => {
        router.refresh();
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start p-4 max-w-7xl mx-auto">

            {/* CỘT TRÁI: FORM */}
            <aside className="md:col-span-4 w-full md:sticky md:top-6 z-10">
                <TechForm onSuccess={refreshData} />
            </aside>

            {/* CỘT PHẢI: LIST */}
            <main className="md:col-span-8 w-full min-w-0">
                <div className="flex justify-between items-end mb-6 border-b-4 border-black pb-4">
                    <div>
                        <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                            <Cpu size={32} /> Arsenal
                        </h2>
                        <p className="text-gray-500 font-bold text-sm mt-1">Quản lý Tech Stack & Skills</p>
                    </div>
                    <div className="text-right">
                        <span className="text-xs font-black uppercase bg-black text-white px-2 py-1 shadow-[3px_3px_0px_0px_rgba(250,204,21,1)]">
                            Total: {initialData?.length || 0}
                        </span>
                    </div>
                </div>

                <TechList techs={initialData} />
            </main>
        </div>
    );
}