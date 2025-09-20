import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra as {
  API_URL: string;
  API_KEY: string;
};

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
}

export const { API_URL, API_KEY } = extra;

export async function fetchMovies(page: number = 1) {
  const res = await fetch(
    `${API_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR&page=${page}`
  );
  const data = await res.json();
  return data.results;
}
