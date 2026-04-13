import { Outlet } from "react-router-dom";
import Header from "@/Header";
import crumpledPaper from "@/assets/crumpledPaper.jpg"

export default function AppLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <Header />
      <div className="relative flex-1 overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${crumpledPaper})` }}>
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />
        <div className="relative z-10 flex h-full min-h-0 items-center justify-center overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
