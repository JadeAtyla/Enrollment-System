import React, { useState, useEffect } from "react";
import Header from "./Header"; // Custom Header
import Sidebar from "./Sidebar"; // Custom Sidebar
import { useNavigate } from "react-router-dom";
import useData from "../../components/DataUtil";

const Checklist = ({ onLogout }) => {
  const navigate = useNavigate();

  // State to track the active section
  const [currentSection, setCurrentSection] = useState("checklist");

  const { data: studentData, error: studentError, getData: getStudentData } = useData("/api/student/");
  const [student, setStudent] = useState(null);
  useEffect(() => {
      // Fetch student and user data on component mount
      const fetchData = async () => {
        await getStudentData();
      };
      fetchData();
    }, [getStudentData]);

    useEffect(() => {
        // Update student and user states when data is fetched
        if (studentData) setStudent(studentData[0]); // Access the first item in the array
      }, [studentData]);

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
    <div className="w-screen min-h-screen bg-gradient-to-b from-[#e4ecfa] to-[#fefae0] flex flex-col">
      {/* Header */}
      <Header onLogout={onLogout} />

      <div className="flex flex-1 lg:h-[calc(100%-4rem)] overflow-y-auto">
        {/* Sidebar */}
        <Sidebar onNavigate={handleNavigate} activeSection={currentSection} />

        {/* Main Content */}
        <div className="flex-1 p-4 sm:p-6 md:p-8 flex flex-col items-center mb-[6rem] sm:mb-0">
          <h1 className="text-[2rem] font-extrabold text-center uppercase text-[#1d3557] mb-4 tracking-wide">
            Checklist of Courses
          </h1>
          <div className="bg-white w-full max-w-[50rem] rounded-[1.25rem] shadow-lg p-4 sm:p-6 md:p-8">
            {/* Student Info Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <p className="text-[1rem] font-medium">
                  <strong>Name:</strong>{`${student?.last_name}, ${student?.first_name} ${student?.middle_name}`}
                </p>
                <p className="text-[1rem] font-medium">
                  <strong>Student Number:</strong> {student?.id}
                </p>
                <p className="text-[1rem] font-medium">
                  <strong>Address:</strong>{`${student?.address?.street || ""} ${student?.address?.barangay || ""} ${student?.address?.city}, ${student?.address?.province}`}
                </p>
              </div>
              <div className="flex flex-row justify-between gap-4 mb-4">
                <div className="w-1/2">
                  <label className="block text-[1rem] font-medium mb-1">
                    Year:
                  </label>
                  <select
                    className="border rounded-[0.625rem] p-2 text-[0.875rem] w-full"
                    defaultValue="1"
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="block text-[1rem] font-medium mb-1">
                    Semester:
                  </label>
                  <select
                    className="border rounded-[0.625rem] p-2 text-[0.875rem] w-full"
                    defaultValue="1st Semester"
                  >
                    <option value="1st Semester">1st Semester</option>
                    <option value="2nd Semester">2nd Semester</option>
                  </select>
                </div>
              </div>
            </div>

            <p className="text-center text-[1rem] font-bold uppercase mb-4">
              [Year] [Semester]
            </p>

            {/* Course Table */}
            <div className="overflow-auto">
              <table className="w-full text-left border-collapse mb-6 text-[0.875rem]">
                <thead>
                  <tr className="bg-[#FFDA62] font-bold">
                    <th className="border p-2">Course Code</th>
                    <th className="border p-2">Course Title</th>
                    <th className="border p-2">Grade</th>
                    <th className="border p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">COSC 000</td>
                    <td className="border p-2">COMPUTER PROGRAMMING</td>
                    <td className="border p-2">Passed</td>
                    <td className="border p-2">Completed</td>
                  </tr>
                  {[...Array(5)].map((_, index) => (
                    <tr key={index}>
                      <td className="border p-2">&nbsp;</td>
                      <td className="border p-2">&nbsp;</td>
                      <td className="border p-2">&nbsp;</td>
                      <td className="border p-2">&nbsp;</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Print PDF Button */}
            <div className="flex justify-end">
              <button
                className="bg-[#1d3557] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#457b9d] transition-all"
                onClick={() => console.log("Export PDF")}
              >
                Export as PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checklist;
