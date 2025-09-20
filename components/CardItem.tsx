import React from "react";
import { Pressable, View, Text, Image, StyleSheet } from "react-native";

interface CardItemProps {
  item: { id: string; title: string; description: string; image: any };
  onPress: () => void;
}

export default function CardItem({ item, onPress }: CardItemProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardText}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    </Pressable>
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
  title: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
});
