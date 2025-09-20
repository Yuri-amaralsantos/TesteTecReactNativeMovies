import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useCallback, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CardItem from "../components/CardItem";
import Header from "../components/Header";
import { fetchMovies, Movie } from "../hooks/useMovies";

export default function Home() {
  const [search, setSearch] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery<Movie[], Error>({
    queryKey: ["movies", search],
    queryFn: async (context) => {
      const page = (context.pageParam as number | undefined) ?? 1;
      return fetchMovies(page, search);
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length === 0) return undefined;
      return allPages.length + 1;
    },
  });

  const movies: Movie[] = data?.pages.flat() ?? [];

  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <View style={styles.container}>
      <Header
        search={search}
        setSearch={(text) => {
          setSearch(text);
          refetch();
        }}
      />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : isError ? (
        <View style={styles.loadingContainer}>
          <Text>Falha ao carregar filmes.</Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
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
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator size="large" color="#000" />
            ) : null
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  listContent: { padding: 16, paddingBottom: 32 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
});
