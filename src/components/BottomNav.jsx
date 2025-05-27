// src/components/BottomNav.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import Button from "@/components/ui/Button";

const navItems = [
  { to: "/", label: "홈", img: "🏠" },
  { to: "/routine", label: "운동 루틴", img: "📅" },
  { to: "/record", label: "기록하기", img: "🧮" },
  { to: "/stats", label: "건강 통계", img: "📈" },
  { to: "/settings", label: "설정", img: "⚙️" },
];

function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-btn-main h-16 flex justify-around items-center rounded-tl-xl rounded-tr-xl z-40">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => ` ${isActive ? "font-semibold" : ""}
          hover:font-semibold`}
        >
          <button>
            <div>{item.img}</div>
            <div className="text-xs text-main">{item.label}</div>
          </button>
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;
