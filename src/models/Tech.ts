// src/models/Tech.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITech extends Document {
  name: string;      // Tên hiển thị (React, Node.js...)
  iconName: string;  // Tên icon trong react-icons (SiReact, SiNodedotjs...)
  color: string;     // Mã màu HEX (#61DAFB) - Dùng HEX an toàn hơn class Tailwind dynamic
  createdAt: Date;
}

const TechSchema = new Schema<ITech>({
  name: { type: String, required: true },
  iconName: { type: String, required: true },
  color: { type: String, default: '#000000' },
  createdAt: { type: Date, default: Date.now },
});

const Tech = mongoose.models.Tech || mongoose.model<ITech>('Tech', TechSchema);
export default Tech;