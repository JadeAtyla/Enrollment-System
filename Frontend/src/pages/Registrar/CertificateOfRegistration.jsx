import React, { useState, useEffect } from "react";
import universityLogo from "../../images/universityLogo.svg";
import RegistrarSidebar from "./RegistrarSidebar";
import useData from "../../components/DataUtil";

const CertificateOfRegistration = ({ onLogout, studentId }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [corData, setCorData] = useState(null);
  const { data, error, getData } = useData(`/api/cor/?id=${studentId}`);

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, [getData]);

  useEffect(() => {
    if (data) {
      setCorData(data);
    } else if (error) {
      console.error(error);
    }
  }, [data, error]);

  if (!corData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex min-h-screen bg-gradient-to-b from-[#e4ecfa] to-[#fefae0]">
        {/* Sidebar */}
        <RegistrarSidebar
          onLogout={onLogout}
          currentPage="certificate"
          isCollapsed={isSidebarCollapsed}
          onToggleSidebar={setIsSidebarCollapsed}
        />

        {/* Main Content */}
        <div
          className={`transition-all duration-300 ${
            isSidebarCollapsed ? "ml-[5rem]" : "ml-[15.625rem]"
          } flex justify-center w-full py-10`}
        >
          <div className="w-full max-w-[57rem]">
            {/* Certificate of Registration Title */}
            <div className="text-center mb-8">
              <h1 className="text-[36px] font-extrabold text-[#000000] uppercase tracking-wide">
                Certificate of Registration
              </h1>
            </div>

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
                      <p className="ml-4">{corData.student.id}</p>
                    </div>

                    <div className="flex">
                      <p className="font-bold w-1/3">Student Name:</p>
                      <p className="ml-4">
                        {`${corData.student.last_name}, ${corData.student.first_name} ${corData.student.middle_name}`}
                      </p>
                    </div>

                    <div className="flex">
                      <p className="font-bold w-1/3">Course:</p>
                      <p className="ml-4">{corData.student.program}</p>
                    </div>

                    <div className="flex">
                      <p className="font-bold w-1/3">Year:</p>
                      <p className="ml-4">{corData.student.year_level}</p>
                    </div>

                    <div className="flex">
                      <p className="font-bold w-1/3">Address:</p>
                      <p className="ml-4">{`${corData.student.address.street || ""} ${corData.student.address.barangay || ""} ${corData.student.address.city}, ${corData.student.address.province}`}</p>
                    </div>
                  </div>

                  <div className="ml-20">
                    <div className="flex">
                      <p className="font-bold w-1/3">Semester:</p>
                      <p className="ml-4">{corData.student.semester}</p>
                    </div>
                    <div className="flex">
                      <p className="font-bold w-1/3">Date:</p>
                      <p className="ml-4">[dd-mm-yyyy]</p>
                    </div>
                    <div className="flex">
                      <p className="font-bold w-1/3">Section:</p>
                      <p className="ml-4">
                        {`${corData.student.program} ${corData.student.year_level}-${corData.student.section || "TBA"}`}
                      </p>
                    </div>
                    <div className="flex">
                      <p className="font-bold w-1/3">School Year:</p>
                      <p className="ml-4">{corData.student.academic_year}</p>
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
                    {corData.enrollments.length > 0 ? (
                      corData.enrollments.map((enrollment, index) => (
                        <tr key={index}>
                          <td className="border p-2">{enrollment.course.code}</td>
                          <td className="border p-2">{enrollment.course.title}</td>
                          <td className="border p-2">{enrollment.course.units}</td>
                          <td className="border p-2">{enrollment.schedule?.time || 'N/A'}</td>
                          <td className="border p-2">{enrollment.schedule?.day || 'N/A'}</td>
                          <td className="border p-2">{enrollment.schedule?.room || 'N/A'}</td>
                        </tr>
                      ))
                    ) : (
                      [...Array(5)].map((_, index) => (
                        <tr key={index}>
                          <td className="border p-2">&nbsp;</td>
                          <td className="border p-2">&nbsp;</td>
                          <td className="border p-2">&nbsp;</td>
                          <td className="border p-2">&nbsp;</td>
                          <td className="border p-2">&nbsp;</td>
                          <td className="border p-2">&nbsp;</td>
                        </tr>
                      ))
                    )}
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
                      {corData.acad_term_billings.filter(billing => billing.billing_list.category === "LAB FEES").map((billing, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <p className="mr-2">{billing.billing_list.name}:</p>
                          <p>{billing.billing_list.price}</p>
                        </div>
                      ))}
                    </div>

                    {/* Other Fees */}
                    <div className="flex flex-col">
                      <div className="border p-2 mb-2 rounded-2xl border-black flex justify-center items-center">
                        <h3 className="font-bold">Other Fees</h3>
                      </div>
                      {corData.acad_term_billings.filter(billing => billing.billing_list.category === "OTHER FEES").map((billing, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <p className="mr-2">{billing.billing_list.name}:</p>
                          <p>{billing.billing_list.price}</p>
                        </div>
                      ))}
                    </div>

                    {/* Assessment */}
                    <div className="flex flex-col">
                      <div className="border p-2 mb-2 rounded-2xl border-black flex justify-center items-center">
                        <h3 className="font-bold">Assessment</h3>
                      </div>
                      {corData.acad_term_billings.filter(billing => billing.billing_list.category === "ASSESSMENT").map((billing, index) => (
                        <div key={index} className="flex justify-between items-center">
                          <p className="mr-2">{billing.billing_list.name}:</p>
                          <p>{billing.billing_list.price}</p>
                        </div>
                      ))}
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
                      <p>₱{corData.total_acad_term_billing_price}</p>
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
                      <p className="ml-2">{corData.student.category}</p>
                    </div>
                    <div className="flex justify-start mb-2">
                      <p className="font-bold mr-2 w-1/6">
                        Registration Status:
                      </p>
                      <p className="ml-2">{corData.student.status}</p>
                    </div>
                    <div className="flex justify-start mb-2">
                      <p className="font-bold mr-2 w-1/6">Date of Birth:</p>
                      <p className="ml-2">{corData.student.date_of_birth}</p>
                    </div>
                    <div className="flex justify-start mb-2">
                      <p className="font-bold mr-2 w-1/6">Gender:</p>
                      <p className="ml-2">{corData.student.gender}</p>
                    </div>
                    <div className="flex justify-start mb-2">
                      <p className="font-bold mr-2 w-1/6">Contact Number:</p>
                      <p className="ml-2">{corData.student.contact_number}</p>
                    </div>
                    <div className="flex justify-start mb-2">
                      <p className="font-bold mr-2  w-1/6">Email Address:</p>
                      <p className="ml-2">{corData.student.email}</p>
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
      </div>
    </div>
  );
};

export default CertificateOfRegistration;