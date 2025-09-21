import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export type MovieStatus = "watched" | "want" | null;

export function useMovieStatus(movieId: string) {
  const [status, setStatus] = useState<MovieStatus>(null);
  const STORAGE_KEY = `movie_status_${movieId}`;

  useEffect(() => {
    const loadStatus = async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setStatus(saved as MovieStatus);
      } catch (err) {
        console.error("Erro ao carregar status:", err);
      }
    };
    loadStatus();
  }, [STORAGE_KEY]);

  const saveStatus = async (newStatus: MovieStatus) => {
    try {
      if (newStatus) await AsyncStorage.setItem(STORAGE_KEY, newStatus);
      else await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.error("Erro ao salvar status:", err);
    }
  };

  const toggleStatus = async (newStatus: MovieStatus) => {
    const updatedStatus = status === newStatus ? null : newStatus;
    setStatus(updatedStatus);
    await saveStatus(updatedStatus);
    return updatedStatus;
  };

  return { status, toggleStatus };
}
