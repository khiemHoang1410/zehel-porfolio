import NextAuth from 'next-auth';
import { authConfig } from './auth.conf';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

const ADMIN_ACC = {
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
};

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
