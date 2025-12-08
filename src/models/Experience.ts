import mongoose, { Schema, Document } from 'mongoose';

export interface IExperience extends Document {
  title: string;       // Chức danh (Senior Dev)
  company: string;     // Công ty (Google, Facebook...)
  year: string;        // Thời gian (2023 - Present)
  description: string; // Mô tả ngắn
  tags: string[];      // Tech stack (React, Node...)
  createdAt: Date;
}

const ExperienceSchema = new Schema<IExperience>({
  title: { type: String, required: true },
  company: { type: String, required: true },
  year: { type: String, required: true },
  description: { type: String, default: '' },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

const Experience = mongoose.models.Experience || mongoose.model<IExperience>('Experience', ExperienceSchema);
export default Experience;