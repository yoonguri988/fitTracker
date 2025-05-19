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
    <nav className="fixed bottom-2 left-0 right-0 bg-green-500 shadow-inner h-16 flex justify-around items-center rounded-xl z-50">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            `text-base font-semibold ${
              isActive ? "text-green-800" : "text-white"
            } hover:text-green-800`
          }
        >
          <button>
            <div>{item.img}</div>
            <div className="text-xs">{item.label}</div>
          </button>
        </NavLink>
      ))}
    </nav>
  );
}

export default BottomNav;
