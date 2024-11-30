import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import RegistrarSidebar from "./RegistrarSidebar";
import StudentInfoModal from "./StudentInfoModal";
import LimitStudentsModal from "./LimitStudentsModal";
import RegistrarRegisterForm from "./RegistrarRegisterForm";
import { useNavigate } from "react-router-dom";

const EnrollStudent = ({ onLogout }) => {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isLimitModalOpen, setIsLimitModalOpen] = useState(false);
    const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 10; // Number of students per page
    const navigate = useNavigate();

    const handleRowDoubleClick = (student) => {
        setSelectedStudent(student);
    };

    const handleSaveStudentInfo = (updatedStudent) => {
        setStudents((prev) =>
            prev.map((student) => (student.id === updatedStudent.id ? updatedStudent : student))
        );
        setSelectedStudent(null);
    };

    const handleAddStudent = () => {
        setIsAddStudentModalOpen(true);
    };

    const closeAddStudentModal = () => {
        setIsAddStudentModalOpen(false);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const [students, setStudents] = useState(
        Array.from({ length: 50 }).map((_, index) => ({
            id: index + 1,
            number: `202210111${index}`,
            name: `Karlos, Juan M.`,
            course: "BSCS",
            yearLevel: 3,
            section: "A",
            status: "Regular",
        }))
    );


    // Get current students
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = students.slice(indexOfFirstStudent, indexOfLastStudent);

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <RegistrarSidebar
                onLogout={onLogout}
                currentPage="enroll"
                onNavigate={(section) => {
                    if (section === "logout") {
                        navigate("/registrar");
                    } else if (section === "dashboard") {
                        navigate("/registrar/dashboard");
                    } else if (section === "list") {
                        navigate("/registrar/list");
                    } else if (section === "account") {
                        navigate("/registrar/account");
                    }
                }}
            />

            {/* Main Content */}
            <div
                className={`flex flex-col items-center flex-1 ${isSidebarCollapsed ? "ml-[3.75rem]" : "ml-[13.75rem]"
                    } py-6`}
            >
                <div className="w-full max-w-[87.5rem] px-6">
                    {/* Search and Filter Section */}
                    <div className="flex flex-wrap justify-between items-center bg-white shadow-lg rounded-[1.875rem] px-8 py-4 mb-6">
                        {/* Search Input */}
                        <div className="flex items-center gap-4 w-full max-w-[20rem]">
                            <div className="relative w-full">
                                <input
                                    type="text"
                                    placeholder="Search here..."
                                    className="border border-gray-300 rounded-full px-4 py-2 w-full pl-10 focus:ring-2 focus:ring-blue-500"
                                />
                                <span className="absolute left-4 top-2/4 transform -translate-y-2/4 text-gray-500">
                                    <FaSearch />
                                </span>
                            </div>
                        </div>

                        {/* Dropdowns */}
                        <div className="flex items-center gap-4">
                            <select className="border border-gray-300 rounded-full px-4 py-2">
                                <option>Year Level</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                            <select className="border border-gray-300 rounded-full px-4 py-2">
                                <option>Course</option>
                                <option>BSCS</option>
                                <option>BSIT</option>
                            </select>
                        </div>
                    </div>

                    {/* Card Container */}
                    <div className="bg-white shadow-lg rounded-[1.875rem] p-8">
                        {/* Header and Buttons */}
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-semibold text-gray-800">Student List</h1>
                            <div className="flex items-center space-x-4">
                                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                                    Export as Excel
                                </button>
                                <button
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                                    onClick={() => setIsLimitModalOpen(true)}
                                >
                                    Limit Students
                                </button>
                                <button
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                                    onClick={handleAddStudent}
                                >
                                    + Add Student
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 border-b">Student Number</th>
                                        <th className="px-6 py-4 border-b">Student Name</th>
                                        <th className="px-6 py-4 border-b">Course</th>
                                        <th className="px-6 py-4 border-b">Year Level</th>
                                        <th className="px-6 py-4 border-b">Section</th>
                                        <th className="px-6 py-4 border-b">Status</th>
                                        <th className="px-6 py-4 border-b">Enroll</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentStudents.map((student) => (
                                        <tr
                                            key={student.id}
                                            className="hover:bg-gray-50 text-center cursor-pointer"
                                            onDoubleClick={() => handleRowDoubleClick(student)}
                                        >
                                            <td className="px-6 py-4 border-b">{student.number}</td>
                                            <td className="px-6 py-4 border-b">{student.name}</td>
                                            <td className="px-6 py-4 border-b">{student.course}</td>
                                            <td className="px-6 py-4 border-b">{student.yearLevel}</td>
                                            <td className="px-6 py-4 border-b">{student.section}</td>
                                            <td className="px-6 py-4 border-b">{student.status}</td>
                                            <td className="px-6 py-4 border-b">
                                                <button className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                                                    Enroll Student
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-between items-center mt-6">
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                                onClick={() => paginate(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                Previous
                            </button>
                            <p>
                                Page {currentPage} of {Math.ceil(students.length / studentsPerPage)}
                            </p>
                            <button
                                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400 disabled:opacity-50"
                                onClick={() => paginate(currentPage + 1)}
                                disabled={currentPage === Math.ceil(students.length / studentsPerPage)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {selectedStudent && (
                <StudentInfoModal
                    student={selectedStudent}
                    onClose={() => setSelectedStudent(null)}
                    onSave={handleSaveStudentInfo}
                />
            )}
            {isLimitModalOpen && (
                <LimitStudentsModal
                    onClose={() => setIsLimitModalOpen(false)}
                    onSave={(limit) => {
                        console.log("New student limit:", limit);
                        setIsLimitModalOpen(false);
                    }}
                />
            )}
            {isAddStudentModalOpen && <RegistrarRegisterForm onClose={closeAddStudentModal} />}
        </div>
    );
};

export default EnrollStudent;
