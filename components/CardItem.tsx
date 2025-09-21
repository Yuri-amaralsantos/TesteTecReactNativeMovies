import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCalendar } from "../hooks/useCalendar";
import { useMovieStatus } from "../hooks/useMovieStatus";
import ScheduleModal from "./ScheduleModal";

interface CardItemProps {
  item: { id: string; title: string; description: string | null; image: any };
  onWatched: (id: string) => void;
  onWantToWatch: (id: string) => void;
}

export default function CardItem({
  item,
  onWatched,
  onWantToWatch,
}: CardItemProps) {
  const { status, toggleStatus } = useMovieStatus(item.id);
  const { addEvent, removeEvent } = useCalendar();
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [calendarEventId, setCalendarEventId] = useState<string | null>(null);

  const handleWatched = async () => {
    const newStatus = await toggleStatus("watched");
    if (newStatus === "watched") onWatched(item.id);
  };

  const handleWant = async () => {
    const newStatus = await toggleStatus("want");

    if (newStatus === "want") {
      onWantToWatch(item.id);
      setShowModal(true);
    } else if (newStatus === null && calendarEventId) {
      await removeEvent(calendarEventId);
      setCalendarEventId(null);
    }
  };

  const description =
    item.description && item.description.trim() !== ""
      ? item.description
      : "Sem descrição disponível.";

  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardText}>
        <Text style={styles.title}>{item.title}</Text>

        <Text
          numberOfLines={expanded ? undefined : 2}
          style={styles.description}
        >
          {description}
        </Text>

        {description.length > 100 && (
          <TouchableOpacity onPress={() => setExpanded(!expanded)}>
            <Text style={styles.seeMore}>
              {expanded ? "Ver menos" : "Ver mais"}
            </Text>
          </TouchableOpacity>
        )}

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[
              styles.button,
              status === "watched" ? styles.active : styles.inactive,
            ]}
            onPress={handleWatched}
          >
            <Text style={styles.buttonText}>Já assisti</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.button,
              status === "want" ? styles.active : styles.inactive,
            ]}
            onPress={handleWant}
          >
            <Text style={styles.buttonText}>Quero assistir</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScheduleModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        movieTitle={item.title}
        onJustMark={(eventId: string) => setCalendarEventId(eventId)}
      />
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
  description: { fontSize: 14, color: "#333", lineHeight: 20 },
  seeMore: { color: "#1E90FF", marginTop: 4, fontWeight: "600" },
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
  active: { backgroundColor: "#4CAF50" },
  inactive: { backgroundColor: "#B0B0B0" },
  buttonText: { color: "white", textAlign: "center", fontWeight: "bold" },
});
