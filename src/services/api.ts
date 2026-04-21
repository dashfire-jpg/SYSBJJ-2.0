export const API_URL = "https://api.seusite.com";

export async function getData(endpoint: string) {
  const response = await fetch(`${API_URL}/${endpoint}`);
  return response.json();
}
