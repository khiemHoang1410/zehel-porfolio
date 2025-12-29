import HomePage from "@/modules/public/HomePage";
import { getPortfolioData } from "@/modules/public/services";

export default async function Home() {
  // 1. Lấy dữ liệu (Server Side)
  const data = await getPortfolioData();

  // 2. Render UI
  return <HomePage data={data} />;
}