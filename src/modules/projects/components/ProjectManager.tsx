// src/modules/admin/components/projects/ProjectManager.tsx
"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import ProjectList from "./ProjectList";
import { IBlock } from "@/modules/core/dtos/block.dto";
import ProjectForm from "./ProjectForm";

interface ProjectManagerProps {
  initialData: IBlock[];
}

export default function ProjectManager({ initialData }: ProjectManagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Hàm này được gọi khi Form submit thành công
  const handleRefresh = () => {
    startTransition(() => {
      // Refresh dữ liệu từ server mà không cần reload trang
      router.refresh();
      console.log("🔄 Data refreshed from server");
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start p-4 md:p-8 max-w-7xl mx-auto">
      {/* --- FORM (Cột trái) --- */}
      <aside className="lg:col-span-4 w-full lg:sticky lg:top-6 z-20">
        <div className="mb-4 pl-2 border-l-4 border-black">
          <h3 className="font-black text-xl uppercase tracking-tighter">
            Control Panel
          </h3>
          <p className="text-xs font-bold text-gray-500">THÊM MỚI BLOCK</p>
        </div>

        {/* Truyền hàm refresh vào onSuccess */}
        <ProjectForm onSuccess={handleRefresh} />
      </aside>

      {/* --- LIST (Cột phải) --- */}
      <main className="lg:col-span-8 w-full min-w-0">
        <div className="mb-6 border-b-2 border-black pb-4 flex justify-between items-end">
          <div>
            <h2 className="font-black text-3xl text-black uppercase tracking-tighter">
              Quản lý Block
            </h2>
            <p className="text-sm font-medium text-gray-600 mt-1">
              Hiển thị trên Bento Grid
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-xs font-bold text-gray-500 uppercase">
              Total Blocks
            </span>
            <div className="text-4xl font-black leading-none">
              {initialData?.length || 0}
            </div>
          </div>
        </div>

        {/* Hiệu ứng mờ đi khi đang refresh data */}
        <div
          className={`transition-opacity duration-300 ${isPending ? "opacity-50" : "opacity-100"}`}
        >
          <ProjectList data={initialData} />
        </div>
      </main>
    </div>
  );
}
