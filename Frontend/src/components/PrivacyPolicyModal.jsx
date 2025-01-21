import React from "react";

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto scroll-smooth">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h1 className="text-3xl font-bold text-center text-gray-800">Privacy Policy</h1>
        </div>

        {/* Content */}
        <section className="space-y-6">
          <p className="text-gray-600 mb-4">
            <strong>Effective Date:</strong> <span className="text-gray-800">[Insert Date]</span>
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">1. Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              Cavite State University - Bacoor Campus (referred to as "University," "we," "us," or "our") respects the privacy of its users and is committed to protecting personal information collected through the <strong>Enrollment System</strong> ("System"). This Privacy Policy explains how we collect, use, store, and protect your personal data when using the System.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">2. Definitions</h2>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li><strong>"System"</strong> refers to the Enrollment System of Cavite State University - Bacoor Campus.</li>
              <li><strong>"User"</strong> refers to students, registrars, department staff, and administrators who use the System.</li>
              <li><strong>"Personal Data"</strong> refers to any information that can be used to identify a user, such as name, student ID, contact details, academic records, and enrollment data.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">3. Information We Collect</h2>
            <p className="text-gray-700 leading-relaxed">We collect the following types of information:</p>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li><strong>Personal Identification Information:</strong> Name, Student ID, email address, phone number.</li>
              <li><strong>Academic Information:</strong> Course checklist, grades, enrollment requests, and COR.</li>
              <li><strong>Account Information:</strong> Username, password, and user roles (Student, Registrar, Department, Admin).</li>
              <li><strong>System Usage Data:</strong> Logs, access records, and actions performed within the System.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">4. How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed">We use collected data to:</p>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li>Process and manage student enrollments.</li>
              <li>Verify academic records and student credentials.</li>
              <li>Facilitate communication between students, registrars, and departments.</li>
              <li>Improve System security and performance.</li>
              <li>Comply with legal and institutional requirements.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">5. Legal Basis for Processing</h2>
            <p className="text-gray-700 leading-relaxed">We process personal data based on:</p>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li><strong>User consent</strong> (when creating an account and using the System).</li>
              <li><strong>Legitimate interests</strong> (to provide academic services).</li>
              <li><strong>Legal obligations</strong> (compliance with educational regulations).</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">6. Sharing of Information</h2>
            <p className="text-gray-700 leading-relaxed">Personal data may be shared only with authorized personnel within Cavite State University - Bacoor Campus, such as:</p>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li><strong>Registrars and department staff</strong> for enrollment processing.</li>
              <li><strong>University administrators</strong> for academic management.</li>
              <li><strong>Third-party service providers</strong> (if applicable, for system maintenance).</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">We do not sell or distribute personal data to external parties.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">7. Data Storage and Security</h2>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li>Data is stored on secure university servers.</li>
              <li>Encryption and access controls protect sensitive information.</li>
              <li>Regular security audits ensure data protection.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">8. Your Rights as a Data Subject</h2>
            <p className="text-gray-700 leading-relaxed">Under <strong>RA 10173 (Data Privacy Act of 2012)</strong>, you have the right to:</p>
            <ul className="text-gray-700 list-disc pl-5 space-y-2">
              <li><strong>Access</strong> your personal data.</li>
              <li><strong>Correct</strong> inaccurate or incomplete data.</li>
              <li><strong>Request deletion</strong> of your data under lawful conditions.</li>
              <li><strong>Object</strong> to certain types of data processing.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">9. Updates to this Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">We may update this policy periodically. Users will be notified of significant changes through the System or via email.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">10. Contact Information</h2>
            <p className="text-gray-700 leading-relaxed">For concerns about data privacy, contact us at:</p>
            <p className="text-gray-700">
              <strong>Email:</strong> cvsubacoor@cvsu.edu.ph <br />
              <strong>Phone:</strong> (046) 476-5029
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">11. Compliance with RA 10173</h2>
            <p className="text-gray-700 leading-relaxed">This Privacy Policy complies with <strong>Republic Act No. 10173 (Data Privacy Act of 2012)</strong> and other relevant Philippine laws and university policies.</p>
          </div>
        </section>

        {/* Close Button */}
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;