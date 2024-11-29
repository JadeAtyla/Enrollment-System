import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MissionIcon from "../../images/Student/DashboardIcons/Mission.svg";
import VisionIcon from "../../images/Student/DashboardIcons/Vision.svg";
import ProfileIcon from "../../images/Registrar/DashboardIcons/ProfileIcon.svg";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing

const Dashboard = () => {
  const navigate = useNavigate();

  const handleNavigate = (section) => {
    switch (section) {
      case "dashboard":
        navigate("/registrar/dashboard");
        break;
      case "profile":
        navigate("/registrar/profile");
        break;
      case "cor":
        navigate("/registrar/cor");
        break;
      case "checklist":
        navigate("/registrar/checklist");
        break;
      default:
        break;
    }
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#e4ecfa] to-[#fefae0]">
      <Sidebar onNavigate={handleNavigate} />
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center max-h-screen px-8">
        {/* Space between Header and Welcome Section */}
        <div className="mt-10" />

        {/* Welcome Section */}
        <div className="flex justify-between items-center w-full max-w-[1000px] mb-6">
          <h2 className="text-[#333] font-bold text-[22px]">
            Welcome! <span className="font-regular">[Name]</span>
          </h2>
        </div>

        {/* Space between Welcome Section and Student Info Card */}
        <div className="mt-4" />

        {/* Student Info Card */}
        <div className="bg-white rounded-[34px] shadow-lg w-[1000px] h-[140px] flex items-center justify-between p-6 mb-8">
          <div className="flex items-center">
            <img
              src={ProfileIcon}
              alt="Profile Icon"
              className="h-[90px] w-[90px] mr-6"
            />
            <div>
              <h3 className="text-[#222] font-bold text-[22px]">
                [STUDENT NAME]
              </h3>
              <p className="text-[#666] text-[16px] font-regular">[Course]</p>
              <p className="text-[#666] text-[16px] font-regular">
                [Student Number]
              </p>
            </div>
          </div>
          <div className="self-start mt-[50px]">
            <p className="text-[#888] text-[16px] font-regular">
              Status: <span className="font-bold">Regular</span>
            </p>
          </div>
        </div>

        {/* Mission and Vision Cards */}
        <div className="flex justify-between gap-8 w-full max-w-[1000px]">
          {/* Mission Card */}
          <div className="bg-white shadow-lg rounded-[34px] p-8 w-[480px] h-[380px] text-center flex flex-col items-center">
            <img
              src={MissionIcon}
              alt="Mission Icon"
              className="h-[70px] w-[70px] mb-6"
            />
            <h3 className="text-[#222] font-bold text-[20px] mb-4">
              CVSU MISSION
            </h3>
            <p className="text-[#555] text-[15px] font-regular leading-relaxed">
              Cavite State University shall provide excellent, equitable, and
              relevant educational opportunities in the arts, sciences, and
              technology through quality instruction and responsive research and
              development activities. It shall produce professional, skilled,
              and morally upright individuals for global competitiveness.
            </p>
          </div>

          {/* Vision Card */}
          <div className="bg-white shadow-lg rounded-[34px] p-8 w-[480px] h-[380px] text-center flex flex-col items-center">
            <img
              src={VisionIcon}
              alt="Vision Icon"
              className="h-[70px] w-[70px] mb-6"
            />
            <h3 className="text-[#222] font-bold text-[20px] mb-4">
              CVSU VISION
            </h3>
            <p className="text-[#555] text-[15px] font-regular leading-relaxed">
              Cavite State University aspires to be a globally recognized
              research university that provides excellent and relevant education
              for the sustainable development of individuals and communities.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
