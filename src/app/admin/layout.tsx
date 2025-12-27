import { auth } from "@/auth";
import { redirect } from "next/navigation";
// 👇 Import từ MODULES thay vì _components
import AdminSidebar from "@/modules/admin/components/layout/side_bar/AdminSidebar";
import AdminHeader from "@/modules/admin/components/layout/side_bar/AdminHeader";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="min-h-screen bg-gray-100 font-mono">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Content Wrapper */}
      <div className="flex flex-col md:ml-64 min-h-screen transition-all duration-300">
        <AdminHeader />
        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}