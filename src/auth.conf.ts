import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', // Nếu chưa login thì đá về đây
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdminPage = nextUrl.pathname.startsWith('/admin');

      if (isAdminPage) {
        if (isLoggedIn) return true; // Đã login -> Cho vào
        return false; // Chưa login -> Next.js tự redirect về /login
      }
      return true;
    },
  },
  providers: [], // Để trống ở đây để Middleware chạy nhẹ nhàng
} satisfies NextAuthConfig;