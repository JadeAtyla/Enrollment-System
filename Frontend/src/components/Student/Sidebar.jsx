import React from "react";
import DashboardIcon from "../../images/SidebarIcons/DashboardIcon.svg";
import ProfileIcon from "../../images/SidebarIcons/ProfileIcon.svg";
import CORIcon from "../../images/SidebarIcons/CORIcon.svg";
import ChecklistIcon from "../../images/SidebarIcons/ChecklistIcon.svg";

const Sidebar = () => {
  return (
    <div
      className="fixed flex flex-col items-center bg-[#28324B] shadow-lg"
      style={{
        width: "60px",
        height: "400px",
        top: "50%",
        right: "30px",
        transform: "translateY(-50%)",
        borderRadius: "30px",
      }}
    >
      {/* Sidebar Buttons */}
      <div className="flex flex-col justify-around h-full">
        <button
          className="p-3 hover:bg-gray-400 rounded-full transition"
          title="Dashboard"
        >
          <img
            src={DashboardIcon}
            alt="Dashboard Icon"
            className="w-6 h-6"
          />
        </button>

        <button
          className="p-3 hover:bg-gray-400 rounded-full transition"
          title="Profile"
        >
          <img
            src={ProfileIcon}
            alt="Profile Icon"
            className="w-6 h-6"
          />
        </button>

        <button
          className="p-3 hover:bg-gray-400 rounded-full transition"
          title="COR"
        >
          <img
            src={CORIcon}
            alt="COR Icon"
            className="w-6 h-6"
          />
        </button>

        <button
          className="p-3 hover:bg-gray-400 rounded-full transition"
          title="Checklist"
        >
          <img
            src={ChecklistIcon}
            alt="Checklist Icon"
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
