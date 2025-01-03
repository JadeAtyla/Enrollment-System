import React, { useEffect, useState } from "react";

let alertTrigger = null;

const Alert = ({
  type = "info", // 'info', 'success', 'error', or 'warning'
  title = "Alert Title",
  message = "This is an alert message.",
  duration = 5000, // Auto-dismiss duration in milliseconds
  onClose = null, // Function to handle close (optional)
  className = "", // Additional custom styles (optional)
}) => {
  const [visible, setVisible] = useState(false);
  const [alertConfig, setAlertConfig] = useState({
    type,
    title,
    message,
  });

  useEffect(() => {
    // Register global trigger function
    alertTrigger = (type, title, message) => {
      setAlertConfig({ type, title, message });
      setVisible(true);
      setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
    };

    return () => (alertTrigger = null); // Cleanup trigger on unmount
  }, [duration, onClose]);

  if (!visible) return null;

  const typeStyles = {
    info: "bg-[#E8F4F8] text-[#1E7E34] border-[#1E7E34]",
    success: "bg-[#E8F4F8] text-[#1E7E34] border-[#1E7E34]",
    error: "bg-[#FDECEA] text-[#D93025] border-[#D93025]",
    warning: "bg-[#FFF4E5] text-[#F4B400] border-[#F4B400]",
  };

  return (
    <div
      className={`fixed top-5 left-1/2 transform -translate-x-1/2 z-50 border-l-4 p-4 rounded-lg shadow-md flex items-start justify-between opacity-0 transition-opacity duration-300 ease-in-out ${visible ? "opacity-100" : "opacity-0"} ${typeStyles[alertConfig.type]} ${className}`}
      role="alert"
    >
      <div className="pr-4">
        <strong className="block text-lg font-semibold">{alertConfig.title}</strong>
        <p className="text-sm mt-1">{alertConfig.message}</p>
      </div>
    </div>
  );
};

// Export the trigger function to use globally
export const triggerAlert = (type, title, message) => {
  if (alertTrigger) {
    alertTrigger(type, title, message);
    console.log(`Alert Triggered: ${title} - ${message}`);
  }
};

export default Alert;