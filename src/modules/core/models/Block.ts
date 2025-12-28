// models/Block.ts
import mongoose, { Schema, Document } from 'mongoose';
import { BlockSize, BlockType } from '../dtos/block.dto';

// Định nghĩa kiểu dữ liệu cho TypeScript (để code nó gợi ý cho sướng)
export interface IBlock {
  id: string;          // ID của MongoDB luôn là string
  title: string;
  content?: string;     // Dấu ? nghĩa là có thể không có
  type: BlockType;
  size: BlockSize;
  link?: string;
  imageUrl?: string;
  color?: string;
  isVisible: boolean;
  order: number;        // Để sắp xếp vị trí

  // Khi qua Next.js Server Component -> Client, Date thường bị biến thành string
  createdAt: string | Date;
  updatedAt: string | Date;
}

const BlockSchema = new Schema<IBlock>({
  title: { type: String, required: true },
  type: {
    type: String,
    required: true,
    enum: ['project', 'snippet', 'social', 'note', 'status'],
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