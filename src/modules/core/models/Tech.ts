import mongoose, { Schema, Document, Model } from 'mongoose';

// 1. Interface định nghĩa cấu trúc dữ liệu thuần
export interface ITech {
  name: string;
  iconName: string;
  color: string;
  category: 'frontend' | 'backend' | 'database' | 'devops' | 'mobile' | 'tool';
  level: 'beginner' | 'intermediate' | 'advanced' | 'master';
  isFeatured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

// 2. Interface dành cho Mongoose Document
export interface ITechDocument extends ITech, Document {}

const TechSchema = new Schema<ITechDocument>(
  {
    name: { 
      type: String, 
      required: [true, 'Tên công nghệ là bắt buộc'], 
      unique: true, 
      trim: true 
    },
    iconName: { type: String, required: true },
    color: { type: String, default: '#000000' },
    category: { 
      type: String, 
      enum: ['frontend', 'backend', 'database', 'devops', 'mobile', 'tool'], 
      default: 'tool',
      index: true // Tối ưu tìm kiếm theo loại
    },
    level: { 
      type: String, 
      enum: ['beginner', 'intermediate', 'advanced', 'master'], 
      default: 'intermediate' 
    },
    isFeatured: { 
      type: Boolean, 
      default: false,
      index: true // Tối ưu lọc các mục nổi bật
    },
  },
  { 
    timestamps: true, // Tự động tạo createdAt và updatedAt
    versionKey: false // Loại bỏ trường __v không cần thiết
  }
);

// 3. Khởi tạo Model (Tránh lỗi overwrite model trong Next.js/Hot Reload)
const Tech: Model<ITechDocument> = mongoose.models.Tech || mongoose.model<ITechDocument>('Tech', TechSchema);

export default Tech;
