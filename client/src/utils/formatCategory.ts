const formatCategory = (category: string) => {
  switch (category) {
    case "cybersecurity":
      return "Cybersecurity";
    case "dataScience":
      return "Data Science";
    case "design":
      return "Design";
    case "machineLearning":
      return "Machine Learning";
    case "other":
      return "Other";
    case "programmingLanguages":
      return "Programming Languages";
    case "webDevelopment":
      return "Web Development";
    default:
      return category;
  }
};

export default formatCategory;
