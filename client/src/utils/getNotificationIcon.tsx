import { DollarSign, MessageCircle, Star, Users } from "lucide-react";

export const getNotificationIcon = (notificationType: string) => {
  const iconClass =
    "w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium";

  switch (notificationType) {
    case "ENROLLED_IN_COURSE":
      return (
        <div className={`${iconClass} bg-purple-100 text-purple-600`}>
          <Users color="#8b5cf6" />
        </div>
      );
    case "NEW_MESSAGE":
      return (
        <div className={`${iconClass} bg-green-100`}>
          <MessageCircle color="#16a34a" />
        </div>
      );
    case "NEW_PURCHASE":
      return (
        <div className={`${iconClass} bg-yellow-100 text-yellow-600`}>
          <DollarSign />
        </div>
      );
    default:
      return (
        <div className={`${iconClass} bg-blue-100`}>
          <Star color="#3b82f6" />
        </div>
      ); // NEW_REVIEW
  }
};
