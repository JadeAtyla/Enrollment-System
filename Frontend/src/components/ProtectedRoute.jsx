import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ProtectedRoute({ children, group }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  const auth = async () => {
    try {
      // Send a request to the Protected API to validate the user's group and token
      const res = await axios.get(`/api/protect/${group}/`);

      if (res.data.success) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    } catch (error) {
      console.log("Authorization Error:", error.response?.data?.detail || error.message);
      setIsAuthorized(false);
      group = error.response.data.group // Chnage group to navigate in it's respective UI
    }
  };

  useEffect(() => {
    auth();
  }, [group]); // Run auth whenever 'group' changes

  if (isAuthorized === null) {
    // Optionally, you can show a loading spinner or placeholder until the auth check is complete
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to={`/${group}/`} />; // Redirect to login if not authorized
}