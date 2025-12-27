'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    // Ép kiểu 'credentials' rõ ràng
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
    // QUAN TRỌNG: Phải throw error ở đây. 
    // Next.js dùng error này để thực hiện lệnh chuyển hướng (Redirect).
    throw error;
  }
}
// 👇 Thêm hàm này
export async function logoutAction() {
  await signOut({ redirectTo: '/login' });
}
