import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Cấu hình chuyên nghiệp tại đây */
  reactCompiler: true,
  images: {
    // Cho phép hiển thị ảnh từ các domain này (rất cần cho Portfolio)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      }
    ],
  },
  // Bật tính năng nén file để web load nhanh hơn, tăng trải nghiệm người dùng
  compress: true,
};

export default nextConfig;