// src/app/admin/page.tsx
import connectDB from '@/shared/lib/db';
import AdminDashboard from '@/modules/admin/components/dashboard/AdminDashboard';
import Message from '@/modules/core/models/Message';
import Tech from '@/modules/core/models/Tech';
import Block from '@/modules/core/models/Block'; // Import Model Block

// Helper này quan trọng: Nó biến _id (ObjectId) và Date thành string để không bị lỗi Client Component
const serialize = <T,>(data: T): T => JSON.parse(JSON.stringify(data));

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    await connectDB();

    const [messages, techs, blocks] = await Promise.all([
        Message.find().sort({ createdAt: -1 }).lean(),
        Tech.find().sort({ createdAt: -1 }).lean(),
        Block.find().sort({ order: 1, createdAt: -1 }).lean(), // Lấy Blocks, sort theo thứ tự
    ]);

    return (
        <AdminDashboard
            initialMessages={serialize(messages)}
            initialTechs={serialize(techs)}
            initialBlocks={serialize(blocks)} // Truyền Blocks xuống
        />
    );
}