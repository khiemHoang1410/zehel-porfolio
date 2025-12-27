import NextAuth from 'next-auth';
import { authConfig } from './auth.conf';

const { auth } = NextAuth(authConfig);

//  proxy theo chuẩn Next.js 16
export const proxy = auth; 

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
