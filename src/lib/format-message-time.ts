export function formatMessageTimestamp(
  timestamp: number,
  locale = "en-GB"
): string {
  const date = new Date(timestamp);
  const datePart = date.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const time = date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${datePart}, ${time}`;
}
