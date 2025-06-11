const formatLanguage = (language: string) => {
  switch (language) {
    case "chinese":
      return "中文";
    case "english":
      return "English";
    case "spanish":
      return "Español";
    case "french":
      return "Français";
    case "german":
      return "Deutsch";
    case "italian":
      return "Italiano";
    case "japanese":
      return "日本語";
    case "korean":
      return "한국어";
    case "russian":
      return "Русский";
    case "other":
      return "Other";
    default:
      return language;
  }
};

export default formatLanguage;
