import { useEffect, useState } from 'react';

/**
 * This hook use for get data from api
 * @param {String} apiLink api link without base URL and '/'
 * @param {String} effectDependency useEffect Dependency
 * @param {String} callMethod API Call Method
 * @returns data from api and loading state
 */
const useCallMethods = ({ apiLink, effectDependency, callMethod }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseURL = 'http://localhost:4000/api'

  if (callMethod === 'get') {
    return useEffect(() => {
      setLoading(true);
      const options = {
        method: 'GET',
        credentials: "include",
        withCredentials: true
      };

      fetch(`${baseURL}/${apiLink}`, options)
        .then(response => response.json())
        .then(response => {
          setApiData(response);
          // console.log(response);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    }, [effectDependency && effectDependency]);
  }
  else if (callMethod === 'post') {
    return useEffect(() => {
      setLoading(true);
      const options = {
        method: 'GET',
        credentials: "include",
        withCredentials: true
      };

      fetch(`${baseURL}/${apiLink}`, options)
        .then(response => response.json())
        .then(response => {
          setApiData(response);
          // console.log(response);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false))
    }, [effectDependency && effectDependency]);
  }

  const dataInfo = { apiData, loading };

  return dataInfo;

};

export default useCallMethods;
