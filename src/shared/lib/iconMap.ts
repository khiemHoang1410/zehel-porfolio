// src/lib/iconMap.ts
import * as SiIcons from 'react-icons/si';

// Hàm này nhận vào chuỗi tên icon (vd: "SiReact") và trả về Component tương ứng
export const getIconComponent = (iconName: string) => {
  // @ts-ignore - Bỏ qua check type chặt chẽ đoạn này để map dynamic cho lẹ
  const Icon = SiIcons[iconName as keyof typeof SiIcons];
  return Icon || SiIcons.SiCdprojekt; // Icon mặc định nếu không tìm thấy (để hình con chim hoặc gì đó tùy ngài)
};