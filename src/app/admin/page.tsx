import connectDB from '@/shared/lib/db';

// import Experience from '@/models/Experience';
import AdminDashboard from '@/modules/admin/components/AdminDashboard';
import Message from '@/modules/core/models/Message';
import Tech from '@/modules/core/models/Tech';

// Helper để serialize data (tránh lỗi object ID của Mongoose)
const serialize = (data: any[]) => JSON.parse(JSON.stringify(data));

export default async function AdminPage() {
    await connectDB();

    // 🔥 FETCH SONG SONG (Clean & Performance)
    const [messages, techs] = await Promise.all([
        Message.find().sort({ createdAt: -1 }).lean(),
        Tech.find().sort({ createdAt: -1 }).lean(),
        // Experience.find().sort({ year: -1 }).lean()
    ]);

    return (
        <AdminDashboard 
            messages={serialize(messages)}
            techs={serialize(techs)}
            // experiences={serialize(exps)}
        />
    );
}