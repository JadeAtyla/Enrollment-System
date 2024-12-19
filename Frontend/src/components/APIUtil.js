import { useState, useEffect } from "react";
import axios from "axios";

const useApi = (url, method, data = null, dependencies = [], triggerRequest = false) => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (method === "GET" || triggerRequest) {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
          const res = method === "GET" 
            ? await axios.get(url) // For GET requests, we just send the URL
            : await axios({ url, method, data }); // For other methods, use data and method

          setResponse(res.data);
          setSuccess(true);
        } catch (error) {
          setError(error.response?.data?.detail || error.message);
          setSuccess(false);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [triggerRequest, url, method, data, ...dependencies]); // Dependencies are important to watch changes

  return { data: response, loading, error, success };
};

export default useApi;