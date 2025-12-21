import NextAuth from 'next-auth';
import { authConfig } from './auth.conf';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

// Hard-code tài khoản Admin (sau này thích thì đổi sang check DB)
const ADMIN_ACC = {
  email: process.env.ADMIN_EMAIL || 'admin@zehel.com',
  password: process.env.ADMIN_PASSWORD || '123456',
};

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          // Check pass đơn giản (vì ngài Zehel đang vibe, chưa cần hash bcrypt vội)
          if (email === ADMIN_ACC.email && password === ADMIN_ACC.password) {
            return { id: '1', name: 'Zehel Admin', email: ADMIN_ACC.email };
          }
        }
        return null;
      },
    }),
  ],
});