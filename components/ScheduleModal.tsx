import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import * as Calendar from "expo-calendar";
import React, { useState } from "react";
import {
  Alert,
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar as RNCalendar } from "react-native-calendars";

interface ScheduleModalProps {
  visible: boolean;
  onClose: () => void;
  movieTitle: string;
  onJustMark: (eventId: string) => void;
}

export default function ScheduleModal({
  visible,
  onClose,
  movieTitle,
  onJustMark,
}: ScheduleModalProps) {
  const [step, setStep] = useState<"choose" | "calendar">("choose");
  const [date, setDate] = useState<Date>(new Date());
  const [hour, setHour] = useState<number>(new Date().getHours());

  const handleClose = () => {
    setStep("choose");
    onClose();
  };

  const getTodayString = () => {
    const now = new Date();
    if (now.getHours() >= 23) {
      const tomorrow = new Date(now);
      tomorrow.setDate(now.getDate() + 1);
      const year = tomorrow.getFullYear();
      const month = (tomorrow.getMonth() + 1).toString().padStart(2, "0");
      const day = tomorrow.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    }

    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const isSameDayLocal = (d1: Date, d2: Date) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const getAvailableHours = () => {
    const now = new Date();
    const hours: number[] = [];

    for (let h = 0; h < 24; h++) {
      if (isSameDayLocal(date, now)) {
        if (h < now.getHours()) continue;

        if (h === now.getHours() && now.getMinutes() > 0) continue;
      }
      hours.push(h);
    }

    return hours;
  };

  const addMovieToCalendar = async (
    title: string,
    chosenDate: Date
  ): Promise<string | null> => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== "granted") {
      alert("Permissão para acessar calendário negada!");
      return null;
    }

    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    const defaultCalendar = calendars[0];

    const startDate = chosenDate;
    const endDate = new Date(chosenDate.getTime() + 2 * 60 * 60 * 1000);

    const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
      title: `Assistir: ${title}`,
      startDate,
      endDate,
      notes: "Adicionado pelo app",
    });

    Alert.alert("Sucesso", "Filme adicionado ao calendário!");
    handleClose();
    return eventId;
  };

  const onConfirm = async () => {
    const chosenDate = new Date(date);
    chosenDate.setHours(hour, 0, 0, 0);

    const now = new Date();
    if (chosenDate <= now) {
      Alert.alert(
        "Erro",
        "Você só pode adicionar horários futuros no dia atual."
      );
      return;
    }

    const eventId = await addMovieToCalendar(movieTitle, chosenDate);
    if (eventId) {
      onJustMark(eventId);
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
            <Ionicons name="close" size={28} color="black" />
          </TouchableOpacity>

          {step === "choose" ? (
            <View style={{ gap: 8 }}>
              <Text style={styles.modalText}>Adicionar ao calendário?</Text>
              <Button title="Sim" onPress={() => setStep("calendar")} />
              <Button
                title="Não"
                onPress={() => {
                  handleClose();
                }}
              />
            </View>
          ) : (
            <>
              <Text style={styles.modalText}>
                Escolha a data e horário para assistir {movieTitle}
              </Text>

              <RNCalendar
                onDayPress={(day) => {
                  const [y, m, d] = day.dateString.split("-").map(Number);
                  setDate(new Date(y, m - 1, d));
                }}
                minDate={getTodayString()}
                markedDates={{
                  [`${date.getFullYear()}-${(date.getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}-${date
                    .getDate()
                    .toString()
                    .padStart(2, "0")}`]: {
                    selected: true,
                  },
                }}
              />

              <View style={styles.timeContainer}>
                <Picker
                  selectedValue={hour}
                  onValueChange={(val) => setHour(val)}
                  style={{ flex: 1 }}
                >
                  {getAvailableHours().map((h) => (
                    <Picker.Item key={h} label={`${h}:00`} value={h} />
                  ))}
                </Picker>
              </View>

              <Button title="Confirmar" onPress={onConfirm} />
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    width: "80%",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalText: {
    marginTop: 32,
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
});
