import connectDB from "@/shared/lib/db";
import Block from "@/modules/core/models/Block";
import Tech from "@/modules/core/models/Tech";
import Experience from "@/modules/core/models/Experience";

// Helper để serialize data một cách an toàn và giữ được kiểu dữ liệu
const serialize = (data: any[]): any[] => {
    return data.map(item => ({
        ...item,
        _id: item._id.toString(),
        // Convert Date sang ISO string để truyền qua ranh giới Server/Client
        createdAt: item.createdAt?.toISOString(),
        updatedAt: item.updatedAt?.toISOString(),
    }));
};

export async function getPortfolioData() {
    await connectDB();

    // Fetch song song cho nhanh
    const [blocks, techs, experiences] = await Promise.all([
        Block.find({ isVisible: true }).sort({ order: 1 }).lean(),
        Tech.find().sort({ createdAt: 1 }).lean(),
        Experience.find().sort({ year: -1 }).lean(),
    ]);

    return {
        blocks: serialize(blocks),
        techs: serialize(techs),
        experiences: serialize(experiences),
    };
}