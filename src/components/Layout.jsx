import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import BottomNav from "./BottomNav";

function Layout() {
  return (
    <div className="min-h-screenbg-primary pb-20 font-sans">
      <main className="p-4">
        <Outlet /> {/** 각 페이지가 렌더링 */}
      </main>
      <BottomNav />
    </div>
  );
}
export default Layout;
