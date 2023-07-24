import { renderHook, act } from '@testing-library/react-hooks';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Mock localStorage
const mockLocalStorage = (mockStorage: Record<string, string>) => {
  global.Storage.prototype.getItem = jest.fn((key: string) => mockStorage[key]);
  global.Storage.prototype.setItem = jest.fn((key: string, value: string) => { mockStorage[key] = value; });
  global.Storage.prototype.removeItem = jest.fn((key: string) => { delete mockStorage[key]; });
  global.Storage.prototype.clear = jest.fn(() => { mockStorage = {}; });
}

beforeEach(() => {
  // Set up localStorage mock before each test
  mockLocalStorage({});
});

describe('useLocalStorage', () => {
  it('reads the initial value from localStorage', () => {
    mockLocalStorage({ myKey: JSON.stringify('test value') });
    const { result } = renderHook(() => useLocalStorage('myKey', 'default value'));
    expect(result.current[0]).toEqual('test value');
  });

  it('uses the initial value if there is nothing in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('myKey', 'default value'));
    expect(result.current[0]).toEqual('default value');
  });

  it('writes the value to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('myKey', 'default value'));

    act(() => {
      result.current[1]('new value');
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('myKey', JSON.stringify('new value'));
    expect(result.current[0]).toEqual('new value');
  });

  it('removes the value from localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('myKey', 'default value'));

    act(() => {
      result.current[2]();
    });

    expect(localStorage.removeItem).toHaveBeenCalledWith('myKey');
    expect(result.current[0]).toBeNull();
  });

  it('checks if the key exists in localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('myKey', 'default value'));

    act(() => {
      result.current[1]('new value');
    });

    expect(result.current[3]()).toEqual(true);
  });
});

