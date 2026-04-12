// src/app/admin/page.tsx
import connectDB from "@/shared/lib/db";
import AdminDashboard from "@/modules/dashboard/AdminDashboard";
import Message from "@/modules/core/models/Message";
import Tech from "@/modules/core/models/Tech";
import Block from "@/modules/core/models/Block";
import Experience from "@/modules/core/models/Experience";

const serialize = (data: any) => JSON.parse(JSON.stringify(data));
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await connectDB();

  const [messages, techs, blocks, experiences] = await Promise.all([
    Message.find().sort({ createdAt: -1 }).lean(),
    Tech.find().sort({ createdAt: -1 }).lean(),
    Block.find().sort({ order: 1, createdAt: -1 }).lean(),
    Experience.find().sort({ createdAt: -1 }).lean(),
  ]);

  const stats = {
    totalBlocks: blocks.length,
    totalTechs: techs.length,
    totalMessages: messages.length,
    totalExperiences: experiences.length,
  };

  return (
    <AdminDashboard
      initialMessages={serialize(messages)}
      initialTechs={serialize(techs)}
      initialBlocks={serialize(blocks)}
      initialExperiences={serialize(experiences)}
      stats={stats}
    />
  );
}
