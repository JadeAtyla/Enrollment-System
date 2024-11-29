import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Dashboard = () => {
  return (
    <div className="w-screen h-screen bg-gradient-to-b from-gray-100 to-yellow-50 relative">
      {/* Header */}
      <Header />

      {/* Welcome Section */}
      <div className="flex justify-between items-center px-16 mt-6">
        <h2 className="text-gray-800 font-semibold text-xl sm:text-2xl">
          Welcome! [Student First Name]
        </h2>
        <p className="text-gray-600 text-lg sm:text-xl">Enrollment Status: Enrolled</p>
      </div>

      {/* Student Info Card */}
      <div className="bg-white rounded-xl shadow-lg mx-auto mt-6 p-6 w-[700px] flex justify-between items-center">
        <div>
          <h3 className="text-black font-bold text-xl">[STUDENT NAME]</h3>
          <p className="text-gray-600 text-md">[Course]</p>
          <p className="text-gray-600 text-md">[Student Number]</p>
        </div>
        <p className="text-gray-500 font-medium text-md">Status: Regular</p>
      </div>

      {/* Mission and Vision Cards */}
      <div className="flex justify-center gap-10 mt-10">
        {/* Mission Card */}
        <div className="bg-white shadow-md rounded-xl p-6 w-[350px]">
          <div className="flex justify-center items-center bg-gray-200 p-3 rounded-full">
            <svg
              className="h-8 w-8 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m9-11.03a9.0006 9.0006 0 01-18 0"
              />
            </svg>
          </div>
          <h3 className="text-gray-800 font-bold text-lg mt-4 text-center">
            CVSU MISSION
          </h3>
          <p className="text-gray-600 text-sm mt-2 text-center">
            Cavite State University shall provide excellent, equitable, and
            relevant educational opportunities in the arts, sciences, and
            technology through quality instruction and responsive research and
            development activities.
          </p>
        </div>

        {/* Vision Card */}
        <div className="bg-white shadow-md rounded-xl p-6 w-[350px]">
          <div className="flex justify-center items-center bg-gray-200 p-3 rounded-full">
            <svg
              className="h-8 w-8 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.5v15m7.5-7.5H4.5"
              />
            </svg>
          </div>
          <h3 className="text-gray-800 font-bold text-lg mt-4 text-center">
            CVSU VISION
          </h3>
          <p className="text-gray-600 text-sm mt-2 text-center">
            Cavite State University aspires to be a globally recognized
            research university that provides excellent and relevant education
            for the sustainable development of individuals and communities.
          </p>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar />
    </div>
  );
};

export default Dashboard;
