import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RegistrarSidebar from "./RegistrarSidebar";
import useData from "../../components/DataUtil";

const EvaluateStudent = ({ onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const {student} = location.state || "No id selected."
  const [evalCourses, setEvalCourses] = useState([]);

  const { data, error, getData } = useData(`/api/grade/?student=${student?.id}&course__year_level=${student?.year_level}&course__semester=${student?.semester}`);

  useEffect(() => {
        // Fetch student data on component mount
        const fetchData = async () => {
          await getData(); // Fetch data
        };
        fetchData();
      }, [getData]);
  
  useEffect (()=>{
    if(data){
      setEvalCourses(data);
    } else if (error){
      console.log(error.response);
    }
  }, [data]);

  const handleAddToPending = () => {
    navigate("/registrar/enrollmentList");
  };

  // Handle student enrollment
  const handleEnrollment = () => {
    navigate("/registrar/enroll-student", {
      state: { student: student },
    });
  };

  const studentGrades = [
    { courseCode: "DCIT26", title: "Application Development and Emerging Technologies", units: 3, grade: 1.75, creditUnit: 3, remarks: "PASSED" },
    { courseCode: "DCIT26", title: "Application Development and Emerging Technologies", units: 3, grade: 1.75, creditUnit: 3, remarks: "PASSED" },
    { courseCode: "DCIT26", title: "Application Development and Emerging Technologies", units: 3, grade: 1.75, creditUnit: 3, remarks: "PASSED" },
    { courseCode: "DCIT26", title: "Application Development and Emerging Technologies", units: 3, grade: 1.75, creditUnit: 3, remarks: "PASSED" },
    { courseCode: "DCIT26", title: "Application Development and Emerging Technologies", units: 3, grade: 1.75, creditUnit: 3, remarks: "PASSED" },
    { courseCode: "DCIT26", title: "Application Development and Emerging Technologies", units: 3, grade: 1.75, creditUnit: 3, remarks: "PASSED" },
    { courseCode: "DCIT26", title: "Application Development and Emerging Technologies", units: 3, grade: 1.75, creditUnit: 3, remarks: "PASSED" },
    { courseCode: "DCIT26", title: "Application Development and Emerging Technologies", units: 3, grade: 1.75, creditUnit: 3, remarks: "PASSED" },
  ];

  return (
    <div className="flex min-h-screen">
      <RegistrarSidebar
        onLogout={onLogout}
        isCollapsed={isSidebarCollapsed}
        currentPage={"evaluate-student"}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
      />
      <div
        className={`flex flex-col items-center flex-1 transition-all duration-300 ${isSidebarCollapsed ? "ml-[5rem]" : "ml-[15.625rem]"} py-6`}
      >
        {/* Main Content */}
        <div className="w-full max-w-[70rem] px-6">  {/* Adjusted max width */}
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">EVALUATING STUDENT</h1>
          <div className="mb-6 p-11 bg-white shadow-lg rounded-[1.875rem]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">STUDENT INFORMATION</h2>
            <table className="w-full text-center border-collapse">
              <thead className="bg-gray-100 rounded-[1.875rem]">
                <tr>
                  <th className="px-6 py-4 border-b">STUDENT NUMBER</th>
                  <th className="px-6 py-4 border-b">STUDENT NAME</th>
                  <th className="px-6 py-4 border-b">PROGRAM</th>
                  <th className="px-6 py-4 border-b">YEAR LEVEL</th>
                  <th className="px-6 py-4 border-b">SECTION</th>
                  <th className="px-6 py-4 border-b">ACADEMIC YEAR</th>
                  <th className="px-6 py-4 border-b">STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b">{student?.id}</td>
                  <td className="px-6 py-4 border-b">{student?.last_name}</td>
                  <td className="px-6 py-4 border-b">{student?.program}</td>
                  <td className="px-6 py-4 border-b">{student?.year_level}</td>
                  <td className="px-6 py-4 border-b">{student?.section}</td>
                  <td className="px-6 py-4 border-b">{student?.academic_year}</td>
                  <td className="px-6 py-4 border-b">{student?.status}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Student Grades Card */}
          <div className="mb-6 p-11 bg-white shadow-lg rounded-[1.875rem] ">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">STUDENT GRADES</h2>
            <table className="w-full text-center border-collapse ">
              <thead className="bg-gray-100 rounded-[1.875rem]">
                <tr>
                  <th className="px-6 py-4 border-b">COURSE CODE</th>
                  <th className="px-6 py-4 border-b">TITLE</th>
                  <th className="px-6 py-4 border-b">UNITS</th>
                  <th className="px-6 py-4 border-b">GRADE</th>
                  <th className="px-6 py-4 border-b">CREDIT UNIT</th>
                  <th className="px-6 py-4 border-b">REMARKS</th>
                </tr>
              </thead>
              <tbody>
                {evalCourses.map((evaluate, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b">{evaluate?.course?.code}</td>
                    <td className="px-6 py-4 border-b">{evaluate?.course?.title}</td>
                    <td className="px-6 py-4 border-b">{evaluate?.course?.lab_units + evaluate?.course?.lec_units}</td>
                    <td className="px-6 py-4 border-b">{evaluate?.grade}</td>
                    <td className="px-6 py-4 border-b">{evaluate?.course?.lab_units + evaluate?.course?.lec_units}</td>
                    <td className="px-6 py-4 border-b">{evaluate?.remarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              className="bg-[#8B8007] text-white px-6 py-3 rounded-[1.875rem] hover:bg-[#afaa6d]"
              onClick={handleAddToPending}
            >
              ADD TO PENDING
            </button>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-[1.875rem] hover:bg-blue-600"
              onClick={() => handleEnrollment(student)}
            >
              VERIFY STUDENT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EvaluateStudent;
