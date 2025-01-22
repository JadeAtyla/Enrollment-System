import axios from 'axios';

const API_URL = 'https://enrollmentsystem-b0is.onrender.com/api';

export const fetchData = async (endpoint, method = 'GET', data = null) => {
  try {
    const response = await axios({
      url: `${API_URL}/${endpoint}`,
      method,
      data,
      withCredentials: true,  // Ensure cookies are included in the request
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error.response?.data || error.message);
    throw error;
  }
};
