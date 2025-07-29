const formatLatestMessageDate = (date: Date): string => {
  if (!date) return "";

  const dateObject = new Date(date);
  const now = new Date();
  const diffMs = now.getTime() - dateObject.getTime();

  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  }).format(dateObject);

  if (minutes < 1) return `${time} (just now)`;
  if (minutes < 60)
    return `${time} (${minutes} minute${minutes !== 1 ? "s" : ""} ago)`;
  if (hours < 24) return `${time} (${hours} hour${hours !== 1 ? "s" : ""} ago)`;
  if (days < 7) return `${time} (${days} day${days !== 1 ? "s" : ""} ago)`;
  if (weeks < 4) return `${time} (${weeks} week${weeks !== 1 ? "s" : ""} ago)`;
  if (months < 12)
    return `${time} (${months} month${months !== 1 ? "s" : ""} ago)`;
  return `${time} (${years} year${years !== 1 ? "s" : ""} ago)`;
};

export default formatLatestMessageDate;
