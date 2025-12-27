// src/app/admin/layout.tsx
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
// ... import các icon

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Check auth lần nữa cho chắc (dù Middleware đã check)
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar đơn giản */}
      <aside className="w-64 bg-black text-white p-6 hidden md:block">
         <div className="font-black text-2xl mb-8 text-yellow-400">ZEHEL.ADMIN</div>
         <nav className="space-y-4">
            <Link href="/admin" className="block hover:text-yellow-300">Dashboard</Link>
            <Link href="/" target="_blank" className="block text-gray-500 hover:text-white">Xem Web</Link>
         </nav>
      </aside>

      {/* Nội dung chính */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}