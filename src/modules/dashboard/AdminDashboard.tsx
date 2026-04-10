// src/modules/admin/components/dashboard/AdminDashboard.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { LayoutDashboard, Mail, Cpu, Briefcase, Home } from "lucide-react";

import ProjectManager from "@/modules/projects/components/ProjectManager";
import DashboardOverview from "./DashboardOverview";
import InboxManager from "@/modules/inbox/components/InboxManager";
import ExperienceManager from "@/modules/experiences/components/ExperienceManager";

import { IBlock } from "@/modules/core/dtos/block.dto";
import { ITech } from "@/modules/tech-stack/tech.dto";
import TechsManager from "@/modules/tech-stack/components/TechsManager";

interface DashboardProps {
  initialBlocks?: IBlock[];
  initialTechs?: ITech[];
  initialMessages?: any[];
  initialExperiences?: any[];
  stats: {
    totalBlocks: number;
    totalTechs: number;
    totalMessages: number;
    totalExperiences: number;
  };
}

export default function AdminDashboard({
  initialBlocks = [],
  initialTechs = [],
  initialMessages = [],
  initialExperiences = [],
  stats,
}: DashboardProps) {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "overview";

  const getPageTitle = () => {
    switch (currentTab) {
      case "overview":
        return { title: "Tổng Quan Hệ Thống", icon: Home }; // Trang chủ
      case "projects":
        return { title: "Quản lý Dự Án / Blocks", icon: LayoutDashboard };
      case "techs":
        return { title: "Kho Vũ Khí (Tech Stack)", icon: Cpu };
      case "messages":
        return { title: "Hòm Thư Liên Hệ", icon: Mail };
      case "experience":
        return { title: "Hành Trình Sự Nghiệp", icon: Briefcase };
      default:
        return { title: "Dashboard", icon: LayoutDashboard };
    }
  };

  const { title, icon: Icon } = getPageTitle();

  return (
    <div className="w-full h-full">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3 border-b-2 border-gray-200 pb-4">
        <div className="p-2 bg-black text-white rounded-lg shadow-lg">
          <Icon size={24} />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tight text-gray-800">
          {title}
        </h2>
      </div>

      {/* Content Area */}
      <div className="min-h-[500px]">
        {/* 👇 TRANG CHỦ DASHBOARD */}
        {currentTab === "overview" && (
          <DashboardOverview
            stats={stats}
            recentMessages={initialMessages.slice(0, 5)} // Lấy 5 tin mới nhất
            recentBlocks={initialBlocks}
          />
        )}

        {currentTab === "projects" && (
          // 👇 Gọi Manager, truyền data blocks vào
          <ProjectManager initialData={initialBlocks} />
        )}

        {currentTab === "techs" && <TechsManager initialData={initialTechs} />}

        {currentTab === "messages" && (
          <div className="p-10 border-4 border-dashed border-gray-300 text-center text-gray-400 rounded-xl">
            <InboxManager messages={initialMessages} />
          </div>
        )}

        {currentTab === "experience" && (
          <ExperienceManager initialData={initialExperiences} />
        )}
      </div>
    </div>
  );
}
