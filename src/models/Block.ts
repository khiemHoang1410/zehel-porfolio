// models/Block.ts
import mongoose, { Schema, Document } from 'mongoose';

// Định nghĩa kiểu dữ liệu cho TypeScript (để code nó gợi ý cho sướng)
export interface IBlock extends Document {
  title: string;
  type: 'project' | 'snippet' | 'social' | 'note' | 'status';
  content?: string; // Nội dung Markdown hoặc Text ngắn
  link?: string;    // Link bấm vào (Github, Demo, FB...)
  imageUrl?: string; // Link ảnh cover (cho nhẹ DB)
  size: 'small' | 'medium' | 'large'; // Kích thước ô
  color: string;    // Màu nền (lưu class Tailwind, ví dụ: 'bg-yellow-400')
  order: number;    // Số để sắp xếp vị trí
  isVisible: boolean; // Ẩn/Hiện
  createdAt: Date;
}

const BlockSchema = new Schema<IBlock>({
  title: { type: String, required: true },
  type: { 
    type: String, 
    required: true, 
    enum: ['project', 'snippet', 'social', 'note', 'status','contact'], 
    default: 'note' 
  },
  content: { type: String, default: '' },
  link: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  size: { 
    type: String, 
    enum: ['small', 'medium', 'large'], 
    default: 'small' 
  },
  color: { type: String, default: 'bg-white' }, 
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

// Cái dòng này quan trọng: Kiểm tra xem Model đã có chưa để tránh lỗi khi Next.js reload lại
const Block = mongoose.models.Block || mongoose.model<IBlock>('Block', BlockSchema);

export default Block;