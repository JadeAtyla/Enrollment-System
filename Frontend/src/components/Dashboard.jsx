import React from 'react';

const Dashboard = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-lg shadow-md w-[450px] p-8">
        <h1 className="text-center text-2xl font-bold text-blue-500 mb-6">Welcome to Your Dashboard</h1>
        <p className="text-lg">Student Number: {user.studentNumber}</p>
        <p className="text-lg">Course: {user.course || 'N/A'}</p>
        <button
          className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={() => alert('Log out functionality here')}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
