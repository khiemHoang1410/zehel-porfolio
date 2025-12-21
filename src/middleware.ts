import NextAuth from 'next-auth';
import { authConfig } from './auth.conf';

export default NextAuth(authConfig).auth;

export const config = {
  // Chạy middleware trên mọi route trừ file tĩnh và ảnh
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};