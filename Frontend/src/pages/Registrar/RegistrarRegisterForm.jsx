import React, { useState } from "react";

const RegistrarRegisterForm = ({ onClose, onSave }) => {
    const [step, setStep] = useState(1);
    const [studentData, setStudentData] = useState({
        studentNumber: "",
        yearLevel: "",
        section: "",
        category: "",
        program: "",
        lastName: "",
        firstName: "",
        street: "",
        barangay: "",
        city: "",
        province: "",
        gender: "",
        contactNumber: "",
        dateOfBirth: "",
    });

    const [showConfirmation, setShowConfirmation] = useState(false);

    const handleNext = () => {
        setStep((prev) => prev + 1);
    };

    const handleBack = () => {
        setStep((prev) => prev - 1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudentData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCancel = () => {
        if (onClose) {
            onClose(); // Close the modal
        }
    };

    const handleRegister = () => {
        setShowConfirmation(true);
    };

    const confirmRegister = () => {
        if (onSave) {
            onSave(studentData); // Save the student data
        }
        setShowConfirmation(false);
        handleNext(); // Move to the final step
    };

    const cancelRegister = () => {
        setShowConfirmation(false);
    };

    const handleFinish = () => {
        if (onClose) {
            onClose(); // Close the modal
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50"
            onClick={handleCancel} // Close modal when clicking outside
        >
            <div
                className="bg-white rounded-2xl shadow-lg w-[52rem] py-[2rem] px-[3rem] h-[40rem] flex flex-col"
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
            >
                {/* Header */}
                <div className="text-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">Register Student</h2>
                </div>

                {/* Step Indicator */}
                <div className="flex justify-center items-center mb-6">
                    {[1, 2, 3].map((stepIndex) => (
                        <div key={stepIndex} className="flex items-center">
                            <div
                                className={`w-[40px] h-[40px] flex items-center justify-center rounded-full text-sm font-semibold ${stepIndex <= step
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-300 text-gray-700"
                                    }`}
                            >
                                {stepIndex}
                            </div>
                            {stepIndex !== 3 && (
                                <div
                                    className={`h-[4px] ${stepIndex < step ? "bg-blue-600" : "bg-gray-300"
                                        }`}
                                    style={{ width: "100px" }}
                                />
                            )}
                        </div>
                    ))}
                </div>

                {/* Step Content */}
                {step === 1 && (
                    <div className="flex-1 overflow-auto">
                        <h3 className="text-center text-lg font-medium text-gray-800 mb-4">
                            Student Information
                        </h3>
                        <form className="grid grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Student Number *</label>
                                <input
                                    type="text"
                                    name="studentNumber"
                                    value={studentData.studentNumber}
                                    onChange={handleChange}
                                    className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Year Level *</label>
                                <input
                                    type="text"
                                    name="yearLevel"
                                    value={studentData.yearLevel}
                                    onChange={handleChange}
                                    className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Section *</label>
                                <input
                                    type="text"
                                    name="section"
                                    value={studentData.section}
                                    onChange={handleChange}
                                    className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Category *</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={studentData.category}
                                    onChange={handleChange}
                                    className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Program *</label>
                                <input
                                    type="text"
                                    name="program"
                                    value={studentData.program}
                                    onChange={handleChange}
                                    className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div className="flex-1 overflow-auto">
                        <h3 className="text-center text-lg font-medium text-gray-800 mb-4">
                            Personal Data
                        </h3>
                        <form className="grid grid-cols-2 gap-x-8 gap-y-6">
                            <div>
                                <label className="block text-sm font-medium mb-1">Last Name *</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={studentData.lastName}
                                    onChange={handleChange}
                                    className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Street *</label>
                                <input
                                    type="text"
                                    name="street"
                                    value={studentData.street}
                                    onChange={handleChange}
                                    className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">First Name *</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={studentData.firstName}
                                    onChange={handleChange}
                                    className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Barangay *</label>
                                <input
                                    type="text"
                                    name="barangay"
                                    value={studentData.barangay}
                                    onChange={handleChange}
                                    className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Suffix (Optional)</label>
                                <input
                                    type="text"
                                    name="suffix"
                                    value={studentData.suffix}
                                    onChange={handleChange}
                                    className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={studentData.city}
                                    onChange={handleChange}
                                    className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Gender *</label>
                                <select
                                    name="gender"
                                    value={studentData.gender}
                                    onChange={handleChange}
                                    className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Province *</label>
                                <input
                                    type="text"
                                    name="province"
                                    value={studentData.province}
                                    onChange={handleChange}
                                    className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Contact Number *</label>
                                <input
                                    type="text"
                                    name="contactNumber"
                                    value={studentData.contactNumber}
                                    onChange={handleChange}
                                    className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Date of Birth *</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={studentData.dateOfBirth}
                                    onChange={handleChange}
                                    className="border rounded-lg w-full p-2 focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </form>
                    </div>
                )}

                {step === 3 && (
                    <div className="flex-1 flex flex-col justify-center items-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Student Registered!</h3>
                        <p className="text-gray-600 mb-6">
                            The student has been successfully registered.
                        </p>
                    </div>
                )}

                {/* Confirmation Modal */}
                {showConfirmation && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg shadow-lg p-6 w-[400px] text-center">
                            <h3 className="text-lg font-bold mb-4">Confirm Registration</h3>
                            <p className="text-sm text-gray-600 mb-6">
                                Are you sure you want to register this student?
                            </p>
                            <div className="flex justify-around">
                                <button
                                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                    onClick={cancelRegister}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                    onClick={confirmRegister}
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="flex justify-between items-center mt-6">
                    <p className="text-sm text-gray-500">
                        Note: Saving this changes your data in the database.
                    </p>
                    <div className="flex space-x-4">
                        {step === 1 && (
                            <button
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                                onClick={handleCancel}
                            >
                                Cancel
                            </button>
                        )}
                        {step > 1 && (
                            <button
                                className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
                                onClick={handleBack}
                            >
                                Back
                            </button>
                        )}
                        {step < 2 ? (
                            <button
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                                onClick={handleNext}
                            >
                                Next
                            </button>
                        ) : step === 2 ? (
                            <button
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                onClick={handleRegister}
                            >
                                Register
                            </button>
                        ) : (
                            <button
                                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                onClick={handleFinish}
                            >
                                Finish
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrarRegisterForm;
