import axios from 'axios';
import { useState, useEffect } from 'react';

export function useGetData(api) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(api);

        if (response.status < 200 && response.status >= 300) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (response.data.success === false) {
          throw new Error(`Error: There is something wrong with the data.`);
        }

        setResponseData(response.data.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    getData();
  }, [api]);

  return {
    error,
    loading,
    responseData,
  };
}
