import React from "react";
import DashboardIcon from "../../images/SidebarIcons/DashboardIcon.svg";
import ProfileIcon from "../../images/SidebarIcons/ProfileIcon.svg";
import CORIcon from "../../images/SidebarIcons/CORIcon.svg";
import ChecklistIcon from "../../images/SidebarIcons/ChecklistIcon.svg";

const Sidebar = ({ onNavigate = () => {} }) => {
  return (
    <div
      className="
        fixed flex items-center bg-[#28324B] bg-opacity-90 shadow-lg
        bottom-[1rem] left-1/2 transform -translate-x-1/2 w-[90%] h-[4.3125rem] rounded-[3.4375rem] 
        md:w-[3.75rem] md:h-[25rem] md:bottom-auto md:top-1/2 md:right-[1.875rem] md:transform md:-translate-y-1/2 md:left-auto md:rounded-[1.875rem]
        z-50"
    >
      <div className="flex md:flex-col justify-around w-full md:h-full">
        <button
          className="p-[0.75rem] hover:bg-gray-500 rounded-full transition"
          title="Dashboard"
          onClick={() => onNavigate("dashboard")}
        >
          <img src={DashboardIcon} alt="Dashboard Icon" className="w-[1.5rem] h-[1.5rem]" />
        </button>
        <button
          className="p-[0.75rem] hover:bg-gray-500 rounded-full transition"
          title="Profile"
          onClick={() => onNavigate("profile")}
        >
          <img src={ProfileIcon} alt="Profile Icon" className="w-[1.5rem] h-[1.5rem]" />
        </button>
        <button
          className="p-[0.75rem] hover:bg-gray-500 rounded-full transition"
          title="COR"
          onClick={() => onNavigate("cor")}
        >
          <img src={CORIcon} alt="COR Icon" className="w-[1.5rem] h-[1.5rem]" />
        </button>
        <button
          className="p-[0.75rem] hover:bg-gray-500 rounded-full transition"
          title="Checklist"
          onClick={() => onNavigate("checklist")}
        >
          <img src={ChecklistIcon} alt="Checklist Icon" className="w-[1.5rem] h-[1.5rem]" />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
