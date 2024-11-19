import React from "react";
import universityLogo from "../images/universityLogo.svg";
import dashboardLogo from "../images/dashboardIcons/dashboardLogo.svg";
import profileLogo from "../images/dashboardIcons/profileLogo.svg";
import corLogo from "../images/dashboardIcons/corLogo.svg";
import checklistLogo from "../images/dashboardIcons/checklistLogo.svg";
import logoutLogo from "../images/dashboardIcons/logoutLogo.svg";

const Dashboard = () => {
  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-[#001830] text-white flex flex-col">
        <div className="flex flex-col items-center p-4">
          <img
            src={universityLogo}
            alt="CVSU Logo"
            className="h-16 w-16 mb-3"
          />
          <h2 className="text-lg font-bold font-inter">CVSU - Bacoor</h2>
        </div>
        <hr className="border-t border-gray-600 w-3/4 mx-auto my-4" />
        <nav className="flex-grow">
          <ul className="flex flex-col items-start pl-10">
            <li className="p-4 flex items-center gap-1 text-gray-300 hover:text-white cursor-pointer font-inter font-semibold text-base">
              <img src={dashboardLogo} alt="Dashboard Icon" className="h-6 w-6" />
              Dashboard
            </li>
            <li className="p-4 flex items-center gap-1 text-gray-300 hover:text-white cursor-pointer font-inter font-semibold text-base">
              <img src={profileLogo} alt="Profile Icon" className="h-6 w-6" />
              Profile
            </li>
            <li className="p-4 flex items-center gap-1 text-gray-300 hover:text-white cursor-pointer font-inter font-semibold text-base">
              <img src={corLogo} alt="COR Icon" className="h-6 w-6" />
              COR
            </li>
            <li className="p-4 flex items-center gap-1 text-gray-300 hover:text-white cursor-pointer font-inter font-semibold text-base">
              <img src={checklistLogo} alt="Checklist Icon" className="h-6 w-6" />
              Checklist
            </li>
          </ul>
        </nav>
        <div className="flex-grow flex items-end justify-center pb-4">
          <button className="p-4 flex items-center gap-1 text-gray-300 hover:text-white cursor-pointer font-inter font-semibold text-base">
            <img src={logoutLogo} alt="Logout Icon" className="h-6 w-6" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-gray-50">
        <header className="mb-6">
          <h1 className="text-2xl font-bold">Welcome! [name]</h1>
        </header>

        {/* Student Info Card */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">STUDENT NAME</h2>
              <p className="text-lg">YEAR</p>
              <p className="text-lg">Course and Section</p>
              <p className="text-gray-500 mt-2">Status</p>
            </div>
            <div className="text-gray-500 text-right">
              <p>ROLE (STUDENT)</p>
              <p className="text-sm mt-2">2022#####</p>
            </div>
          </div>
        </section>

        {/* Enrollment Prompt */}
        <section className="mt-8 text-center">
          <p className="mb-4 text-lg">
            Would you like to enroll for the semester beginning on [date]?
          </p>
          <div className="flex justify-center gap-4">
            <button className="px-6 py-2 bg-gray-300 text-sm rounded-md hover:bg-gray-400">
              No
            </button>
            <button className="px-6 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600">
              Yes
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
