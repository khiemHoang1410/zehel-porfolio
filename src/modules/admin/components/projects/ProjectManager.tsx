// src/modules/admin/components/projects/ProjectManager.tsx
'use client';

import { useRouter } from 'next/navigation';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import { BlockDTO } from '@/modules/core/dtos/block.dto';

interface ProjectManagerProps {
    initialData: BlockDTO[]; // Đảm bảo Type này khớp với dữ liệu từ page.tsx
}

export default function ProjectManager({ initialData }: ProjectManagerProps) {
    const router = useRouter();

    // Hàm callback: Chạy sau khi tạo mới thành công
    const refreshData = () => {
        // Refresh router để Next.js fetch lại dữ liệu mới nhất từ Server (DB)
        // và cập nhật lại prop initialData mà không cần reload trang
        router.refresh();
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-4 md:p-8 max-w-7xl mx-auto">

            {/* --- CỘT TRÁI: FORM (Chiếm 4/12) ---
                Dùng sticky để bám dính khi cuộn trang
            */}
            <aside className="lg:col-span-4 w-full lg:sticky lg:top-6 z-20">
                {/* Header nhỏ cho phần Form */}
                <div className="mb-4 pl-2 border-l-4 border-black">
                    <h3 className="font-black text-xl uppercase tracking-tighter">Tạo mới</h3>
                    <p className="text-xs font-bold  text-gray-500">CONTROL PANEL</p>
                </div>

                {/* QUAN TRỌNG: 
                    ProjectForm cần nhận prop 'onSuccess' để gọi refreshData.
                    (Đảm bảo file ProjectForm.tsx đã định nghĩa interface Props có onSuccess)
                */}
                <ProjectForm onSuccess={refreshData} />
            </aside>

            {/* --- CỘT PHẢI: LIST (Chiếm 8/12) --- */}
            <main className="lg:col-span-8 w-full min-w-0">
                {/* Header to cho phần List */}
                <div className="mb-6 border-b-2 border-black pb-4 flex justify-between items-end">
                    <div>
                        <h2 className="font-black text-3xl text-black uppercase tracking-tighter">
                            Quản lý Block
                        </h2>
                        <p className="text-sm font-medium text-gray-600 mt-1">
                            Danh sách hiển thị trên Bento Grid.
                        </p>
                    </div>

                    {/* Counter đếm số lượng */}
                    <div className="hidden sm:block text-right">
                        <span className="text-xs font-bold text-gray-500 uppercase">Tổng số</span>
                        <div className="text-4xl font-black leading-none">{initialData.length}</div>
                    </div>
                </div>

                {/* Truyền dữ liệu xuống List */}
                <ProjectList data={initialData} />
            </main>
        </div>
    );
}