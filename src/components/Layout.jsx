import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="p-4">
        <Outlet /> {/** 각 페이지가 렌더링 */}
      </main>
    </div>
  );
}
export default Layout;
