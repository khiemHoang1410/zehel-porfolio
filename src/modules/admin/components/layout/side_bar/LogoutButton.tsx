'use client';

import { LogOut, Loader2 } from 'lucide-react';
import { signOut } from 'next-auth/react'; // 👈 Dùng hàng chính hãng Client Side
import { useState } from 'react';

export default function LogoutButton() {
    const [isPending, setIsPending] = useState(false);

    const handleLogout = async () => {
        setIsPending(true);

        // Hàm này sẽ tự gọi API /api/auth/signout
        // Tự xử lý CSRF Token và Redirect luôn, không lo crash
        await signOut({
            callbackUrl: '/login',
            redirect: true
        });
    };

    return (
        <button
            onClick={handleLogout}
            disabled={isPending}
            className="group flex w-full items-center gap-3 rounded-lg px-3 py-3 font-bold text-red-400 transition-all hover:bg-zinc-800 hover:text-red-300 hover:translate-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isPending ? (
                <Loader2 size={20} className="animate-spin" />
            ) : (
                <LogOut size={20} className="transition-transform group-hover:-translate-x-1" />
            )}
            {isPending ? 'Đang thoát...' : 'Đăng xuất'}
        </button>
    );
}