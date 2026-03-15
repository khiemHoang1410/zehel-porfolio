"use client";

import { deleteTechAction } from "@/modules/admin/actions";
import { Trash2, Copy, Star, Pencil } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ITech } from "@/modules/tech-stack/tech.dto";

// Màu nền cho Category
const categoryColors: Record<string, string> = {
  frontend: "bg-yellow-200",
  backend: "bg-blue-200",
  database: "bg-green-200",
  devops: "bg-red-200",
  mobile: "bg-purple-200",
  tool: "bg-gray-200",
};

// Màu border cho Level
const levelColors: Record<string, string> = {
  beginner: "border-gray-300",
  intermediate: "border-blue-400",
  advanced: "border-purple-500",
  master: "border-yellow-500 shadow-[0px_0px_10px_rgba(234,179,8,0.5)]",
};

export default function TechList({
  techs,
  onEdit,
}: {
  techs: ITech[];
  onEdit: (tech: ITech) => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (!confirm("Gỡ bỏ công nghệ này khỏi kho vũ khí?")) return;
    startTransition(async () => {
      const res = await deleteTechAction(id);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error("Lỗi xóa!");
      }
    });
  };

  const copyIconName = (name: string) => {
    navigator.clipboard.writeText(name);
    toast.success(`Copied: ${name}`);
  };

  if (!techs || techs.length === 0)
    return (
      <div className="text-center py-12 border-4 border-dashed border-gray-200 rounded-lg">
        <p className="text-gray-400 font-black uppercase text-xl">
          EMPTY ARMORY
        </p>
        <p className="text-sm text-gray-400">
          Chưa có công nghệ nào được nạp đạn.
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pb-10">
      {techs.map((tech) => (
        <div
          key={tech._id}
          className={`
                        relative group border-2 border-black bg-white p-4 
                        shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] 
                        hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] 
                        transition-all flex flex-col items-center gap-3
                        ${isPending ? "opacity-50 pointer-events-none" : ""}
                    `}
        >
          {/* 1. Badge Category (Góc trái) */}
          <span
            className={`absolute -top-3 -left-2 text-[9px] font-black uppercase border-2 border-black px-2 py-0.5 shadow-sm ${categoryColors[tech.category] || "bg-white"}`}
          >
            {tech.category}
          </span>

          {/* 2. Ngôi sao Featured (Góc phải) */}
          {tech.isFeatured && (
            <div
              className="absolute -top-3 -right-2 bg-black text-yellow-400 p-1 rounded-full border-2 border-yellow-400 shadow-sm z-10"
              title="Featured Skill"
            >
              <Star size={12} fill="currentColor" />
            </div>
          )}

          {/* 3. Visual Color Block (Level Ring) */}
          <div className="mt-2 relative">
            <div
              className={`w-14 h-14 rounded-full border-4 ${levelColors[tech.level]} flex items-center justify-center font-black text-xl text-white select-none transition-transform group-hover:scale-110`}
              style={{ backgroundColor: tech.color }}
            >
              {tech.name.charAt(0)}
            </div>
          </div>

          {/* 4. Thông tin */}
          <div className="text-center w-full">
            <h4
              className="font-black text-sm uppercase truncate w-full mb-1"
              title={tech.name}
            >
              {tech.name}
            </h4>

            {/* Level Badge Text */}
            <span className="inline-block text-[8px] font-bold uppercase tracking-wider text-gray-400 border border-gray-200 px-1 rounded mb-2">
              LV: {tech.level}
            </span>

            {/* Copy Icon Name */}
            <div
              onClick={() => copyIconName(tech.iconName)}
              className="text-[10px] font-mono text-gray-500 bg-gray-50 border border-dashed border-gray-300 rounded px-2 py-1 cursor-pointer hover:bg-black hover:text-white hover:border-black transition-colors flex justify-center items-center gap-1 group/copy"
            >
              <span className="truncate max-w-20">{tech.iconName}</span>
              <Copy
                size={8}
                className="opacity-0 group-hover/copy:opacity-100"
              />
            </div>
          </div>

          {/* 5. Nút Xóa (Hover mới hiện) */}
          <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {/* Nút Edit - Bấm cái gọi onEdit ngay */}
            <button
              onClick={() => onEdit(tech)}
              className="p-1.5 hover:bg-yellow-400 hover:text-black transition-all border border-black bg-white shadow-sm"
              title="Sửa"
            >
              <Pencil size={12} />
            </button>

            <button
              onClick={() => handleDelete(tech._id)}
              className="p-1.5 hover:bg-red-600 hover:text-white transition-all border border-black bg-white shadow-sm"
              title="Xóa"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
