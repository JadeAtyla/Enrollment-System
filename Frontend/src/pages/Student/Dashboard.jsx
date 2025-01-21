import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MissionIcon from "../../images/Student/DashboardIcons/Mission.svg";
import VisionIcon from "../../images/Student/DashboardIcons/Vision.svg";
import ProfileIcon from "../../images/Student/DashboardIcons/ProfileIcon.svg";
import { useNavigate } from "react-router-dom";
import useData from "../../components/DataUtil";
import EnrollmentDate from "../../components/EnrollmentDate";

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();

  // State to track the active section
  const [currentSection, setCurrentSection] = useState("dashboard");

  // Fetch student data
  const { data, error, getData } = useData("/api/student/");
  const [student, setStudent] = useState({
    id: "",
    first_name: "",
    full_name: "",
    program: "",
    enrollment_status: "Not enrolled yet.",
    student_status: "Not enrolled yet.",
  });

  useEffect(() => {
    // Fetch student data on component mount
    const fetchData = async () => {
      try {
        await getData();
      } catch (err) {
        console.error("Error fetching student data:", err);
      }
    };
    fetchData();
  }, [getData]);

  useEffect(() => {
    // Update the `student` state when `data` changes
    if (data && data.length > 0) {
      const studentInstance = data[0];

      setStudent({
        id: studentInstance?.id || "",
        first_name: studentInstance?.first_name || "Student",
        full_name: `${studentInstance?.last_name || ""}, ${studentInstance?.first_name || ""} ${studentInstance?.middle_name || ""}`,
        program: `${studentInstance?.program || "Unknown"} ${studentInstance?.year_level || "N/A"}-${studentInstance?.section || "TBA"}`,
        enrollment_status: studentInstance?.enrollment_status || "Not enrolled yet.",
        student_status: studentInstance?.status || "Not enrolled yet.",
        program_id: studentInstance?.program || "",
      });
    } else if (error) {
      console.error("Fetch error:", error);
    }
  }, [data, error]);

  const handleNavigate = (section) => {
    setCurrentSection(section);
    navigate(`/student/${section}`);
  };

  return (
    <div className="w-screen min-h-screen lg:h-screen bg-gradient-to-b from-[#e4ecfa] to-[#fefae0] flex flex-col lg:flex-row overflow-auto">
      <Sidebar onNavigate={handleNavigate} activeSection={currentSection} />
      <div className="flex-1 flex flex-col relative">
        <Header onLogout={onLogout} />

        {/* Main Content */}
        <div className="flex flex-col items-center px-4 sm:px-6 md:px-8 lg:px-12 lg:h-auto py-8">
          {/* Welcome Section */}
          <div className="w-full max-w-[1000px] text-center">
            <h2 className="text-[2rem] font-extrabold uppercase text-[#1d3557] mb-4 tracking-wide">
              Welcome! <span className="bg-blue-100 px-4 py-2 rounded-md text-blue-700">{student.first_name}</span>
            </h2>
            <p className="text-[#555] text-[1rem] sm:text-[1.125rem] font-medium">
              Enrollment Status: <span className="font-bold">{student.enrollment_status}</span>
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-[20px] shadow-lg w-full max-w-[1000px] flex flex-col sm:flex-row items-center sm:items-start p-6 my-6">
            <img src={ProfileIcon} alt="Profile Icon" className="h-[5rem] w-[5rem] sm:h-[6rem] sm:w-[6rem] mr-6" />
            <div className="flex flex-col text-center sm:text-left">
              <h3 className="text-[#222] font-bold text-[1.5rem]">{student.full_name}</h3>
              <p className="text-[#666] text-[1rem]">{student.program}</p>
              <p className="text-[#666] text-[1rem]">{student.id}</p>
            </div>
            <div className="ml-auto text-[#888] text-[1rem]">
              <p>Status: <span className="font-bold">{student.student_status}</span></p>
            </div>
          </div>

          {/* Mission & Vision Cards */}
          <div className="flex flex-wrap gap-6 w-full max-w-[1000px] justify-center">
            <div className="bg-white shadow-lg rounded-[20px] p-6 w-full md:w-[48%] text-center">
              <img src={MissionIcon} alt="Mission Icon" className="h-[3rem] w-[3rem] mb-3 mx-auto" />
              <h3 className="text-[#222] font-bold text-[1.125rem] mb-4">CVSU MISSION</h3>
              <p className="text-[#555] text-[1rem] leading-relaxed">
                Cavite State University shall provide excellent, equitable, and relevant educational opportunities in the arts, sciences, and technology through quality instruction and responsive research and development activities.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-[20px] p-6 w-full md:w-[48%] text-center">
              <img src={VisionIcon} alt="Vision Icon" className="h-[3rem] w-[3rem] mb-3 mx-auto" />
              <h3 className="text-[#222] font-bold text-[1.125rem] mb-4">CVSU VISION</h3>
              <p className="text-[#555] text-[1rem] leading-relaxed">
                Cavite State University aspires to be a globally recognized research university that provides excellent and relevant education for the sustainable development of individuals and communities.
              </p>
            </div>
          </div>

          {/* Enrollment Section - FIXED SPACING */}
          <div className="bg-white rounded-[20px] shadow-lg w-full max-w-[1000px] p-6 my-10 flex flex-wrap items-center justify-evenly gap-4">
            <EnrollmentDate
              program_names={[student.program_id]}
              show_button={true}
              student_id={student.id}
              student_status={student.enrollment_status}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
