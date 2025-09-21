import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
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
import { useAvailableHours } from "../hooks/useAvailableHours";
import { useCalendar } from "../hooks/useCalendar";
import { useTodayString } from "../hooks/useTodayString";

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
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date().getHours());

  const todayString = useTodayString();
  const availableHours = useAvailableHours(date);
  const { addEvent } = useCalendar();

  const handleClose = () => {
    setStep("choose");
    onClose();
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

    const eventId = await addEvent(`Assistir: ${movieTitle}`, chosenDate);
    if (eventId) {
      onJustMark(eventId);
      handleClose();
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
              <Button title="Não" onPress={handleClose} />
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
                minDate={todayString}
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
                  onValueChange={setHour}
                  style={{ flex: 1 }}
                >
                  {availableHours.map((h) => (
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
  closeButton: { position: "absolute", top: 10, right: 10 },
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
