import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardIcon from "../../images/Department/SidebarIcons/DashboardIcon.svg";
import EnrollIcon from "../../images/Department/SidebarIcons/EnrollIcon.svg";
import StudentIcon from "../../images/Department/SidebarIcons/StudentListIcon.svg";
import AccountIcon from "../../images/Department/SidebarIcons/AccountIcon.svg";
import LogoutIcon from "../../images/Department/SidebarIcons/LogoutIcon.svg";
import UniversityLogo from "../../images/universityLogo.svg";
import CourseIcon from "../../images/Department/SidebarIcons/MasterListIcon.svg";

const DepartmentSidebar = ({ currentPage, onLogout, children }) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(() => {
    return localStorage.getItem("sidebarCollapsed") === "true";
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const menuItems = [
    {
      name: "departmentDashboard",
      icon: DashboardIcon,
      label: "Dashboard",
      path: "/department/dashboard",
    },
    {
      name: "instructor",
      icon: EnrollIcon,
      label: "Instructor List",
      path: "/department/departmentInstructorList",
    },
    {
      name: "schedule",
      icon: StudentIcon,
      label: "Student List",
      path: "/department/departmentStudentList",
    },
    {
      name: "course",
      icon: CourseIcon,
      label: "Course",
      path: "/department/departmentMasterList",
    },
    {
      name: "account",
      icon: AccountIcon,
      label: "Account",
      path: "/department/departmentAccount",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth <= 768;

      if (isNowMobile !== isMobile) {
        setIsMobile(isNowMobile);
        if (isNowMobile) {
          setIsCollapsed(true); // Auto-collapse on mobile view
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  const handleToggle = () => {
    if (!isMobile) {
      const newCollapsedState = !isCollapsed;
      setIsCollapsed(newCollapsedState);
      localStorage.setItem("sidebarCollapsed", newCollapsedState);
    }
  };

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleLogoutClick = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const confirmLogout = () => {
    closeModal();
    onLogout();
  };

  const sidebarWidth = isCollapsed || isMobile ? "w-[5rem]" : "w-[15.625rem]";
  const contentMargin =
    isCollapsed || isMobile ? "ml-[5rem]" : "ml-[15.625rem]";

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed flex flex-col bg-gradient-to-b from-[#043674] to-[#0057b7] shadow-lg h-full top-0 left-0 ${sidebarWidth} transition-all duration-300 rounded-r-lg`}
      >
        <div className="flex items-center justify-center h-[7.5rem] border-b border-white px-4">
          <img
            src={UniversityLogo}
            alt="University Logo"
            className={`transition-all duration-300 ${
              isCollapsed || isMobile
                ? "w-[2.5rem] h-[2.5rem]"
                : "w-[4rem] h-[4rem]"
            }`}
          />
          {!isCollapsed && !isMobile && (
            <div className="ml-2 text-white text-sm font-bold text-center">
              <div>Cavite State</div>
              <div>University</div>
              <div>Bacoor Campus</div>
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between flex-1">
          <div className="flex flex-col space-y-2 px-4 mt-4">
            {menuItems.map((item) => (
              <button
                key={item.name}
                className={`flex items-center p-3 rounded-lg transition-all duration-300 ${
                  currentPage === item.name
                    ? "bg-[#02458c] text-white shadow-md"
                    : "hover:bg-[#6E85B7] hover:text-white text-gray-200"
                }`}
                onClick={() => handleMenuClick(item.path)}
              >
                <img
                  src={item.icon}
                  alt={`${item.label} Icon`}
                  className="w-[1.5rem] h-[1.5rem] mr-3"
                />
                {!isCollapsed && !isMobile && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </button>
            ))}
          </div>

          <div className="w-full px-4 mt-8">
            <button
              className="flex items-center p-3 rounded-lg transition-all duration-300 hover:bg-[#] text-white w-full shadow-md"
              onClick={handleLogoutClick}
            >
              <img
                src={LogoutIcon}
                alt="Logout Icon"
                className="w-[1.5rem] h-[1.5rem] mr-3"
              />
              {!isCollapsed && !isMobile && (
                <span className="text-sm font-medium">Log Out</span>
              )}
            </button>
          </div>
        </div>

        <div
          className="absolute top-4 right-4 cursor-pointer text-white text-lg font-bold hidden md:block"
          onClick={handleToggle}
        >
          {isCollapsed || isMobile ? "➡️" : "⬅️"}
        </div>
      </div>

      {/* Page Content */}
      <div className={`transition-all duration-300 ${contentMargin} flex-1`}>
        {children}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-[20rem]">
            <h2 className="text-lg font-bold text-gray-800 mb-4">
              Confirm Logout
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded text-gray-800 hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={confirmLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentSidebar;
