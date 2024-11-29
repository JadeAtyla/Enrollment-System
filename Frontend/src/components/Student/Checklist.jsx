import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

const COR = () => {
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
      <Header />
      {/* Remaining content */}
    </div>
  );
};

export default COR;
