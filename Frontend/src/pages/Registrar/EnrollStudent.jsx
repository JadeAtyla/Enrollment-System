import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RegistrarSidebar from "./RegistrarSidebar";


const EnrollStudent = ({ onLogout }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const navigate = useNavigate();

  const studentInfo = {
    number: "202211111",
    name: "Karlios, Juan M.",
    program: "BSCS",
    yearLevel: 3,
    section: "3",
    academicYear: "2022-2024",
    status: "Regular",
  };

  const [studentCourses, setStudentCourses] = useState([
    { courseCode: "DCIT26", title: "Application Development and Emerging Technologies", unitLab: 3, unitLec: 3, contactHRLab: 3, contactHRLec: 3, yearLevel: 3, semester: 1 },
    { courseCode: "DCIT26", title: "Application Development and Emerging Technologies", unitLab: 3, unitLec: 3, contactHRLab: 3, contactHRLec: 3, yearLevel: 3, semester: 1 },
    { courseCode: "DCIT26", title: "Application Development and Emerging Technologies", unitLab: 3, unitLec: 3, contactHRLab: 3, contactHRLec: 3, yearLevel: 3, semester: 1 },
    { courseCode: "DCIT26", title: "Application Development and Emerging Technologies", unitLab: 3, unitLec: 3, contactHRLab: 3, contactHRLec: 3, yearLevel: 3, semester: 1 },
    { courseCode: "DCIT26", title: "Application Development and Emerging Technologies", unitLab: 3, unitLec: 3, contactHRLab: 3, contactHRLec: 3, yearLevel: 3, semester: 1 },
    { courseCode: "DCIT26", title: "Application Development and Emerging Technologies", unitLab: 3, unitLec: 3, contactHRLab: 3, contactHRLec: 3, yearLevel: 3, semester: 1 },
    { courseCode: "DCIT26", title: "Application Development and Emerging Technologies", unitLab: 3, unitLec: 3, contactHRLab: 3, contactHRLec: 3, yearLevel: 3, semester: 1 },
    { courseCode: "DCIT26", title: "Application Development and Emerging Technologies", unitLab: 3, unitLec: 3, contactHRLab: 3, contactHRLec: 3, yearLevel: 3, semester: 1 },
  ]);

  const studentSchedule = [
    { courseCode: "DCIT26", section: "3-3", day: "Monday", labTime: "3:00 PM - 4:00 PM", lecTime: "3:00 PM - 4:00 PM", room: "303", instructor: "Edan Belgica" },
    { courseCode: "DCIT26", section: "3-3", day: "Monday", labTime: "3:00 PM - 4:00 PM", lecTime: "3:00 PM - 4:00 PM", room: "303", instructor: "Edan Belgica" },
    { courseCode: "DCIT26", section: "3-3", day: "Monday", labTime: "3:00 PM - 4:00 PM", lecTime: "3:00 PM - 4:00 PM", room: "303", instructor: "Edan Belgica" },
    { courseCode: "DCIT26", section: "3-3", day: "Monday", labTime: "3:00 PM - 4:00 PM", lecTime: "3:00 PM - 4:00 PM", room: "303", instructor: "Edan Belgica" },
    { courseCode: "DCIT26", section: "3-3", day: "Monday", labTime: "3:00 PM - 4:00 PM", lecTime: "3:00 PM - 4:00 PM", room: "303", instructor: "Edan Belgica" },
    { courseCode: "DCIT26", section: "3-3", day: "Monday", labTime: "3:00 PM - 4:00 PM", lecTime: "3:00 PM - 4:00 PM", room: "303", instructor: "Edan Belgica" },
    { courseCode: "DCIT26", section: "3-3", day: "Monday", labTime: "3:00 PM - 4:00 PM", lecTime: "3:00 PM - 4:00 PM", room: "303", instructor: "Edan Belgica" },
  ];

  const handleProceedToBilling = () => {
    navigate("/registrar/billing"); // Navigate to the Billing page
  };
  

  const handleAddToPending = () => {
    navigate("/registrar/enroll-student", { state: { updatedStudent: studentInfo } });
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev); // Toggle modal visibility
  };

  const removeCourse = (index) => {
    const updatedCourses = studentCourses.filter((_, i) => i !== index);
    setStudentCourses(updatedCourses);
  };

  const updateCourse = (index, field, value) => {
    const updatedCourses = [...studentCourses];
    updatedCourses[index][field] = value;
    setStudentCourses(updatedCourses);
  };

  const addCourse = () => {
    const newCourse = {
      courseCode: "DCIT26",
      schedule: "LAB - 1:00 PM to 3:00 PM",
      day: "MONDAY",
      room: "301",
      yearLevel: "3",
      section: "3",
    };
    setStudentCourses([...studentCourses, newCourse]);
  };

  return (
    <div className="flex min-h-screen">
      <RegistrarSidebar
        onLogout={onLogout}
        isCollapsed={isSidebarCollapsed}
        currentPage={"enroll-student"}
        onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)}
      />
      <div
        className={`flex flex-col items-center flex-1 transition-all duration-300 ${isSidebarCollapsed ? "ml-[5rem]" : "ml-[15.625rem]"} py-6`}
      >
        <div className="w-full max-w-[87.5rem] px-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">ENROLL STUDENT</h1>

          {/* Student Information Section */}
          <div className="mb-6 p-11 bg-white shadow-lg rounded-[1.875rem]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">STUDENT INFORMATION</h2>
            <table className="w-full text-center border-collapse">
              <thead className="bg-gray-100">
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
                  <td className="px-6 py-4 border-b">{studentInfo.number}</td>
                  <td className="px-6 py-4 border-b">{studentInfo.name}</td>
                  <td className="px-6 py-4 border-b">{studentInfo.program}</td>
                  <td className="px-6 py-4 border-b">{studentInfo.yearLevel}</td>
                  <td className="px-6 py-4 border-b">{studentInfo.section}</td>
                  <td className="px-6 py-4 border-b">{studentInfo.academicYear}</td>
                  <td className="px-6 py-4 border-b">{studentInfo.status}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Courses Section */}
          <div className="mb-6 p-11 bg-white shadow-lg rounded-[1.875rem]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">COURSES</h2>
              <button onClick={toggleModal} className="bg-green-600 text-white px-4 py-2 rounded-[1.875rem] hover:bg-green-700">
                Edit Courses
              </button>
            </div>
            <table className="w-full text-center border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 border-b" rowSpan="2">COURSE CODE</th>
                  <th className="px-6 py-4 border-b" rowSpan="2">TITLE</th>
                  <th className="px-6 py-4 border-b" colSpan="2">UNIT</th>
                  <th className="px-6 py-4 border-b" colSpan="2">CONTACT HR</th>
                  <th className="px-6 py-4 border-b" rowSpan="2">YEAR LEVEL</th>
                  <th className="px-6 py-4 border-b" rowSpan="2">SEMESTER</th>
                </tr>
                <tr>
                  <th className="px-6 py-4 border-b">LAB</th>
                  <th className="px-6 py-4 border-b">LEC</th>
                  <th className="px-6 py-4 border-b">LAB</th>
                  <th className="px-6 py-4 border-b">LEC</th>
                </tr>
              </thead>
              <tbody>
                {studentCourses.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b">{course.courseCode}</td>
                    <td className="px-6 py-4 border-b">{course.title}</td>
                    <td className="px-6 py-4 border-b">{course.unitLab}</td>
                    <td className="px-6 py-4 border-b">{course.unitLec}</td>
                    <td className="px-6 py-4 border-b">{course.contactHRLab}</td>
                    <td className="px-6 py-4 border-b">{course.contactHRLec}</td>
                    <td className="px-6 py-4 border-b">{course.yearLevel}</td>
                    <td className="px-6 py-4 border-b">{course.semester}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal for Course Selection */}
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-8 rounded-xl w-[80%] max-w-[900px]">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">COURSE SELECTION</h2>
                <table className="w-full text-center border-collapse mb-4">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 border-b invisible">ACTION</th> {/* Invisible header */}
                      <th className="px-6 py-4 border-b">COURSE CODE</th>
                      <th className="px-6 py-4 border-b">SCHEDULE</th>
                      <th className="px-6 py-4 border-b">DAY</th>
                      <th className="px-6 py-4 border-b">ROOM</th>
                      <th className="px-6 py-4 border-b">YEAR LEVEL</th>
                      <th className="px-6 py-4 border-b">SECTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentCourses.map((course, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        {/* Action column (Delete) */}
                        <td className="px-6 py-4 border-b">
                          <button
                            onClick={() => removeCourse(index)} // Function to remove the course
                            className="text-red-600 hover:text-red-800"
                          >
                            <span className="text-xl">✖</span> {/* Red X Icon */}
                          </button>
                        </td>
                        {/* Dropdown for Course Code */}
                        <td className="px-6 py-4 border-b">
                          <select
                            value={course.courseCode}
                            onChange={(e) => updateCourse(index, "courseCode", e.target.value)}
                            className="w-full p-2 border rounded-md pr-8"
                          >
                            <option value="DCIT26">DCIT26</option>
                            <option value="DCIT27">DCIT27</option>
                            <option value="DCIT28">DCIT28</option>
                            {/* Add more course options as needed */}
                          </select>
                        </td>
                        {/* Dropdown for Schedule */}
                        <td className="px-6 py-4 border-b">
                          <select
                            value={course.schedule}
                            onChange={(e) => updateCourse(index, "schedule", e.target.value)}
                            className="w-full p-2 border rounded-md pr-8"
                          >
                            <option value="LAB - 1:00 PM to 3:00 PM">LAB - 1:00 PM to 3:00 PM</option>
                            <option value="LAB - 9:00 AM to 11:00 AM">LAB - 9:00 AM to 11:00 AM</option>
                            {/* Add more schedule options */}
                          </select>
                        </td>
                        {/* Dropdown for Day */}
                        <td className="px-6 py-4 border-b">
                          <select
                            value={course.day}
                            onChange={(e) => updateCourse(index, "day", e.target.value)}
                            className="w-full p-2 border rounded-md pr-8"
                          >
                            <option value="MONDAY">MONDAY</option>
                            <option value="TUESDAY">TUESDAY</option>
                            <option value="WEDNESDAY">WEDNESDAY</option>
                            <option value="THURSDAY">THURSDAY</option>
                            <option value="FRIDAY">FRIDAY</option>
                            <option value="SATURDAY">SATURDAY</option>
                            {/* Add more day options */}
                          </select>
                        </td>
                        {/* Dropdown for Room */}
                        <td className="px-6 py-4 border-b">
                          <select
                            value={course.room}
                            onChange={(e) => updateCourse(index, "room", e.target.value)}
                            className="w-full p-2 border rounded-md pr-8"
                          >
                            <option value="301">301</option>
                            <option value="302">302</option>
                            <option value="303">303</option>
                            {/* Add more room options */}
                          </select>
                        </td>
                        {/* Dropdown for Year Level */}
                        <td className="px-6 py-4 border-b">
                          <select
                            value={course.yearLevel}
                            onChange={(e) => updateCourse(index, "yearLevel", e.target.value)}
                            className="w-full p-2 border rounded-md pr-8"
                          >
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            {/* Add more year level options */}
                          </select>
                        </td>
                        {/* Dropdown for Section */}
                        <td className="px-6 py-4 border-b pr-8">
                          <select
                            value={course.section}
                            onChange={(e) => updateCourse(index, "section", e.target.value)}
                            className="w-full p-2 border rounded-md"
                          >
                            <option value="3">3</option>
                            <option value="4">4</option>
                            {/* Add more section options */}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-between">
                  <button onClick={toggleModal} className="px-6 py-3 rounded-md bg-gray-600 text-white">
                    CANCEL
                  </button>
                  <button onClick={toggleModal} className="px-6 py-3 rounded-md bg-green-600 text-white">
                    SAVE
                  </button>
                </div>
                {/* Add Course Button */}
                <div className="mt-4 text-center">
                  <button
                    onClick={addCourse} // Function to add a new course
                    className="px-6 py-3 rounded-md bg-blue-600 text-white"
                  >
                    + ADD COURSE
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Schedule Section */}
          <div className="mb-6 p-11 bg-white shadow-lg rounded-[1.875rem]">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">SCHEDULE</h2>
            <table className="w-full text-center border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 border-b">COURSE CODE</th>
                  <th className="px-6 py-4 border-b">YR. & SECTION</th>
                  <th className="px-6 py-4 border-b">DAY</th>
                  <th className="px-6 py-4 border-b">LAB TIME</th>
                  <th className="px-6 py-4 border-b">LEC TIME</th>
                  <th className="px-6 py-4 border-b">ROOM</th>
                  <th className="px-6 py-4 border-b">INSTRUCTOR</th>
                </tr>
              </thead>
              <tbody>
                {studentSchedule.map((schedule, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 border-b">{schedule.courseCode}</td>
                    <td className="px-6 py-4 border-b">{schedule.section}</td>
                    <td className="px-6 py-4 border-b">{schedule.day}</td>
                    <td className="px-6 py-4 border-b">{schedule.labTime}</td>
                    <td className="px-6 py-4 border-b">{schedule.lecTime}</td>
                    <td className="px-6 py-4 border-b">{schedule.room}</td>
                    <td className="px-6 py-4 border-b">{schedule.instructor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <button
              className="bg-[#595959] text-white px-6 py-3 rounded-[1.875rem] hover:bg-[#afaa6d]"
              onClick={() => navigate("/registrar/evaluate-student")}
              >
              BACK TO EVALUATION
            </button>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded-[1.875rem] hover:bg-blue-600"
              onClick={handleProceedToBilling} // Navigate to Billing page
            >
              PROCEED TO BILLING
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollStudent;
