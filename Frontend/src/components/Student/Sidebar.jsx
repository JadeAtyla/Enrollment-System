import React from "react";
import DashboardIcon from "../../images/SidebarIcons/DashboardIcon.svg";
import ProfileIcon from "../../images/SidebarIcons/ProfileIcon.svg";
import CORIcon from "../../images/SidebarIcons/CORIcon.svg";
import ChecklistIcon from "../../images/SidebarIcons/ChecklistIcon.svg";

const Sidebar = ({ onNavigate = () => {} }) => {
  return (
    <div className="fixed flex flex-col items-center bg-[#28324B] shadow-lg w-[60px] h-[400px] top-1/2 right-[30px] -translate-y-1/2 rounded-[30px]">
      <div className="flex flex-col justify-around h-full">
        <button
          className="p-3 hover:bg-gray-400 rounded-full transition"
          title="Dashboard"
          onClick={() => onNavigate("dashboard")}
        >
          <img src={DashboardIcon} alt="Dashboard Icon" className="w-6 h-6" />
        </button>
        <button
          className="p-3 hover:bg-gray-400 rounded-full transition"
          title="Profile"
          onClick={() => onNavigate("profile")}
        >
          <img src={ProfileIcon} alt="Profile Icon" className="w-6 h-6" />
        </button>
        <button
          className="p-3 hover:bg-gray-400 rounded-full transition"
          title="COR"
          onClick={() => onNavigate("cor")}
        >
          <img src={CORIcon} alt="COR Icon" className="w-6 h-6" />
        </button>
        <button
          className="p-3 hover:bg-gray-400 rounded-full transition"
          title="Checklist"
          onClick={() => onNavigate("checklist")}
        >
          <img src={ChecklistIcon} alt="Checklist Icon" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
