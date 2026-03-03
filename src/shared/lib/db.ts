import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('❌ Lỗi nghiêm trọng: Thiếu biến môi trường MONGODB_URI. Hãy kiểm tra file .env.local ngay, Chủ tịch ơi!');
}

/** * Singleton Pattern cho MongoDB Connection 
 * Giúp tránh việc tạo quá nhiều kết nối mỗi khi Next.js reload (HMR)
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Khai báo global type để TypeScript không mắng Chủ tịch
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache;
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  // 1. Nếu đã có kết nối rồi, dùng luôn cái cũ cho nhanh
  if (cached.conn) {
    return cached.conn;
  }

  // 2. Nếu chưa có kết nối, tạo một lời hứa (promise) để kết nối
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Giới hạn 10 kết nối để tiết kiệm tài nguyên
    };

    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      console.log('🚀 [Database]: Đã kết nối MongoDB thành công. Chủ tịch cứ yên tâm làm việc!');
      return mongoose;
    });
  }

  try {
    // Đợi lời hứa hoàn thành và lưu kết nối vào cache
    cached.conn = await cached.promise;
  } catch (e) {
    // Nếu lỗi thì hủy bỏ lời hứa để lần sau thử lại
    cached.promise = null;
    console.error('❌ [Database]: Kết nối thất bại. Kiểm tra lại mạng hoặc URI nhé Chủ tịch!');
    throw e;
  }

  return cached.conn;
}

export default connectDB;