// src/app/(public)/projects/page.tsx
import ProjectForm from "@/modules/projects/components/ProjectForm";
import ProjectList from "@/modules/projects/components/ProjectList";
import connectDB from "@/shared/lib/db"; // 1. Import kết nối DB
import Block from "@/modules/core/models/Block"; // 2. Import Model Block

// Hàm này để biến đổi ObjectId và Date thành string cho Client Component đỡ lỗi
const serialize = (data: any) => JSON.parse(JSON.stringify(data));

// 3. Thêm async để fetch data server-side
export default async function AdminProjectsPage() {
  // 4. Gọi dữ liệu từ MongoDB
  await connectDB();
  const blocks = await Block.find({}).sort({ createdAt: -1 }).lean();

  // 5. Serialize dữ liệu
  const cleanData = serialize(blocks);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold uppercase">Quản lý Dự án</h1>
        <span className="text-xs font-bold bg-yellow-300 px-2 py-1 border border-black">
          Total: {blocks.length}
        </span>
      </div>

      <ProjectForm />

      <div className="border-t-2 border-dashed border-gray-300 my-6" />

      {/* 6. 🔥 QUAN TRỌNG NHẤT: Truyền data vào đây */}
      <ProjectList data={cleanData} />
    </div>
  );
}
