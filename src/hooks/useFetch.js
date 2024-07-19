import { useEffect, useState } from 'react';

const useFetch = (func) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [response, setResponse] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const res = await func();
        setResponse(res.data);
      } catch (error) {
        setError(error?.message || '');
      } finally {
        setLoading(false);
      }
    })();
  }, [func, setLoading, setResponse, setError]);

  return {
    loading,
    error,
    response,
  };
};

export default useFetch;
