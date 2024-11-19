import React from 'react';
import universityLogo from '../images/universityLogo.svg';

const StudentTypeSelection = ({ setFormData, onNext }) => {
    return (
        <div className="flex justify-center items-center  bg-gray-200">
            {/* Card Container */}
            <div className="bg-white rounded-xl shadow-lg w-[866px] h-[535px] p-8 text-center">
                {/* Logo Section */}
                <div className="flex justify-center mb-8">
                    <img
                        src={universityLogo}
                        alt="University Logo"
                        className="h-[214px] w-[250]"
                    />
                </div>

                {/* Title */}
                <h1
                    className="text-[35px] font-primary font-regular text-black mb-8 tracking-[0.05em] leading-[38px]"
                >
                    STUDENT TYPE
                </h1>


                {/* Buttons */}
                <div className="flex justify-center gap-10">
                    <button
                        onClick={() => {
                            setFormData((prev) => ({ ...prev, studentType: 'Transferee' }));
                            onNext();
                        }}
                        className="bg-blue-500 text-white text-[25px] font-medium py-2 px-6 rounded-md shadow-md hover:bg-blue-600 transition-all"
                    >
                        Transferee
                    </button>
                    <button
                        onClick={() => {
                            setFormData((prev) => ({ ...prev, studentType: 'Old Student' }));
                            onNext();
                        }}
                        className="bg-blue-500 text-white text-[25px] font-medium py-2 px-6 rounded-md shadow-md hover:bg-blue-600 transition-all"
                    >
                        Old Student
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentTypeSelection;
