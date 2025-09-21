import * as Calendar from "expo-calendar";
import { Alert } from "react-native";

export function useCalendar() {
  const addEvent = async (title: string, date: Date) => {
    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permissão negada", "Não é possível acessar o calendário");
      return null;
    }

    const calendars = await Calendar.getCalendarsAsync(
      Calendar.EntityTypes.EVENT
    );
    const defaultCalendar = calendars[0];

    const startDate = date;
    const endDate = new Date(date.getTime() + 2 * 60 * 60 * 1000);

    const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
      title,
      startDate,
      endDate,
      notes: "Adicionado pelo app",
    });

    Alert.alert("Sucesso", "Filme adicionado ao calendário!");
    return eventId;
  };

  const removeEvent = async (eventId: string) => {
    try {
      await Calendar.deleteEventAsync(eventId);
      console.log("Evento removido do calendário");
    } catch (err) {
      console.error("Erro ao remover evento do calendário:", err);
    }
  };

  return { addEvent, removeEvent };
}
