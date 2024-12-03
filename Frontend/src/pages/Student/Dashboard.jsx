import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MissionIcon from "../../images/Student/DashboardIcons/Mission.svg";
import VisionIcon from "../../images/Student/DashboardIcons/Vision.svg";
import ProfileIcon from "../../images/Student/DashboardIcons/ProfileIcon.svg";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleNavigate = (section) => {
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
    <div className="w-screen h-screen bg-gradient-to-b from-[#e4ecfa] to-[#fefae0]">
      <Sidebar onNavigate={handleNavigate} />
      <Header onLogout={onLogout} />
      <div className="flex flex-col justify-center items-center px-8">
        <div className="flex justify-between items-center w-full max-w-[1000px] mt-10">
          <h2 className="text-[#333] font-bold text-[22px]">
            Welcome! <span className="font-regular">[Student First Name]</span>
          </h2>
          <p className="text-[#555] text-[16px]">
            Enrollment Status: <span className="font-bold">Enrolled</span>
          </p>
        </div>
        <div className="bg-white rounded-[34px] shadow-lg w-[1000px] h-[140px] flex items-center justify-between p-6 my-8">
          <div className="flex items-center">
            <img src={ProfileIcon} alt="Profile Icon" className="h-[90px] w-[90px] mr-6" />
            <div>
              <h3 className="text-[#222] font-bold text-[22px]">[STUDENT NAME]</h3>
              <p className="text-[#666] text-[16px] font-regular">[Course]</p>
              <p className="text-[#666] text-[16px] font-regular">[Student Number]</p>
            </div>
          </div>
          <div>
            <p className="text-[#888] text-[16px]">
              Status: <span className="font-bold">Regular</span>
            </p>
          </div>
        </div>
        <div className="flex justify-between gap-8 w-full max-w-[1000px]">
          <div className="bg-white shadow-lg rounded-[34px] p-8 w-[480px] h-[380px] text-center">
            <img src={MissionIcon} alt="Mission Icon" className="h-[70px] w-[70px] mb-6" />
            <h3 className="text-[#222] font-bold text-[20px] mb-4">CVSU MISSION</h3>
            <p className="text-[#555] text-[15px] leading-relaxed">
              Cavite State University shall provide excellent, equitable, and relevant
              educational opportunities in the arts, sciences, and technology through
              quality instruction and responsive research and development activities. It
              shall produce professional, skilled, and morally upright individuals for
              global competitiveness.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-[34px] p-8 w-[480px] h-[380px] text-center">
            <img src={VisionIcon} alt="Vision Icon" className="h-[70px] w-[70px] mb-6" />
            <h3 className="text-[#222] font-bold text-[20px] mb-4">CVSU VISION</h3>
            <p className="text-[#555] text-[15px] leading-relaxed">
              Cavite State University aspires to be a globally recognized research
              university that provides excellent and relevant education for the
              sustainable development of individuals and communities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
