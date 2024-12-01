import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "../../images/Registrar/SidebarIcons/DashboardIcon.svg";
import EnrollIcon from "../../images/Registrar/SidebarIcons/EnrollIcon.svg";
import ListIcon from "../../images/Registrar/SidebarIcons/ListIcon.svg";
import AccountIcon from "../../images/Registrar/SidebarIcons/AccountIcon.svg";
import LogoutIcon from "../../images/Registrar/SidebarIcons/LogoutIcon.svg";
import UniversityLogo from "../../images/universityLogo.svg";

const RegistrarSidebar = ({ currentPage, onLogout, onToggleSidebar, isCollapsed }) => {
  const navigate = useNavigate();

  const menuItems = [
    { name: "dashboard", icon: DashboardIcon, label: "Dashboard", path: "/registrar/dashboard" },
    { name: "enroll", icon: EnrollIcon, label: "Enrollment List", path: "/registrar/enrollmentList" },
    { name: "list", icon: ListIcon, label: "List of Students", path: "/registrar/studentList" },
    { name: "account", icon: AccountIcon, label: "Account", path: "/registrar/account" },
  ];

  const handleToggle = () => {
    onToggleSidebar(!isCollapsed);
  };

  return (
    <div
      className={`fixed flex flex-col bg-[#043674] shadow-lg h-full top-0 left-0 ${
        isCollapsed ? "w-[5rem]" : "w-[15.625rem]"
      } transition-all duration-300`}
    >
      {/* University Logo */}
      <div className="flex items-center justify-center h-[7.5rem] border-b border-white">
        <img
          src={UniversityLogo}
          alt="University Logo"
          className={`transition-all duration-300 ${
            isCollapsed ? "w-[2.5rem] h-[2.5rem]" : "w-[4rem] h-[4rem]"
          }`}
        />
        {!isCollapsed && (
          <div className="ml-2 text-white text-sm font-bold">
            <div>Cavite State</div>
            <div>University</div>
            <div>Bacoor Campus</div>
          </div>
        )}
      </div>

      {/* Sidebar Content */}
      <div className="flex flex-col justify-between flex-1">
        {/* Navigation Items */}
        <div className="flex flex-col space-y-4 px-4 mt-4">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                currentPage === item.name
                  ? "bg-[#02458c] text-white"
                  : "hover:bg-[#02458c] hover:text-white text-gray-200"
              }`}
              onClick={() => navigate(item.path)}
            >
              <img src={item.icon} alt={`${item.label} Icon`} className="w-[1.5rem] h-[1.5rem] mr-3" />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="w-full px-4 mt-8">
          <button
            className="flex items-center justify-center p-3 rounded-lg transition-all duration-300 hover:bg-[#02458c] text-white w-full"
            onClick={onLogout}
          >
            <img src={LogoutIcon} alt="Logout Icon" className="w-[1.5rem] h-[1.5rem] mr-3" />
            {!isCollapsed && <span className="text-sm font-medium">Log Out</span>}
          </button>
        </div>
      </div>

      {/* Collapse Button */}
      <div
        className="absolute top-3 right-3 cursor-pointer text-white"
        onClick={handleToggle}
      >
        {isCollapsed ? "➡️" : "⬅️"}
      </div>
    </div>
  );
};

export default RegistrarSidebar;
