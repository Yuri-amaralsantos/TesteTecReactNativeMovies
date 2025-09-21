export function useTodayString() {
  const now = new Date();
  if (now.getHours() >= 23) {
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    return `${tomorrow.getFullYear()}-${(tomorrow.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${tomorrow.getDate().toString().padStart(2, "0")}`;
  }
  return `${now.getFullYear()}-${(now.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${now.getDate().toString().padStart(2, "0")}`;
}
