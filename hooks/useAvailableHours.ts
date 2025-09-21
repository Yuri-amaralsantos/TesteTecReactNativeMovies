import { useEffect, useState } from "react";

export function useAvailableHours(selectedDate: Date) {
  const [hours, setHours] = useState<number[]>([]);

  useEffect(() => {
    const now = new Date();
    const result: number[] = [];
    for (let h = 0; h < 24; h++) {
      if (
        selectedDate.toDateString() === now.toDateString() &&
        (h < now.getHours() || (h === now.getHours() && now.getMinutes() > 0))
      )
        continue;
      result.push(h);
    }
    setHours(result);
  }, [selectedDate]);

  return hours;
}
