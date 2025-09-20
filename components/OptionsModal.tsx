import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface OptionsModalProps {
  visible: boolean;
  title?: string;
  onClose: () => void;
  onWatched: () => void;
  onWantWatch: () => void;
}

export default function OptionsModal({
  visible,
  title,
  onClose,
  onWatched,
  onWantWatch,
}: OptionsModalProps) {
  return (
    <Modal
      transparent
      animationType="none"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.modalTitle}>Opções para {title}</Text>

          <TouchableOpacity style={styles.optionButton} onPress={onWatched}>
            <Text style={styles.optionText}>Quero Assistir</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionButton} onPress={onWantWatch}>
            <Text style={styles.optionText}>Já assiti</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.optionButton, { backgroundColor: "#ddd" }]}
            onPress={onClose}
          >
            <Text style={[styles.optionText, { color: "#000" }]}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 16 },
  optionButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: { color: "white", textAlign: "center", fontSize: 16 },
});
