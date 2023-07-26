import * as React from 'react';
import { useEffect, useRef } from 'react';

type OnClickOutsideCallback = () => void;
const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  callback: OnClickOutsideCallback
) => {
  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback?.();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, callback]);

};

export {useOnClickOutside};