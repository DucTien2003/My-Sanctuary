import axiosCustom from '@/api/axiosCustom';
import { useState, useEffect } from 'react';

export function useGetData(apis) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState([]);

  useEffect(() => {
    console.log('Call:', apis);

    const getData = async () => {
      try {
        setLoading(true);
        const responses = await Promise.all(
          apis.map((api) => axiosCustom().get(api))
        );

        const data = responses.map((response) => response.data);

        setInitialData(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.log('Error:' + error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    getData();
  }, [apis]);

  return {
    error,
    loading,
    initialData,
  };
}
