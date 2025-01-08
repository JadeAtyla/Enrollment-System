import axios from "axios";
import { useState, useCallback } from "react";

const useData = (endpoint) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Fetch data
  const getData = useCallback(async () => {

    if (!endpoint) {
      setError({ status: null, message: "Endpoint is required" });
      return;
    }

    try {
      const response = await axios.get(endpoint);
      setData(response.data); // Update state with the response data
      setError(null); // Clear any previous error
    } catch (err) {
      handleError(err);
    }
  }, [endpoint]);

  // Create data (POST)
  const createData = async (newData) => {

    if (!endpoint) {
      setError({ status: null, message: "Endpoint is required" });
      return;
    }

    try {
      const response = await axios.post(endpoint, newData);
      setData(response.data); // Update state with the new data
      setError(null); // Clear any previous error
    } catch (err) {
      handleError(err);
    }
  };

// Update data (PUT)
const updateData = async (id, updatedData) => {

  if (!endpoint) {
    setError({ status: null, message: "Endpoint is required" });
    return;
  }

  let endpoint_param = `${endpoint}?id=${id}`;

  // Check if the endpoint ends with a "/"
  if (!endpoint.endsWith("/")) {
    endpoint_param = `${endpoint}&id=${id}`;
  }

  console.log(endpoint_param);

  try {
    const response = await axios.put(`${endpoint_param}`, updatedData);
    setData(response.data); // Update state with the updated data
    setError(null); // Clear any previous error
  } catch (err) {
    handleError(err);
  }
};


  // Delete data (DELETE)
  const deleteData = async (id) => {
    
    if (!endpoint) {
      setError({ status: null, message: "Endpoint is required" });
      return;
    }

    try {
      await axios.delete(`${endpoint}/${id}`);
      setData(null); // Clear data after deletion
      setError(null); // Clear any previous error
    } catch (err) {
      handleError(err);
    }
  };

  // Error handling function
  const handleError = (err) => {
    if (err?.response) {
      // console.error("API Error:", err.response.status, err.response.data);
      setError(err?.response);
      console.log(err?.response);
    } else {
      console.error("Network Error:", err.message);
      setError({ status: null, message: "Network error, please try again later." });
        // setError(err?.response);
        // setError(err.response.data);
        // console.log({"DATA UTIL": err.response.data});
    }
    setData(null); // Clear data if an error occurs
  };

  return { data, error, getData, createData, updateData, deleteData };
};

export default useData;