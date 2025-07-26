import { Award, BookOpen, MessageCircle, Users } from "lucide-react";

const mockNotifications = [
  {
    id: 1,
    title: "MTF Institute of Management, Technology and Finance and 1...",
    message: "New course available: Advanced React Patterns",
    type: "course",
    isRead: false,
    timestamp: "5 days ago",
    icon: BookOpen,
  },
  {
    id: 2,
    title: "Assignment Due Reminder",
    message: "Your JavaScript fundamentals assignment is due tomorrow",
    type: "assignment",
    isRead: false,
    timestamp: "1 day ago",
    icon: Award,
  },
  {
    id: 3,
    title: "New Message from Instructor",
    message: "Sarah Johnson replied to your question about React hooks",
    type: "message",
    isRead: true,
    timestamp: "3 days ago",
    icon: MessageCircle,
  },
  {
    id: 4,
    title: "Course Enrollment Confirmed",
    message: "You've been enrolled in 'Full Stack Development Bootcamp'",
    type: "enrollment",
    isRead: true,
    timestamp: "1 week ago",
    icon: Users,
  },
  {
    id: 5,
    title: "Certificate Available",
    message: "Your completion certificate for 'React Fundamentals' is ready",
    type: "certificate",
    isRead: false,
    timestamp: "2 days ago",
    icon: Award,
  },
];

export default mockNotifications;
