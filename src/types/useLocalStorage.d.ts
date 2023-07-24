declare function useLocalStorage<T>(
  key: string,
  initialValue: T
): [
  T, 
  (value: T | ((val: T) => T)) => void,
  () => void,
  () => boolean
];

export default useLocalStorage;

