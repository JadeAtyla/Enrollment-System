import { Navigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function ProtectedRoute({ children, group }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  const auth = async () => {
    try {
      // Send a request to the Protected API to validate the user's group and token
      const res = await axios.post(`https://enrollmentsystem-b0is.onrender.com/api/protect/${group}/`, {withCredentials: true});
      setIsAuthorized(res.data.success);
    } catch (error) {
      console.log("FROM AUTH: ", error);
      console.log("Authorization Error:", error.response?.data?.detail || error.message);

      // Check if the error is related to token expiration
      if (error) {
        refresh(); // Try refreshing the token
      } else {
        setIsAuthorized(false);
      }
    }
  };

  const refresh = async () => {
    try {
      // Send a request to the Protected API to validate the refresh token
      const res = await axios.post(`https://enrollmentsystem-b0is.onrender.com/api/refresh/`, {withCredentials: true});
      setIsAuthorized(res.data.refreshed);
    } catch (error) {
      console.log("FROM REFRESH: ", error);
      console.log("Refresh Error:", error.response?.data?.detail || error.message);
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    auth();
  }, [group]); // Run auth whenever 'group' changes

  if (isAuthorized === null) {
    // Optionally, you can show a loading spinner or placeholder until the auth check is complete
    return <div>Loading...</div>;
  }

  console.log(group)

  return isAuthorized ? children : <Navigate to={`/${group}/`} />; // Redirect to login if not authorized
}
