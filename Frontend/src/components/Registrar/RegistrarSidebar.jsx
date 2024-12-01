import React, { useState } from "react"; // Ensure useState is imported
import { useNavigate } from "react-router-dom"; // Ensure useNavigate is imported
import DashboardIcon from "../../images/Registrar/SidebarIcons/DashboardIcon.svg";
import EnrollIcon from "../../images/Registrar/SidebarIcons/EnrollIcon.svg";
import ListIcon from "../../images/Registrar/SidebarIcons/ListIcon.svg";
import AccountIcon from "../../images/Registrar/SidebarIcons/AccountIcon.svg"; // Ensure correct path
import LogoutIcon from "../../images/Registrar/SidebarIcons/LogoutIcon.svg";
import UniversityLogo from "../../images/universityLogo.svg";

const RegistrarSidebar = ({ currentPage = "dashboard", onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "dashboard", icon: DashboardIcon, label: "Dashboard", path: "/registrar/dashboard" },
    { name: "enroll", icon: EnrollIcon, label: "Enroll Student", path: "/registrar/enroll" },
    { name: "list", icon: ListIcon, label: "List of Students", path: "/registrar/list" },
    { name: "account", icon: AccountIcon, label: "Account", path: "/registrar/account" },
  ];

  const handleToggle = () => {
    setIsCollapsed((prev) => !prev);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    if (onLogout) onLogout();
    navigate("/registrar");
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  return (
    <div
      className={`fixed flex flex-col bg-[#043674] shadow-lg h-full top-0 left-0 ${
        isCollapsed ? "w-[80px]" : "w-[250px]"
      } transition-all duration-300`}
    >
      {/* University Logo */}
      <div
        className={`flex items-center justify-center h-[120px] ${
          isCollapsed ? "px-0" : "px-4"
        } border-b border-white`}
      >
        <img
          src={UniversityLogo}
          alt="University Logo"
          className={`transition-all duration-300 ${
            isCollapsed ? "w-10 h-10" : "w-16 h-16"
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
              onClick={() => handleNavigation(item.path)}
            >
              <img src={item.icon} alt={`${item.label} Icon`} className="w-6 h-6 mr-3" />
              {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </div>

        {/* Logout Button */}
        <div className="w-full px-4 mt-8">
          <button
            className="flex items-center justify-center p-3 rounded-lg transition-all duration-300 hover:bg-[#02458c] text-white w-full"
            onClick={handleLogout}
          >
            <img src={LogoutIcon} alt="Logout Icon" className="w-6 h-6 mr-3" />
            {!isCollapsed && <span className="text-sm font-medium">Log Out</span>}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div
        className={`text-center text-white text-xs py-4 ${
          isCollapsed ? "hidden" : "block"
        } border-t border-white`}
      >
        © 2024 CvSU Bacoor. All Rights Reserved.
      </div>

      {/* Collapse Button */}
      <div
        className="absolute top-3 right-3 cursor-pointer text-white"
        onClick={handleToggle}
      >
        {isCollapsed ? "➡️" : "⬅️"}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] text-center">
            <h3 className="text-lg font-bold mb-4">Confirm Logout</h3>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to log out?</p>
            <div className="flex justify-around">
              <button
                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                onClick={cancelLogout}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                onClick={confirmLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrarSidebar;
