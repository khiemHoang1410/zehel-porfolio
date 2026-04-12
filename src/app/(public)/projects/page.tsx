// src/app/(public)/projects/page.tsx
import connectDB from "@/shared/lib/db";
import Block from "@/modules/core/models/Block";
import LabBoard from "@/modules/public/components/lab/LabBoard";
import PageTransition from "@/shared/components/ui/PageTransition";

async function getProjectData() {
  await connectDB();
  const blocks = await Block.find({
    isVisible: true,
    type: { $in: ['project', 'snippet'] },
  })
    .sort({ order: 1, createdAt: -1 })
    .lean();

  return blocks.map((b: any) => ({
    ...b,
    _id: b._id.toString(),
    createdAt: b.createdAt?.toString(),
  }));
}

export default async function ProjectsPage() {
  const blocks = await getProjectData();

  return (
    <PageTransition>
      <main className="min-h-screen bg-[#f0f0f0] p-4 md:p-8 pb-32">
        <LabBoard blocks={blocks} />
      </main>
    </PageTransition>
  );
}
