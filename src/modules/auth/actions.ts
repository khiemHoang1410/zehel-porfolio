'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

/**
 * Xử lý đăng nhập
 */
export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', Object.fromEntries(formData));
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Sai email hoặc mật khẩu rồi đại vương ơi!';
        case 'CallbackRouteError':
          return 'Lỗi xác thực luồng đăng nhập.';
        default:
          return 'Đã xảy ra lỗi không xác định.';
      }
    }
    // QUAN TRỌNG: Phải throw error để Next.js xử lý lệnh redirect sau khi signIn thành công
    throw error;
  }
}
