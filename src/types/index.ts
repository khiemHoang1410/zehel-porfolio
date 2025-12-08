// src/types/index.ts

// Định nghĩa cái Block mà Frontend sẽ dùng
export type BlockType = {
  _id: string;
  title: string;
  type: 'project' | 'snippet' | 'social' | 'note' | 'status' | 'contact';
  content: string;
  link?: string;
  imageUrl?: string;
  size: 'small' | 'medium' | 'large';
  color: string;
  order: number;
  createdAt: string; // Ở client nó là chuỗi
};