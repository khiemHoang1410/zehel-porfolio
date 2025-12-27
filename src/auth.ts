// src/auth.ts
import NextAuth, { AuthError } from 'next-auth';
import { authConfig } from './auth.conf';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

const ADMIN_ACC = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
};
// src/actions/auth.ts
export async function authenticate(prevState: string | undefined, formData: FormData) {
    try {
        await signIn('credentials', {
            ...Object.fromEntries(formData),
            redirectTo: '/admin', // 👈 Đảm bảo có dòng này
        });
    } catch (error) {
        // 1. Nếu là lỗi AuthError thì mới trả về chuỗi thông báo
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Sai email hoặc mật khẩu rồi đại vương ơi!';
                default:
                    return 'Lỗi xác thực hệ thống.';
            }
        }
        // 2. QUAN TRỌNG: Nếu không phải AuthError, phải THROW nó đi 
        // để Next.js xử lý việc Redirect thành công.
        throw error;
    }
}

// 👇 THÊM handlers VÀO ĐÂY
export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    if (email === ADMIN_ACC.email && password === ADMIN_ACC.password) {
                        return { id: '1', name: 'Zehel Admin', email: ADMIN_ACC.email };
                    }
                }
                return null;
            },
        }),
    ],
});