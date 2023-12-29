export const parseDate = (unix_timestamp: number) => {
  const date = new Date(unix_timestamp);

  return date.toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour: "numeric",
    hour12: true,
  });
};
