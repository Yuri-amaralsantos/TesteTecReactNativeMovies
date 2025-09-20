import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import CardItem from "../components/CardItem";
import Header from "../components/Header";
import { fetchMovies } from "../hooks/useMovies";

export default function Home() {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const loadMovies = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const newMovies = await fetchMovies(page);
      setMovies((prev) => [...prev, ...newMovies]);
      setPage((prev) => prev + 1);
    } catch (err) {
      console.error("Erro ao carregar filmes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  return (
    <View style={styles.container}>
      <Header search={""} setSearch={() => {}} />

      <FlatList
        data={movies}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CardItem
            item={{
              id: item.id.toString(),
              title: item.title,
              description: item.overview,
              image: {
                uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
              },
            }}
            onWatched={(id) => console.log("Já assisti:", id)}
            onWantToWatch={(id) => console.log("Quero assistir:", id)}
          />
        )}
        onEndReached={loadMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading ? <ActivityIndicator size="large" color="#000" /> : null
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  listContent: { padding: 16, paddingBottom: 32 },
});
