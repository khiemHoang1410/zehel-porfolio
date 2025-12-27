import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', // Nếu chưa login thì đá về đây
  },
  // src/auth.config.ts
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');

      if (isOnAdmin) {
        if (isLoggedIn) return true; // Có user -> Cho vào Admin
        return false; // Không user -> Bị đẩy về Login (tự kèm callbackUrl)
      }

      // Nếu đã login rồi mà vẫn ở trang Login -> Đẩy sang Admin ngay
      if (isLoggedIn && nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/admin', nextUrl));
      }

      return true;
    },
  },

  providers: [], // Để trống ở đây để Middleware chạy nhẹ nhàng
} satisfies NextAuthConfig;