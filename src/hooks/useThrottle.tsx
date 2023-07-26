import * as React from 'react';
import { useEffect, useState } from 'react';

const useThrottle = (func: () => void, delay: number) => {
  const [lastCall, setLastCall] = useState(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastCall >= delay) {
        setLastCall(Date.now());
        func();
      }
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [func, delay, lastCall]);
};

export {useThrottle};