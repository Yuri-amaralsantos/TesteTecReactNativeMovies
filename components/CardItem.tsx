import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

interface CardItemProps {
  item: { id: string; title: string; description: string; image: any };
  onWatched: (id: string) => void;
  onWantToWatch: (id: string) => void;
}

export default function CardItem({
  item,
  onWatched,
  onWantToWatch,
}: CardItemProps) {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardText}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.description}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.button, styles.watched]}
            onPress={() => onWatched(item.id)}
          >
            <Text style={styles.buttonText}>Já assisti</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.want]}
            onPress={() => onWantToWatch(item.id)}
          >
            <Text style={styles.buttonText}>Quero assistir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },
  cardImage: { width: "100%", height: 140 },
  cardText: { padding: 12 },
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  watched: { backgroundColor: "#4CAF50" },
  want: { backgroundColor: "#2196F3" },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});
