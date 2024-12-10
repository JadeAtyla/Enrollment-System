import React from "react";
import Header from "./Header"; // Custom Header
import Sidebar from "./Sidebar"; // Custom Sidebar
import universityLogo from "../../images/universityLogo.svg";
import { useNavigate } from "react-router-dom";

const COR = ({ onLogout }) => {
  const navigate = useNavigate();

  
  const year = "3rd Year"; // Replace with dynamic value if needed
  const section = "A"; // Replace with dynamic value if needed

  const handleNavigate = (section) => {
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
      {/* Header Section */}
      <Header onLogout={onLogout} />
      <div className="flex justify-center items-center bg-[#e4ecfa] py-3">
        <h1 className="text-[36px] font-extrabold text-[#000000] uppercase tracking-wide mt-5">
          Certificate of Registration
        </h1>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 justify-center items-center w-full h-auto pb-14">
        <Sidebar onNavigate={handleNavigate} />
         {/* Main Content */}
         <div className="flex justify-center items-center">
              <div className="bg-white w-full rounded-[20px] shadow-lg p-8">
                {/* Header Section */}
                <div className="text-center mb-6">
                  <img
                    src={universityLogo}
                    alt="University Logo"
                    className="h-16 mx-auto mb-4"
                  />
                  <h2 className="text-[20px] font-bold uppercase">
                    Cavite State University
                  </h2>
                  <p className="text-[16px] font-medium">Bacoor Campus</p>
                  <h3 className="text-[20px] font-bold mt-4">
                    Registration Form
                  </h3>
                </div>

                {/* Student Info Section */}
                <div className="grid grid-cols-2 gap-x-24 gap-y-6 mb-6 text-[14px]">
                  <div>
                    <div className="flex">
                      <p className="font-bold w-1/3">Student Number:</p>
                      <p className="ml-4">[20######]</p>
                    </div>

                    <div className="flex">
                      <p className="font-bold w-1/3">Student Name:</p>
                      <p className="ml-4">
                        [Last Name], [First Name] [Middle Name]
                      </p>
                    </div>

                    <div className="flex">
                      <p className="font-bold w-1/3">Course:</p>
                      <p className="ml-4">BSCS</p>
                    </div>

                    <div className="flex">
                      <p className="font-bold w-1/3">Year:</p>
                      <p className="ml-4">{year}</p>
                    </div>

                    <div className="flex">
                      <p className="font-bold w-1/3">Address:</p>
                      <p className="ml-4">[Address]</p>
                    </div>
                  </div>

                  <div className="ml-20">
                    <div className="flex">
                      <p className="font-bold w-1/3">Semester:</p>
                      <p className="ml-4">1st Semester</p>
                    </div>
                    <div className="flex">
                      <p className="font-bold w-1/3">Date:</p>
                      <p className="ml-4">[dd-mm-yyyy]</p>
                    </div>
                    <div className="flex">
                      <p className="font-bold w-1/3">Section:</p>
                      <p className="ml-4">
                        BSCS {year} - {section}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="font-bold w-1/3">School Year:</p>
                      <p className="ml-4">[2024-2025]</p>
                    </div>
                  </div>
                </div>

                {/* Course Table */}
                <table className="w-full text-left border-collapse mb-6 text-[14px]">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border p-2">COURSE CODE</th>
                      <th className="border p-2">COURSE TITLE</th>
                      <th className="border p-2">UNITS</th>
                      <th className="border p-2">TIME</th>
                      <th className="border p-2">DAY</th>
                      <th className="border p-2">ROOM</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2">COSC 000</td>
                      <td className="border p-2">
                        COMPUTER PROGRAMMING
                      </td>
                      <td className="border p-2">3</td>
                      <td className="border p-2">7:30 AM</td>
                      <td className="border p-2">MONDAY</td>
                      <td className="border p-2">COMLAB 1</td>
                    </tr>
                    {[...Array(5)].map((_, index) => (
                      <tr key={index}>
                        <td className="border p-2">&nbsp;</td>
                        <td className="border p-2">&nbsp;</td>
                        <td className="border p-2">&nbsp;</td>
                        <td className="border p-2">&nbsp;</td>
                        <td className="border p-2">&nbsp;</td>
                        <td className="border p-2">&nbsp;</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Fee and Assessment Section */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {/* Left Column with 3 sections in 3 columns */}
                  <div className="grid grid-cols-3 gap-4">
                    {/* Lab Fees */}
                    <div className="flex flex-col">
                      <div className="border p-2 mb-2 rounded-2xl border-black flex justify-center items-center">
                        <h3 className="font-bold">Lab Fees</h3>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="mr-2">ComLab:</p>
                        <p>₱800.00</p>
                      </div>
                    </div>

                    {/* Other Fees */}
                    <div className="flex flex-col">
                      <div className="border p-2 mb-2 rounded-2xl border-black flex justify-center items-center">
                        <h3 className="font-bold">Other Fees</h3>
                      </div>
                      <ul className="list-none">
                        <li className="flex justify-between items-center">
                          <p className="mr-2">NSTP</p>
                          <p>-</p>
                        </li>
                        <li className="flex justify-between items-center">
                          <p className="mr-2">Reg. Fee</p>
                          <p>-</p>
                        </li>
                        <li className="flex justify-between items-center">
                          <p className="mr-2">ID</p>
                          <p>-</p>
                        </li>
                        <li className="flex justify-between items-center">
                          <p className="mr-2">Late Fee</p>
                          <p>-</p>
                        </li>
                        <li className="flex justify-between items-center">
                          <p className="mr-2">Insurance</p>
                          <p>-</p>
                        </li>
                      </ul>
                    </div>

                    {/* Assessment */}
                    <div className="flex flex-col">
                      <div className="border p-2 mb-2 rounded-2xl border-black flex justify-center items-center">
                        <h3 className="font-bold">Assessment</h3>
                      </div>
                      <ul className="list-none">
                        <li className="flex justify-between items-center">
                          <p className="mr-2">Tuition Fee</p>
                          <p>-</p>
                        </li>
                        <li className="flex justify-between items-center">
                          <p className="mr-2">SFDF</p>
                          <p>-</p>
                        </li>
                        <li className="flex justify-between items-center">
                          <p className="mr-2">SRF</p>
                          <p>-</p>
                        </li>
                        <li className="flex justify-between items-center">
                          <p className="mr-2">Misc.</p>
                          <p>-</p>
                        </li>
                        <li className="flex justify-between items-center">
                          <p className="mr-2">Athletics</p>
                          <p>-</p>
                        </li>
                        <li className="flex justify-between items-center">
                          <p className="mr-2">SCUAA</p>
                          <p>-</p>
                        </li>
                        <li className="flex justify-between items-center">
                          <p className="mr-2">Library Fee</p>
                          <p>-</p>
                        </li>
                        <li className="flex justify-between items-center">
                          <p className="mr-2">Lab Fees</p>
                          <p>-</p>
                        </li>
                        <li className="flex justify-between items-center">
                          <p className="mr-2">Other Fees</p>
                          <p>-</p>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="ml-20">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold border p-2 rounded-lg border-black">
                        Total UNITS:
                      </p>
                      <p>21</p>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold border p-2 rounded-lg border-black">
                        Total HOURS:
                      </p>
                      <p>31</p>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-bold border p-2 rounded-lg border-black">
                        Total AMOUNT:
                      </p>
                      <p>₱3800.00</p>
                    </div>

                    {/* Scholarship Section */}
                    <div className="mt-4">
                      <h3 className="font-bold text-center mb-2">
                        Scholarship
                      </h3>
                      <p className="text-center font-medium">
                        <strong>CHED Free Tuition and Misc. Fee</strong>
                      </p>
                      <div className="mt-2">
                        <p className="flex justify-between">
                          <span>Tuition</span>
                          <span>₱3800.00</span>
                        </p>
                        <p className="flex justify-between">
                          <span>SFDF</span>
                          <span>₱3800.00</span>
                        </p>
                        <p className="flex justify-between">
                          <span>SRF</span>
                          <span>₱3800.00</span>
                        </p>
                      </div>
                    </div>

                    {/* Terms of Payment Section */}
                    <div className="mt-6">
                      <h3 className="font-bold text-center mb-2">
                        Terms of Payment
                      </h3>
                      <p className="flex justify-between">
                        <span>First</span>
                        <span>₱3800.00</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Second</span>
                        <span>-</span>
                      </p>
                      <p className="flex justify-between">
                        <span>Third</span>
                        <span>-</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Additional Student Information Section */}
                <div>
                  <h3 className="font-bold text-left mb-4">
                    Additional Information
                  </h3>
                  <div className="text-sm">
                    <div className="flex justify-start mb-2">
                      <p className="font-bold mr-2 w-1/6">Old/New Student:</p>
                      <p className="ml-2">[Old Student]</p>
                    </div>
                    <div className="flex justify-start mb-2">
                      <p className="font-bold mr-2 w-1/6">
                        Registration Status:
                      </p>
                      <p className="ml-2">[Transferee]</p>
                    </div>
                    <div className="flex justify-start mb-2">
                      <p className="font-bold mr-2 w-1/6">Date of Birth:</p>
                      <p className="ml-2">[Month Day, Year]</p>
                    </div>
                    <div className="flex justify-start mb-2">
                      <p className="font-bold mr-2 w-1/6">Gender:</p>
                      <p className="ml-2">[Non-Binary haha]</p>
                    </div>
                    <div className="flex justify-start mb-2">
                      <p className="font-bold mr-2 w-1/6">Contact Number:</p>
                      <p className="ml-2">[09#########]</p>
                    </div>
                    <div className="flex justify-start mb-2">
                      <p className="font-bold mr-2  w-1/6">Email Address:</p>
                      <p className="ml-2">[Email@Email.com]</p>
                    </div>
                  </div>

                  {/* Student's Signature Section */}
                  <div className="mt-6">
                    <p className="font-bold mb-1">Student's Signature:</p>
                    <div className="border-t-2 border-black w-1/3 mx-40"></div>
                  </div>
                </div>

                <div className="relative mt-6">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 absolute bottom-0 right-0 mb-4 mr-4">
                    Print PDF
                  </button>
                </div>
              </div>
            </div>
      </div>
    </div>
  );
};

export default COR;
