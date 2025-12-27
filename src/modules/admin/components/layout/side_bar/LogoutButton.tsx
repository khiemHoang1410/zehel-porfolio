import { logoutAction } from '@/modules/auth/actions'; // Import action logout
import { LogOut } from 'lucide-react';

export default function LogoutButton() {
    return (
        <form action={logoutAction} className="w-full">
            <button
                className="group flex w-full items-center gap-3 rounded-lg px-3 py-3 font-bold text-red-400 transition-all hover:bg-zinc-800 hover:text-red-300 hover:translate-x-1"
                type="submit"
            >
                <LogOut size={20} className="transition-transform group-hover:-translate-x-1" />
                Đăng xuất
            </button>
        </form>
    );
}