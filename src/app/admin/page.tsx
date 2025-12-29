// src/app/admin/page.tsx
import connectDB from '@/shared/lib/db';
import AdminDashboard from '@/modules/admin/components/dashboard/AdminDashboard';
import Message from '@/modules/core/models/Message';
import Tech from '@/modules/core/models/Tech';
import Block from '@/modules/core/models/Block';

const serialize = <T,>(data: T): T => JSON.parse(JSON.stringify(data));

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    await connectDB();

    // 🔥 FETCH ALL THE DATA
    // 1. Lấy Full list blocks cho tab Project
    // 2. Lấy Full list messages, techs (sau này pagination sau)
    // 3. Đếm số lượng để hiện Stats

    const [messages, techs, blocks] = await Promise.all([
        Message.find().sort({ createdAt: -1 }).lean(),
        Tech.find().sort({ createdAt: -1 }).lean(),
        Block.find().sort({ order: 1, createdAt: -1 }).lean(),
    ]);

    // Chuẩn bị cục data stats cho Dashboard Overview
    const stats = {
        totalBlocks: blocks.length,
        totalTechs: techs.length,
        totalMessages: messages.length,
        
    };

    return (
        <AdminDashboard
            initialMessages={serialize(messages)}
            initialTechs={serialize(techs)}
            initialBlocks={serialize(blocks)}
            stats={stats} // 👈 Truyền thêm cái này xuống
        />
    );
}