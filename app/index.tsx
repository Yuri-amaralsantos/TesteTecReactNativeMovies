import React, { useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Header from "../components/Header";
import CardItem from "../components/CardItem";
import OptionsModal from "../components/OptionsModal";

const cards = [
  {
    id: "1",
    title: "Card 1",
    description: "Descrição do Card 1",
    image: require("@/assets/images/partial-react-logo.png"),
  },
  {
    id: "2",
    title: "Card 2",
    description: "Descrição do Card 2",
    image: require("@/assets/images/partial-react-logo.png"),
  },
  {
    id: "3",
    title: "Card 3",
    description: "Descrição do Card 3",
    image: require("@/assets/images/partial-react-logo.png"),
  },
];

export default function Home() {
  const [selectedCard, setSelectedCard] = useState<(typeof cards)[0] | null>(
    null
  );
  const [search, setSearch] = useState("");

  const filteredCards = cards.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header search={search} setSearch={setSearch} />

      <FlatList
        data={filteredCards}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <CardItem item={item} onPress={() => setSelectedCard(item)} />
        )}
      />

      <OptionsModal
        visible={!!selectedCard}
        title={selectedCard?.title}
        onClose={() => setSelectedCard(null)}
        onWatched={() => {
          console.log("Já assistido", selectedCard?.id);
          setSelectedCard(null);
        }}
        onWantWatch={() => {
          console.log("Quero Assistir", selectedCard?.id);
          setSelectedCard(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  listContent: { padding: 16, paddingBottom: 32 },
});
