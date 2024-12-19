import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MissionIcon from "../../images/Student/DashboardIcons/Mission.svg";
import VisionIcon from "../../images/Student/DashboardIcons/Vision.svg";
import ProfileIcon from "../../images/Student/DashboardIcons/ProfileIcon.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  // State to track the active section
  const [currentSection, setCurrentSection] = useState("dashboard");
  const [data, setData] = useState('')

  // Fetch data when the component mounts
  useEffect(() => {
    getData(); // Call getData when the component mounts
  }, []); // Empty dependency array ensures it runs only once after the first render

  const getData = async () => {
    try {
      // Send a request to the Protected API to validate the user's group and token
      const res = await axios.get(`/api/student/`);
      setData(res.data[0]); // Store the response data in the state
    } catch (error) {
      console.log("Authorization Error:", error.response?.data?.detail || error.message);
      // Optionally handle error here, e.g., redirecting the user or showing a message
    }
  };

  const handleNavigate = (section) => {
    setCurrentSection(section); // Update the current section
    switch (section) {
      case "dashboard":
        navigate("/student/dashboard");
        break;
      case "profile":
        navigate("/student/profile");
        break;
      case "cor":
        navigate("/student/cor");
        break;
      case "checklist":
        navigate("/student/checklist");
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#e4ecfa] to-[#fefae0] relative flex flex-col lg:flex-row overflow-hidden">
      <Sidebar onNavigate={handleNavigate} activeSection={currentSection} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <Header onLogout={onLogout} />
          <div className="flex flex-col justify-center items-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 lg:py-12">
            <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1000px] mt-6 lg:mt-8">
              <h2 className="text-[#333] font-bold text-[1.375rem] sm:text-[1.5rem] lg:text-[1.75rem] text-center md:text-left">
                Welcome! <span className="font-regular">{`${data.first_name}`}</span>
              </h2>
              <p className="text-[#555] text-[1rem] sm:text-[1.125rem] mt-2 md:mt-0 text-center md:text-left">
                Enrollment Status: <span className="font-bold">Enrolled</span>
              </p>
            </div>
  
            <div className="bg-white rounded-[20px] shadow-lg w-full max-w-[1000px] md:rounded-[34px] flex flex-col sm:flex-row items-center sm:items-start md:items-center p-4 md:p-6 my-4 lg:my-6 relative">
              <div className="flex items-center justify-center sm:justify-start w-full sm:w-auto mb-4 sm:mb-0">
                <img
                  src={ProfileIcon}
                  alt="Profile Icon"
                  className="h-[3.75rem] w-[3.75rem] sm:h-[4.5rem] sm:w-[4.5rem] md:h-[5.625rem] md:w-[5.625rem] mr-4 sm:mr-6"
                />
              </div>
              <div className="flex flex-col text-center sm:text-left w-full sm:w-auto">
                <h3 className="text-[#222] font-bold text-[1.125rem] sm:text-[1.25rem] md:text-[1.5rem]">
                  {`${data.last_name}, ${data.first_name} ${data.middle_name}.`}
                </h3>
                <p className="text-[#666] text-[0.875rem] sm:text-[1rem] md:text-[1.125rem] font-regular">
                  {`${data.program}`}
                </p>
                <p className="text-[#666] text-[0.875rem] sm:text-[1rem] md:text-[1.125rem] font-regular">
                  {`${data.id}`}
                </p>
              </div>
              <div className="absolute bottom-4 right-4 md:right-6 md:bottom-6 text-[#888] text-[0.875rem] sm:text-[1rem] md:text-[1.125rem]">
                <p>
                  Status: <span className="font-bold">{`${data.status}`}</span>
                </p>
              </div>
            </div>
  
            <div className="flex flex-col md:flex-row justify-between gap-6 w-full max-w-[1000px]">
              <div className="bg-white shadow-lg rounded-[20px] md:rounded-[34px] p-4 sm:p-6 lg:p-8 w-full md:w-[48%] text-center">
                <img
                  src={MissionIcon}
                  alt="Mission Icon"
                  className="h-[2.5rem] w-[2.5rem] sm:h-[3rem] sm:w-[3rem] lg:h-[4.375rem] lg:w-[4.375rem] mb-4 lg:mb-6 mx-auto"
                />
                <h3 className="text-[#222] font-bold text-[1.125rem] sm:text-[1.25rem] lg:text-[1.5rem] mb-2 lg:mb-4">
                  CVSU MISSION
                </h3>
                <p className="text-[#555] text-[0.875rem] sm:text-[1rem] lg:text-[1.125rem] leading-relaxed">
                  Cavite State University shall provide excellent, equitable, and
                  relevant educational opportunities in the arts, sciences, and
                  technology through quality instruction and responsive research and
                  development activities.
                </p>
              </div>
              <div className="bg-white shadow-lg rounded-[20px] md:rounded-[34px] p-4 sm:p-6 lg:p-8 w-full md:w-[48%] mb-16 sm:mb-4 lg:mb-0 text-center">
                <img
                  src={VisionIcon}
                  alt="Vision Icon"
                  className="h-[2.5rem] w-[2.5rem] sm:h-[3rem] sm:w-[3rem] lg:h-[4.375rem] lg:w-[4.375rem] mb-4 lg:mb-6 mx-auto"
                />
                <h3 className="text-[#222] font-bold text-[1.125rem] sm:text-[1.25rem] lg:text-[1.5rem] mb-2 lg:mb-4">
                  CVSU VISION
                </h3>
                <p className="text-[#555] text-[0.875rem] sm:text-[1rem] lg:text-[1.125rem] leading-relaxed">
                  Cavite State University aspires to be a globally recognized
                  research university that provides excellent and relevant education
                  for the sustainable development of individuals and communities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
