import { useEffect, useState } from 'react';

/**
 * Custom hook for fetching flight information from an API.
 *
 * @param {string} value - Code for the flight.
 * @returns {{ apiData: Array, loading: boolean }} An object containing the fetched data and loading state.
 */
const useGetInfo = (value) => {
  // State to store the fetched data
  const [apiData, setApiData] = useState([]);
  // State to track the loading status
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (value !== '') {
          // Fetch flight information from the API
          const response = await fetch(`http://localhost:8000/flight-info?id=${value}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          // Parse the response data to JSON
          const data = await response.json();
          // Set the fetched data and update loading state
          setApiData(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        // Handle errors and update loading state
        setLoading(false);
      }
    };
    fetchData();
  }, [value]);

  // Return the fetched data and loading state
  return { apiData, loading };
};

export default useGetInfo;
