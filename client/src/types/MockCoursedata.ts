import { InstructorResponse, LectureResponse } from "@/lib/apiRoutes";

interface Course {
  _id?: string;
  title: string;
  subtitle: string;
  description: string;
  cover: string;
  curriculum?: LectureResponse[];
  instructor: InstructorResponse;
  enrollees?: string[];
  category: string;
  level: string;
  rating: number;
  courseLanguage: string;
  courseObjectives: string[];
  courseRequirements: string[];
  courseWelcomeMessage: string;
  isFeatured: boolean;
  isBestSeller: boolean;
  price: number;
  previousPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// Mock courses data
export const courses: Course[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals Course for Beginners",
    instructor: "Sara Academy",
    thumbnailUrl: "/path/to/js-course-image.jpg",
    category: "Web Development",
    progress: 45,
  },
  {
    id: "2",
    title: "C++ for Beginners",
    instructor: "Huzaifa Shah",
    thumbnailUrl: "/path/to/cpp-course-image.jpg",
    category: "Programming",
    progress: 10,
  },
  {
    id: "3",
    title: "Information Security Professional Certification",
    instructor: "MTF Institute of Management, Technology and Finance",
    thumbnailUrl: "/path/to/security-course-image.jpg",
    category: "IT Security",
    progress: 60,
  },
  {
    id: "4",
    title: "CSS, Bootstrap JavaScript, PHP Full Stack Crash Course",
    instructor: "PROPER DOT INSTITUTE",
    thumbnailUrl: "/path/to/fullstack-course-image.jpg",
    category: "Web Development",
    progress: 15,
  },
  {
    id: "5",
    title: "UI/UX Design Masterclass with Adobe XD: From Beginner to Pro",
    instructor: "James Joab Soren, Hudson Dynamic Lab",
    thumbnailUrl: "/path/to/uiux-course-image.jpg",
    category: "Design",
    progress: 30,
  },
  {
    id: "6",
    title: "Java And C++ Complete Course for Java And C++ Beginners",
    instructor: "Crunch Coding",
    thumbnailUrl: "/path/to/java-cpp-course-image.jpg",
    category: "Programming",
    progress: 5,
  },
  {
    id: "7",
    title: "4 Practice Tests for any Python Certification",
    instructor: "Nishant Tiwari",
    thumbnailUrl: "/path/to/python-test-image.jpg",
    category: "Programming",
    progress: 75,
  },
];
