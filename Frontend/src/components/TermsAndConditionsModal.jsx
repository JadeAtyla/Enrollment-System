import React from "react";

const TermsAndConditionsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-3xl w-full max-h-[80vh] overflow-y-auto scroll-smooth">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h1 className="text-3xl font-bold text-gray-800">Terms and Conditions</h1>
        </div>

        {/* Content */}
        <p className="text-gray-600 mb-4">
          <strong>Effective Date:</strong> <span className="text-gray-800">[Insert Date]</span>
        </p>

        <section className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">1. Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using the <strong>Enrollment System</strong>, you agree to comply with these <strong>Terms and Conditions</strong>. If you do not agree, do not use the System.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">2. Purpose of the System</h2>
            <p className="text-gray-700 leading-relaxed">
              The <strong>Enrollment System</strong> facilitates the enrollment process, academic records management, and communication between students, registrars, and departments.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">3. User Accounts</h2>
            <div className="text-gray-700 leading-relaxed">
              <h3 className="font-semibold">Account Creation</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Only students, registrars, department staff, and administrators are permitted to create accounts.</li>
                <li>Users must provide accurate personal and academic details.</li>
              </ul>
              <h3 className="font-semibold mt-4">Account Security</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Users are responsible for maintaining the confidentiality of their account credentials.</li>
                <li>Any unauthorized access must be reported immediately.</li>
              </ul>
              <h3 className="font-semibold mt-4">Account Usage</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Accounts are for academic purposes only.</li>
                <li>Misuse of an account may result in suspension or termination.</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">4. Use of the System</h2>
            <div className="text-gray-700 leading-relaxed">
              <h3 className="font-semibold">Lawful Use</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Users must use the System for educational purposes only and comply with university policies.</li>
              </ul>
              <h3 className="font-semibold mt-4">Appropriate Conduct</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Users must not engage in any fraudulent activities, such as falsifying academic records.</li>
              </ul>
              <h3 className="font-semibold mt-4">System Integrity</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Any attempt to hack, alter, or disrupt the System is prohibited.</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">5. Data Privacy and Security</h2>
            <div className="text-gray-700 leading-relaxed">
              <h3 className="font-semibold">Data Collection</h3>
              <p>The System collects user data as outlined in the <strong>Privacy Policy</strong>.</p>
              <h3 className="font-semibold mt-4">Data Use</h3>
              <p>Data is used solely for academic and enrollment purposes.</p>
              <h3 className="font-semibold mt-4">Data Security</h3>
              <p>The university implements security measures to protect user data.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">6. Academic Information and Accuracy</h2>
            <div className="text-gray-700 leading-relaxed">
              <h3 className="font-semibold">Accuracy of Information</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Users must ensure all submitted academic records and personal details are accurate.</li>
              </ul>
              <h3 className="font-semibold mt-4">Grade Information</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Grades displayed in the System are final unless officially revised by the department.</li>
              </ul>
              <h3 className="font-semibold mt-4">Transcript Information</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Official transcripts must be obtained from the Registrar’s Office.</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">7. System Availability and Maintenance</h2>
            <div className="text-gray-700 leading-relaxed">
              <h3 className="font-semibold">Service Uptime</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>The university aims to maintain System availability but does not guarantee uninterrupted access.</li>
              </ul>
              <h3 className="font-semibold mt-4">Maintenance</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Regular maintenance may be conducted, affecting availability.</li>
              </ul>
              <h3 className="font-semibold mt-4">No Guarantee</h3>
              <p>The university is not liable for technical issues or downtime.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">8. Changes to Terms</h2>
            <div className="text-gray-700 leading-relaxed">
              <h3 className="font-semibold">Updates</h3>
              <p>The university may modify these Terms and Conditions.</p>
              <h3 className="font-semibold mt-4">Notification</h3>
              <p>Users will be notified of significant changes via email or System announcements.</p>
              <h3 className="font-semibold mt-4">Continued Use</h3>
              <p>Continued use of the System after updates constitutes acceptance of the revised Terms.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">9. Intellectual Property</h2>
            <div className="text-gray-700 leading-relaxed">
              <h3 className="font-semibold">Ownership</h3>
              <p>The System and its contents are the property of Cavite State University - Bacoor Campus.</p>
              <h3 className="font-semibold mt-4">Usage</h3>
              <p>Users may access System data only for academic purposes.</p>
              <h3 className="font-semibold mt-4">Prohibition</h3>
              <p>Unauthorized copying, modification, or distribution of System content is prohibited.</p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">10. Disclaimer of Warranties</h2>
            <p className="text-gray-700 leading-relaxed">The System is provided "as is" without warranties of any kind.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">11. Limitation of Liability</h2>
            <p className="text-gray-700 leading-relaxed">The university is not liable for any loss or damages resulting from the use of the System.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">12. Indemnification</h2>
            <p className="text-gray-700 leading-relaxed">Users agree to indemnify and hold the university harmless from any claims arising from misuse of the System.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">13. Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">These Terms are governed by the laws of the <strong>Republic of the Philippines</strong>.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">14. Contact Information</h2>
            <p className="text-gray-700">
              <strong>Email:</strong> cvsubacoor@cvsu.edu.ph <br />
              <strong>Phone:</strong> (046) 476-5029
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">15. Entire Agreement</h2>
            <p className="text-gray-700 leading-relaxed">These Terms constitute the entire agreement between the university and users regarding the System.</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">16. Severability</h2>
            <p className="text-gray-700 leading-relaxed">If any provision is found invalid, the remaining terms remain in effect.</p>
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

export default TermsAndConditionsModal;