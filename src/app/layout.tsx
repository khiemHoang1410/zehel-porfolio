// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// Import cái Wrapper mình vừa tạo chứ không import trực tiếp FloatingDock
import DockWrapper from "@/shared/components/ui/DockWrapper"; 
import ContactButton from "@/shared/components/ui/ContactButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zehel Portfolio",
  description: "IT Student & Developer Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}
      >
        {/* Phần nội dung trang web */}
        {children}
        
        {/* Các thành phần cố định (Fixed UI) */}
        <ContactButton />
        
        {/* Dock Navigation - Luôn nổi ở dưới cùng */}
        <DockWrapper />
      </body>
    </html>
  );
}