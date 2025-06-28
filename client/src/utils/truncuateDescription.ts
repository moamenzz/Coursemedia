const truncateDescription = (text: string, maxLength: number = 300) => {
  if (text?.length <= maxLength) return text;
  return text?.substring(0, maxLength) + "...";
};

export default truncateDescription;
