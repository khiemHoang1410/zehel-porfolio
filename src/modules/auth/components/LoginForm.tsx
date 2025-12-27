'use client';

import { useActionState } from 'react'; // React 19 chuẩn
import { authenticate } from '../actions';
import { Loader2, Lock, User } from 'lucide-react';

export default function LoginForm() {
    // 1. Sửa tham số: formAction chính là cái ngài cần bỏ vào thẻ form
    // 2. isPending đã thay thế hoàn toàn cho useFormStatus().pending
    const [errorMessage, formAction, isPending] = useActionState(
        authenticate,
        undefined
    );

    return (
        <div className="w-full max-w-md bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-black uppercase tracking-tighter">Zehel Gate</h1>
                <p className="text-gray-500 font-mono text-sm mt-2">Khu vực dành riêng cho Admin</p>
            </div>

            {/* FIX: Đổi dispatch thành formAction */}
            <form action={formAction} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block font-bold text-sm mb-1">Email</label>
                    <div className="relative">
                        <User className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            className="w-full pl-10 p-3 border-2 border-black outline-none focus:bg-yellow-50 font-mono"
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email" // Fix cảnh báo DOM
                            placeholder="admin@zehel.com"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="password" className="block font-bold text-sm mb-1">Mật khẩu</label>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                        <input
                            className="w-full pl-10 p-3 border-2 border-black outline-none focus:bg-yellow-50 font-mono"
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="current-password" // Fix cảnh báo DOM
                            placeholder="••••••"
                            required
                            minLength={6}
                        />
                    </div>
                </div>

                {/* Hiển thị lỗi nếu có */}
                {errorMessage && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 text-sm font-bold animate-pulse" role="alert">
                        <p>{errorMessage}</p>
                    </div>
                )}

                {/* Truyền isPending trực tiếp vào nút, không cần tách Component con cho phức tạp */}
                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-black text-white font-bold py-4 mt-6 hover:bg-zinc-800 hover:-translate-y-1 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-0"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="animate-spin" size={20} /> 
                            <span>ĐANG XÁC THỰC...</span>
                        </>
                    ) : (
                        'MỞ CỬA THẦN KỲ'
                    )}
                </button>
            </form>
        </div>
    );
}
