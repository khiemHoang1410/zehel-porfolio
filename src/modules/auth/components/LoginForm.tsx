'use client';

import { useActionState } from 'react';
import { authenticate } from '@/modules/auth/actions';
import { Loader2, Lock, User, ArrowRight, Sparkles } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginForm() {
    const [errorMessage, dispatch] = useActionState(authenticate, undefined);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-full max-w-md bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden"
        >
            {/* Background Decor - Có hiệu ứng nổi bồng bềnh */}
            <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 w-24 h-24 bg-yellow-400 rounded-full border-4 border-black -z-0"
            />
            <motion.div
                animate={{ x: [0, 10, 0], rotate: [12, -12, 12] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 w-16 h-16 bg-purple-400 border-4 border-black -z-0"
            />

            <div className="text-center mb-8 relative z-10">
                <motion.h1
                    whileHover={{ scale: 1.05, skewX: -5 }}
                    className="text-5xl font-black uppercase tracking-tighter italic leading-none cursor-default"
                >
                    GATE <span className="text-yellow-500 drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">KEEPER</span>
                </motion.h1>
                <div className="flex justify-center gap-2 mt-3">
                    <span className="text-black font-bold text-xs bg-yellow-200 px-2 py-1 border-2 border-black rotate-2">
                        RESTRICTED AREA
                    </span>
                    <span className="text-black font-bold text-xs bg-cyan-200 px-2 py-1 border-2 border-black -rotate-2">
                        BOSS ONLY
                    </span>
                </div>
            </div>

            <form action={dispatch} className="space-y-5 relative z-10">
                {/* Input Email */}
                <div className="space-y-2">
                    <label htmlFor="email" className="block font-black text-sm uppercase tracking-widest">Danh tính</label>
                    <div className="relative group">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                        <input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="admin@zehel.com"
                            required
                            // Tailwind CSS focus class đã xử lý hết hiệu ứng bạn cần:
                            className="w-full pl-10 p-3 border-4 border-black outline-none focus:bg-yellow-50 focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all font-bold"
                        />
                    </div>

                </div>

                {/* Input Password */}
                <div className="space-y-2">
                    <label htmlFor="password" className="block font-black text-sm uppercase tracking-widest">Mật mã</label>
                    <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" size={20} />
                        <input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="••••••"
                            required
                            // Tailwind CSS đã xử lý hiệu ứng bóng đổ màu tím khi focus:
                            className="w-full pl-10 p-3 border-4 border-black outline-none focus:bg-yellow-50 focus:shadow-[6px_6px_0px_0px_rgba(139,92,246,1)] transition-all font-bold"
                        />
                    </div>

                </div>

                {/* Error Message với hiệu ứng Rung (Shake) */}
                <AnimatePresence mode="wait">
                    {errorMessage && (
                        <motion.div
                            initial={{ x: -10, opacity: 0 }}
                            animate={{ x: [0, -10, 10, -10, 10, 0], opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="bg-red-500 border-4 border-black p-3 flex items-center gap-2"
                        >
                            <Sparkles className="text-white animate-pulse" size={18} />
                            <span className="font-black text-white text-xs uppercase italic">{errorMessage}</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                <SubmitButton />
            </form>
        </motion.div>
    );
}
function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <div className="relative mt-4 group">
            {/* Lớp bóng phía dưới - Hình chữ nhật thứ 1 */}
            <div className="absolute inset-0 bg-black translate-x-[6px] translate-y-[6px]" />

            {/* Cái nút thực tế - Hình chữ nhật thứ 2 */}
            <motion.button
                whileTap={{ x: 3, y: 3 }} // Khi nhấn thì lún xuống một nửa
                // hover={{ x: 6, y: 6 }} // Khi hover thì lún khít vào cái bóng luôn
                disabled={pending}
                type="submit"
                style={{ x: 0, y: 0 }} // Trạng thái mặc định
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="relative w-full bg-white text-black border-4 border-black font-black py-4 flex justify-center items-center gap-2 disabled:opacity-50 overflow-hidden active:translate-x-[6px] active:translate-y-[6px] hover:translate-x-[6px] hover:translate-y-[6px] transition-all"
            >
                {pending ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <div className="flex items-center gap-3">
                        <span className="leading-none uppercase tracking-tighter">XÁC NHẬN TRUY CẬP</span>
                        <div className="relative w-5 h-5 overflow-hidden">
                            <ArrowRight
                                className="absolute inset-0 transition-transform duration-300 group-hover:translate-x-8 group-hover:opacity-0"
                                size={20}
                            />
                            <ArrowRight
                                className="absolute inset-0 -translate-x-8 opacity-0 transition-transform duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                                size={20}
                            />
                        </div>
                    </div>
                )}
            </motion.button>
        </div>
    );
}