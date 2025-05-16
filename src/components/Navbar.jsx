import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "홈" },
  { to: "/routine", label: "운동 루틴" },
  { to: "/record", label: "기록하기" },
  { to: "/stats", label: "건강 통계" },
  { to: "/settings", label: "설정" },
];

function Navbar() {
  return (
    <nav>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            isActive ? "font-bold text-green-600" : "text-gray-600"
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
export default Navbar;
