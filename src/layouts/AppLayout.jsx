import { Outlet } from "react-router-dom";
import Header from "@/Header";
import crumpledPaper from "@/assets/crumpledPaper.jpg"

export default function AppLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="h-full relative flex-1 bg-cover bg-center" style={{ backgroundImage: `url(${crumpledPaper})` }}>
        <div className="absolute inset-0 bg-white/70 backdrop-blur-[1px]" />
        <div className="h-full relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
