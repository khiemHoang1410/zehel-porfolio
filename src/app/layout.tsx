//src/app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Nâng cấp metadata ở đây
export const metadata: Metadata = {
  title: {
    default: "Zehel Portfolio | IT Student & Fullstack Developer",
    template: "%s | Zehel"
  },
  description: "Bộ não ADHD đầy ý tưởng điên rồ, chuyên biến caffeine thành code chất lượng cao.",
  keywords: ["Zehel", "Portfolio", "Fullstack Developer", "ADHD Coder", "Next.js 16"],
  authors: [{ name: "Zehel" }],
  openGraph: {
    title: "Zehel Portfolio",
    description: "Code Like A Madness",
    url: "https://zehel.dev", // Thay bằng domain của ngài
    siteName: "Zehel Portfolio",
    images: [
      {
        url: "/og-image.png", // Nhớ quăng 1 cái ảnh vào public nha
        width: 1200,
        height: 630,
      },
    ],
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#f0f0f0] selection:bg-yellow-300`}
      >
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}