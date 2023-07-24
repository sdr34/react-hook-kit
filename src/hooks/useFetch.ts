import { useState, useEffect, useRef } from 'react';

const cache = new Map();

export const useFetch = (url: string, options?: RequestInit) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Создаем ref для хранения отметок времени начала и окончания загрузки.
  const loadTimestampRef = useRef<number | null>(null);
  const loadEndTimestampRef = useRef<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      loadTimestampRef.current = Date.now();
      setIsLoading(true);

      if (cache.get(url)) {
        const data = cache.get(url);
        loadEndTimestampRef.current = Date.now();
        
        // Отметим таймер так, чтобы обеспечить установку isLoading в true.
        const delay = Math.max(0, 100 - (loadEndTimestampRef.current - loadTimestampRef.current!));

        setTimeout(() => {
          if (!signal.aborted) {
            setData(data);
            setIsLoading(false);
          }
        }, delay);

        return;
      }

      try {
        const response = await fetch(url, { signal, ...options });

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        cache.set(url, data);

        if (!signal.aborted) {
          setData(data);
          setIsLoading(false);
        }
      } catch (error) {
        if (!signal.aborted) {
          setError(error as Error);
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };

  }, [url, options]);

  return { data, isLoading, error };
};

