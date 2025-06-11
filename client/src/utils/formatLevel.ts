export const formatLevel = (level: string) => {
  switch (level) {
    case "beginner":
      return "Beginner";
    case "intermediate":
      return "Intermediate";
    case "advanced":
      return "Advanced";
    case "all_levels":
      return "All Levels";
    default:
      return level;
  }
};
