import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface HeaderProps {
  search: string;
  setSearch: (text: string) => void;
}

export default function Header({ search, setSearch }: HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Cards</Text>
      <TextInput
        style={styles.input}
        placeholder="Pesquisar..."
        value={search}
        onChangeText={setSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 36,
    backgroundColor: "#fff",
    elevation: 3,
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
  input: {
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
  },
});
