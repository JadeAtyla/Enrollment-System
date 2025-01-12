import React, { useState, useEffect } from "react";
import useData from "../components/DataUtil";
import { useAlert } from "./Alert";

const ChecklistModal = ({ student_id, onClose, isEditable = false }) => {
  // State to track fetched data and error
  const { data, error, getData } = useData(`/api/checklist/${student_id ? `?id=${student_id}` : ``}`);
  const { updateData } = useData(`/api/checklist/`);
  const [student, setStudent] = useState(null);
  const [courseGrade, setCourseGrade] = useState([]);

  // State for selected filters
  const [selectedYearLevel, setSelectedYearLevel] = useState(1);
  const [selectedSemester, setSelectedSemester] = useState(1);
  const { triggerAlert } = useAlert();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, [getData, student_id]);

  // Update state when fetched data changes
  useEffect(() => {
    if (data) {
      console.log("Fetched data:", data);
      if (data.student) {
        setStudent(data.student);
        setSelectedYearLevel(data.student.year_level);
        setSelectedSemester(data.student.semester);
      }
      if (Array.isArray(data.courses_and_grades)) {
        setCourseGrade(data.courses_and_grades);
      } else {
        console.error("courses_and_grades is not an array:", data.courses_and_grades);
      }
    } else if (error) {
      console.error("Error fetching data:", error?.error);
    }
  }, [data, error]);

  // Update state for Year Level dropdown
  const handleYearLevelChange = (e) => {
    const yearLevel = parseInt(e.target.value, 10);
    setSelectedYearLevel(yearLevel);
  };

  // Update state for Semester dropdown
  const handleSemesterChange = (e) => {
    const semester = parseInt(e.target.value, 10);
    setSelectedSemester(semester);
  };

  // Filter courses based on selected year level and semester
  const filteredCourses = courseGrade.filter(
    (courseData) =>
      courseData.course.year_level === selectedYearLevel &&
      courseData.course.semester === selectedSemester
  );

  // If student_id is not provided and modal functionality is expected, don't render
  if (!student_id && onClose) {
    return null;
  }

  const handleSaveChecklist = async () => {
    try {
        // Create an array to hold the updated course data
        const updatedCourses = [];

        // Iterate through all courses and prepare updates
        for (const course of courseGrade) {
            // Determine the new grade; if empty, set to "No Grade"
            const newGrade = course.grade === "" ? "No Grade" : course.grade;

            // Only proceed if the new grade is not "No Grade"
            if (newGrade !== "No Grade") {
                // Construct the payload for the update request
                const payload = { 
                    course_code: course.course.code, // Course code from the course object
                    program: student.program,         // Program from the student object
                    new_grade: newGrade,              // The new grade to be updated
                    // grade_id: course.grade_id,        // Ensure this matches the backend expectation
                };

                // Log the payload for debugging purposes
                console.log("Updating course:", payload);

                // Add the updated course data to the updatedCourses array
                updatedCourses.push(payload);
            }
        }

        // Send updates for each course in the updatedCourses array
        for (const updatedPayload of updatedCourses) {
            // Call the updateData function with the payload
            const res = await updateData(student.id, updatedPayload);
            if(!res?.success){
              // console.log("Error fetch: ", );
              triggerAlert("error", "Error", res?.data?.error || `Failed to update course ${updatedPayload.course_code}:` || "Unknown error", 2000);
            }
            // // Check the response to determine if the update was successful
            // if (!res?.success) {
                
            // } else {
            //     // Trigger an error alert if the update failed
            //     triggerAlert("error", "Error", `Failed to update course ${updatedPayload.course_code}:`, res?.message || "Unknown error", 2000);
            // }
        }
        // Trigger a success alert if the update was successful
        triggerAlert("success", "Success", "Checklist saved successfully.");

        // Log all updated courses after processing for debugging
        console.log("Updated courses:", updatedCourses);

        // Log a success message indicating that the checklist was saved
        console.log("Checklist saved successfully.");

        // Close the modal after saving the checklist
        onClose(); 
    } catch (error) {
        // Log any errors that occur during the save process
        triggerAlert("error", "Error", error.message || error || "An error occured while saving.");
    }
};

  const handleGradeChange = (courseCode, newGrade) => {
    // Update the grade in the state
    setCourseGrade(prevGrades => 
      prevGrades.map(course => 
        course.course.code === courseCode ? { ...course, grade: newGrade } : course
      )
    );
    console.log(courseGrade);
  };

  return (
    <div
      className={`${
        onClose ? "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" : ""
      }`}
    >
      <div
        className={`bg-white w-full max-w-[50rem] rounded-[1.25rem] shadow-lg p-4 sm:p-6 md:p-8 ${
          onClose ? "relative" : "flex flex-col items-center mb-[6rem] sm:mb -0"
        }`}
      >
        {/* Close Button */}
        {onClose && (
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-black text-xl font-bold"
            onClick={onClose}
          >
            ×
          </button>
        )}

        <h1 className="text-[2rem] font-extrabold text-center uppercase text-[#1d3557] mb-4 tracking-wide">
          Checklist of Courses
        </h1>

        {/* Student Info Section */}
        {student && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2 mr-10">
              <p className="text-[1rem] font-medium">
                <strong>Name:</strong>{" "}
                {`${student.last_name}, ${student.first_name} ${student.middle_name || ""}`}
              </p>
              <p className="text-[1rem] font-medium">
                <strong>Student Number:</strong> {student.id}
              </p>
              <p className="text-[1rem] font-medium">
                <strong>Address:</strong>{" "}
                {`${student.address?.street || ""} ${student.address?.barangay || ""} ${student.address?.city}, ${student.address?.province}`}
              </p>
            </div>
            <div className="flex flex-row justify-between gap-4 mb-4">
              <div className="w-1/2">
                <label className="block text-[1rem] font-medium mb-1">Year:</label>
                <select
                  className="border rounded-[0.625rem] p-2 text-[0.875rem] w-full"
                  value={selectedYearLevel}
                  onChange={handleYearLevelChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div className="w-1/2">
                <label className="block text-[1rem] font-medium mb-1">Semester:</label>
                <select
                  className="border rounded-[0.625rem] p-2 text-[0.875rem] w-full"
                  value={selectedSemester}
                  onChange={handleSemesterChange}
                >
                  <option value="1">1st Semester</option>
                  <option value="2">2nd Semester</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-[1rem] font-bold uppercase mb-4">
          {`Year ${student?.year_level || selectedYearLevel} - ${
            selectedSemester === 1 ? "1st Semester" : "2nd Semester"
          }`}
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
                <th className="border p-2">Year</th>
                <th className="border p-2">Sem</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((courseData, index) => (
                <tr key={index}>
                  <td className="border p-2">{courseData?.course?.code}</td>
                  <td className="border p-2">{courseData?.course?.title}</td>
                  <td className="border p-2 w-fit">
                    {isEditable ? (
                      <input
                        type="text"
                        value={courseData?.grade !== "No Grade" ? courseData?.grade : ""}
                        placeholder="Enter grade"
                        onChange={(e) => handleGradeChange(courseData?.course?.code, e.target.value)}
                        className="border p-2 w-full"
                      />
                    ) : (
                      courseData?.grade
                    )}
                  </td>
                  <td className="border p-2">{courseData?.remarks}</td>
                  <td className="border p-2">{courseData?.course?.year_level}</td>
                  <td className="border p-2">{courseData?.course?.semester}</td>
                </ tr>
              ))}
              {filteredCourses.length === 0 && (
                <tr>
                  <td className="border p-2 text-center" colSpan="6">
                    No courses available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Print PDF Button */}
        <div className="flex justify-end gap-4">         
          <button
            className="bg-[#1d3557] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#457b9d] transition-all"
            onClick={() => console.log("Export PDF")}
          >
            Export as PDF
          </button>
          <button 
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition-all"
            hidden={!isEditable}
            onClick={handleSaveChecklist}
          >
              Save
          </button> 
        </div>
      </div>
    </div>
  );
};

export default ChecklistModal;