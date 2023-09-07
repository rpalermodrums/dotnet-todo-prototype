import wrapPromise from './wrapPromise'

function fetchData(url: string, options?: RequestInit) {
  const headers = {
    'Content-Type': 'application/json',
  };
  const promise = fetch(url, { headers, ...options})
    .then((res) => res.json())

  return wrapPromise(promise)
}

export default fetchData;
