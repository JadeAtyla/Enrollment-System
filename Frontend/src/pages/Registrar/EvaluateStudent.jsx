import React, { useState, useEffect, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import RegistrarSidebar from "./RegistrarSidebar";
import useData from "../../components/DataUtil";

const EvaluateStudent = ({ onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();
  const { student } = location.state || {};
  const [courseParam, setCourseParam] = useState(""); // State for course parameters
  const [evalCourses, setEvalCourses] = useState([]);

  // Validate endpoint
  const enrollmentEndpoint = student
    ? `/api/enrollment/?student=${student.id}&school_year=${student.academic_year}`
    : null;
  const gradeEndpoint = courseParam
    ? `/api/grade/?student=${student?.id}&${courseParam}`
    : null;

  const {
    data: enrollmentData,
    error: enrollmentError,
    getData: enrollmentGetData,
  } = useData(enrollmentEndpoint);

  const {
    data: gradeData,
    error: gradeError,
    getData: gradeGetData,
  } = useData(gradeEndpoint);

  // Fetch enrollment data
  useEffect(() => {
    if (enrollmentEndpoint) enrollmentGetData();
  }, [enrollmentEndpoint, enrollmentGetData]);

  // Update course parameters when enrollment data changes
  useEffect(() => {
    if (enrollmentData) {
      const courseIds = enrollmentData.map((course) => course.course.id);
      const params = new URLSearchParams();
      courseIds.forEach((id) => params.append("course__id", id));
      setCourseParam(`${params.toString()}&`);
      console.log(courseParam);
    }
  }, [enrollmentData]);

  // Fetch grade data
  useEffect(() => {
    if (gradeEndpoint) gradeGetData();
  }, [gradeEndpoint, gradeGetData]);

  // Update evaluated courses and log errors
  useEffect(() => {
    if (gradeData) setEvalCourses(gradeData);

    if (enrollmentError) console.error("Enrollment Error:", enrollmentError);
    if (gradeError) console.error("Grade Error:", gradeError);
  }, [enrollmentError, gradeError, gradeData]);

  const handleAddToPending = () => {
    navigate("/registrar/enrollmentList");
  };

  const handleEnrollment = () => {
    navigate("/registrar/enroll-student", {
      state: { student: student },
    });
  };

  return (
    <div className="flex min-h-screen">
      <RegistrarSidebar
        onLogout={onLogout}
        isCollapsed={isSidebarCollapsed}
        currentPage={"evaluate-student"}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
      />
      <div
        className={`flex flex-col items-center flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? "ml-[5rem]" : "ml-[15.625rem]"
        } py-6`}
      >
        {/* Main Content */}
        <div className="w-full max-w-[70rem] px-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6">
            EVALUATING STUDENT
          </h1>
          {/* Student Information */}
          <div className="mb-6 p-11 bg-white shadow-lg rounded-[1.875rem]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              STUDENT INFORMATION
            </h2>
            <table className="w-full text-center border-collapse">
              <thead className="bg-gray-100 rounded-[1.875rem]">
                <tr>
                  <th className="px-6 py-4 border-b">STUDENT NUMBER</th>
                  <th className="px-6 py-4 border-b">STUDENT NAME</th>
                  <th className="px-6 py-4 border-b">PROGRAM</th>
                  <th className="px-6 py-4 border-b">YEAR LEVEL</th>
                  <th className="px-6 py-4 border-b">SECTION</th>
                  <th className="px-6 py-4 border-b">SEMESTER</th>
                  <th className="px-6 py-4 border-b">ACADEMIC YEAR</th>
                  <th className="px-6 py-4 border-b">STATUS</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 border-b">{student?.id || "N/A"}</td>
                  <td className="px-6 py-4 border-b">{student?.last_name || "N/A"}</td>
                  <td className="px-6 py-4 border-b">{student?.program || "N/A"}</td>
                  <td className="px-6 py-4 border-b">{student?.year_level || "N/A"}</td>
                  <td className="px-6 py-4 border-b">{student?.section || "N/A"}</td>
                  <td className="px-6 py-4 border-b">{student?.semester || "N/A"}</td>
                  <td className="px-6 py-4 border-b">{student?.academic_year || "N/A"}</td>
                  <td className="px-6 py-4 border-b">{student?.status || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* Student Grades */}
          <div className="mb-6 p-11 bg-white shadow-lg rounded-[1.875rem] ">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              STUDENT GRADES
            </h2>
            <table className="w-full text-center border-collapse">
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
                    <td className="px-6 py-4 border-b">
                      {evaluate?.course?.lab_units + evaluate?.course?.lec_units}
                    </td>
                    <td className="px-6 py-4 border-b">{evaluate?.grade}</td>
                    <td className="px-6 py-4 border-b">
                      {evaluate?.course?.lab_units + evaluate?.course?.lec_units}
                    </td>
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
              onClick={handleEnrollment}
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