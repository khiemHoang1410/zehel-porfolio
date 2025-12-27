// src/app/(public)/layout.tsx
import DockWrapper from "@/shared/components/ui/DockWrapper"; // Nhớ sửa đường dẫn import
import ContactButton from "@/shared/components/ui/ContactButton";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen bg-[#f0f0f0]">
        {children}
        
        {/* Các thành phần UI chỉ hiện ở trang Public */}
        <ContactButton />
        <DockWrapper />
    </div>
  );
}