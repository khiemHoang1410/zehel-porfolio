import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login', 
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith('/admin');
      const isOnLoginPage = nextUrl.pathname.startsWith('/login');

      // 1. Kiểm tra quyền truy cập vào Admin
      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // Tự động chuyển hướng về /login
      }

      // 2. Nếu đã login, không cho quay lại trang Login nữa
      if (isLoggedIn && isOnLoginPage) {
        return Response.redirect(new URL('/admin', nextUrl));
      }

      // 3. Các trang khác (Home, About, Projects) cho phép truy cập tự do
      return true;
    },
  },
  providers: [], 
} satisfies NextAuthConfig;
