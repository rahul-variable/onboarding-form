export async function fetchData<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    // If the API provides an error message, throw that
    throw new Error(data?.message || `HTTP error! status: ${response.status}`);
  }
  return data;
}
