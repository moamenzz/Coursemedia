const mockReviews = [
  {
    id: 1,
    userName: "Anna Schmidt",
    userAvatar: "AS",
    rating: 5,
    reviewText:
      "Fantastischer Kurs! Die Erklärungen sind sehr verständlich und die praktischen Übungen helfen wirklich beim Lernen. Kann ich jedem empfehlen!",
    date: "2024-06-15",
    helpful: 24,
    isTopReview: true,
  },
  {
    id: 2,
    userName: "Michael Weber",
    userAvatar: "MW",
    rating: 5,
    reviewText:
      "Einer der besten JavaScript-Kurse, die ich je gemacht habe. Der Instructor erklärt komplexe Konzepte sehr einfach.",
    date: "2024-06-10",
    helpful: 18,
    isTopReview: true,
  },
  {
    id: 3,
    userName: "Sarah Müller",
    userAvatar: "SM",
    rating: 4,
    reviewText:
      "Sehr guter Kurs mit vielen praktischen Beispielen. Manchmal hätte ich mir etwas mehr Tiefe gewünscht.",
    date: "2024-06-08",
    helpful: 12,
    isTopReview: true,
  },
  {
    id: 4,
    userName: "Tom Fischer",
    userAvatar: "TF",
    rating: 5,
    reviewText:
      "Perfekt für Anfänger! Schritt für Schritt aufgebaut und sehr gut erklärt.",
    date: "2024-06-05",
    helpful: 8,
    isTopReview: false,
  },
  {
    id: 5,
    userName: "Lisa Braun",
    userAvatar: "LB",
    rating: 4,
    reviewText:
      "Guter Kurs, aber manchmal etwas schnell. Die Übungen sind sehr hilfreich.",
    date: "2024-06-03",
    helpful: 6,
    isTopReview: false,
  },
  {
    id: 6,
    userName: "David Klein",
    userAvatar: "DK",
    rating: 3,
    reviewText:
      "Solider Kurs, aber nichts Außergewöhnliches. Erfüllt die Erwartungen.",
    date: "2024-06-01",
    helpful: 3,
    isTopReview: false,
  },
  {
    id: 7,
    userName: "Julia Wolf",
    userAvatar: "JW",
    rating: 5,
    reviewText:
      "Ausgezeichneter Kurs! Hat mir geholfen, JavaScript wirklich zu verstehen. Die Projekte sind sehr praxisnah.",
    date: "2024-05-28",
    helpful: 15,
    isTopReview: false,
  },
  {
    id: 8,
    userName: "Marcus Lang",
    userAvatar: "ML",
    rating: 4,
    reviewText:
      "Sehr strukturiert aufgebaut. Manchmal hätte ich mir mehr interaktive Elemente gewünscht.",
    date: "2024-05-25",
    helpful: 4,
    isTopReview: false,
  },
];

export const featuredReviewData = {
  id: 1,
  userName: "William P.",
  userAvatar:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
  coursesCount: 227,
  reviewsCount: 32,
  rating: 5,
  reviewText:
    "This is really helping me a lot. Just to recap, I have taken the exam twice and failed (a reason why I am here), and this is really helping me to achieve my goal when I take and pass it the third time. I have to retake the test again. Got a 66. But, so far this is my best score overall.",
  timeAgo: "6 years ago",
  helpful: 15,
  notHelpful: 2,
  isHelpfulClicked: false,
  isNotHelpfulClicked: false,
};

export default mockReviews;
