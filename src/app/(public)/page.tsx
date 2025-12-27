import { getPortfolioData } from "@/modules/portfolio/services";
import PortfolioPage from "@/modules/portfolio/PortfolioPage";

export default async function Home() {
  // 1. Lấy dữ liệu (Server Side)
  const data = await getPortfolioData();

  // 2. Render UI
  return <PortfolioPage data={data} />;
}