import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export function useAsync(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const run = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetcher();
      setData(result);
      return result;
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Something went wrong');
      throw error;
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    run().catch(() => {});
  }, [run]);

  return { data, setData, loading, refetch: run };
}
