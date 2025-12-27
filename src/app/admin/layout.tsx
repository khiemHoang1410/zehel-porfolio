import { auth } from "@/auth";
import { redirect } from "next/navigation";
// 👇 Import từ MODULES thay vì _components
import AdminSidebar from "@/modules/admin/components/layout/side_bar/AdminSidebar";
import AdminHeader from "@/modules/admin/components/layout/side_bar/AdminHeader";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    console.log("🔍 AdminLayout: Bắt đầu check Auth...");
    const session = await auth();
    console.log("🔍 AdminLayout: Kết quả session ->", session?.user?.email || "Không có session");

    if (!session) {
      console.log("⚠️ AdminLayout: Session null -> Đang Redirect về login...");
      redirect("/login");
    }
  } catch (error) {
    // ⚠️ NEXT_REDIRECT là một loại lỗi đặc biệt của Next.js để chuyển trang
    // Chúng ta KHÔNG được chặn nó, phải ném nó ra lại
    if ((error as any).message === 'NEXT_REDIRECT') {
      throw error;
    }

    // Nếu là lỗi khác (DB, Timeout...) thì log ra
    console.error("💥 LỖI CHÍ TỬ TẠI ADMIN LAYOUT:", error);
    // Có thể throw tiếp để hiện màn hình lỗi 500 hoặc render UI lỗi tạm
    throw error;
  }

  return (
    <div className="min-h-screen bg-gray-100 font-mono">
      <AdminSidebar />
      <div className="flex flex-col md:ml-64 min-h-screen transition-all duration-300">
        <AdminHeader />
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}