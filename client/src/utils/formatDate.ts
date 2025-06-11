export const formatDate = (date: string | Date): string => {
  const dateObj = new Date(date);
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(dateObj);
};
