import * as React from 'react';
import { useEffect, useRef } from 'react';

// Хук useDebounce для ограничения скорости срабатывания функции
const useDebounce = (callback: () => void, delay: number, dependencies: any[]) => {
  const timerRef = useRef<NodeJS.Timeout | undefined>();

  useEffect(() => {
    clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [...dependencies, callback, delay]);
};
export {useDebounce};
