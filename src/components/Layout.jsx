import { Outlet } from "react-router-dom";
import BottomNav from "./BottomNav";

function Layout() {
  return (
    <div className="min-h-screen bg-white pb-20 font-sans">
      <main className="">
        <Outlet /> {/** 각 페이지가 렌더링 */}
      </main>
      <BottomNav />
    </div>
  );
}
export default Layout;
