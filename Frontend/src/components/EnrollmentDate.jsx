import React from 'react';

const EnrollmentDate = ({ enrollment_date, message }) => {
    // Format the date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="w-full max-w-[350px] bg-white shadow-md rounded-md p-5 text-center">
            <div className="flex items-center justify-center gap-2 text-lg font-semibold text-blue-600 mb-3">
                <span className="text-xl">📅</span>
                {formatDate(enrollment_date)}
            </div>
            <p className="text-sm text-gray-600 italic">{message}</p>
        </div>
    );
};

export default EnrollmentDate;
