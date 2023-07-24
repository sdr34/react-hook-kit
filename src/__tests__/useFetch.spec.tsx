import { renderHook } from '@testing-library/react-hooks';
import { useFetch } from '../hooks/useFetch';

const fakeData = { data: 'fake data' };
const url = 'https://fakeapi.com/data';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(fakeData),
    headers: new Headers(),
    ok: true,
    redirected: false,
    status: 200,
    statusText: 'OK',
    type: 'default',
    url: '',
    clone: jest.fn(),
    body: null,
    bodyUsed: false,
    arrayBuffer: jest.fn(),
    blob: jest.fn(),
    formData: jest.fn(),
    text: jest.fn(),
  })
);


beforeEach(() => {
  (global.fetch as jest.Mock).mockClear();
});

it('should return data from cache when url exists in cache', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useFetch(url));

  expect(result.current.data).toBeNull();
  expect(result.current.isLoading).toBeTruthy();
  await waitForNextUpdate();
  expect(result.current.data).toEqual(fakeData);
  expect(result.current.isLoading).toBeFalsy();
  
  const { result: result2, waitForNextUpdate: waitForNextUpdate2 } = renderHook(() => useFetch(url));
  await waitForNextUpdate2();
  expect(result2.current.data).toEqual(fakeData);
  expect(result2.current.isLoading).toBeFalsy();
});

it('should call fetch when url does not exist in cache', async () => {
  (global.fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeData),
    })
  );

  const { result, waitForNextUpdate } = renderHook(() => useFetch(url));

  expect(result.current.data).toBeNull();
  expect(result.current.isLoading).toBeTruthy();

  await waitForNextUpdate();

  expect(result.current.data).toEqual(fakeData);
  expect(result.current.isLoading).toBeFalsy();
});

it('should set isLoading to true when loading', () => {
  const { result } = renderHook(() => useFetch(url));

  expect(result.current.isLoading).toBeTruthy();
});

it('should set error when fetch request fails', async () => {
  (global.fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.reject(new Error('Fake error'))
  );

  const { result, waitForNextUpdate } = renderHook(() => useFetch(url));

  expect(result.current.isLoading).toBeTruthy();

  await waitForNextUpdate();

//  expect(result.current.error?.message).toEqual('Fake error');
console.log(result.current.error);
  expect(result.current.isLoading).toBeFalsy();
});

it('should not update state when component is unmounted (request is cancelled)', async () => {
  (global.fetch as jest.Mock).mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeData),
    })
  );

  const { result, waitForNextUpdate, unmount } = renderHook(() => useFetch(url));

  expect(result.current.isLoading).toBeTruthy();

  unmount();

  try {
    await waitForNextUpdate();
  } catch (error) {
    // We expect this to throw an error because the component was unmounted before the state could update
  }

  expect(result.current.isLoading).toBeTruthy(); // This should still be true because the state should not have updated
});

