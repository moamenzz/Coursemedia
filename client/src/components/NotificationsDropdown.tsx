import React, { useState } from "react";
import { Bell, Settings, MoreHorizontal } from "lucide-react";

interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: "course" | "system" | "achievement" | "reminder";
  avatar?: string;
}

const NotificationsDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "MTF Institute of Management, Technology and Finance and 1...",
      message: "New course available in your learning path",
      timestamp: "5 days ago",
      isRead: false,
      type: "course",
      avatar: "/api/placeholder/40/40",
    },
    {
      id: "2",
      title: "Assignment Due Soon",
      message: "Your React Advanced Patterns assignment is due in 2 days",
      timestamp: "1 day ago",
      isRead: false,
      type: "reminder",
    },
    {
      id: "3",
      title: "Course Completed!",
      message: 'Congratulations! You have completed "JavaScript Fundamentals"',
      timestamp: "3 days ago",
      isRead: true,
      type: "achievement",
    },
    {
      id: "4",
      title: "System Maintenance",
      message: "Scheduled maintenance will occur this weekend",
      timestamp: "1 week ago",
      isRead: true,
      type: "system",
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, isRead: true }))
    );
  };

  const getNotificationIcon = (type: string) => {
    const iconClass =
      "w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium";

    switch (type) {
      case "course":
        return <div className={`${iconClass} bg-blue-500`}>📚</div>;
      case "achievement":
        return <div className={`${iconClass} bg-green-500`}>🏆</div>;
      case "reminder":
        return <div className={`${iconClass} bg-orange-500`}>⏰</div>;
      case "system":
        return <div className={`${iconClass} bg-gray-500`}>⚙️</div>;
      default:
        return <div className={`${iconClass} bg-blue-500`}>📋</div>;
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Notification Bell Button */}
      <button
        className="relative p-1 cursor-pointer hover:bg-gray-100 rounded-full transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="w-6 h-6 text-gray-600 hover:text-yellow-500 transition-colors duration-200" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Invisible buffer */}
      {isOpen && (
        <div
          className="absolute right-0 top-full w-96"
          style={{ height: "12px" }}
          onMouseEnter={() => setIsOpen(true)}
        />
      )}

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">
              Notifications
            </h3>
            <button className="p-1 hover:bg-gray-100 rounded">
              <Settings className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Notifications List */}
          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                    !notification.isRead ? "bg-blue-50" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex items-start space-x-3">
                    {/* Icon/Avatar */}
                    <div className="flex-shrink-0">
                      {notification.avatar ? (
                        <img
                          src={notification.avatar}
                          alt=""
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        getNotificationIcon(notification.type)
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p
                            className={`text-sm font-medium text-gray-900 line-clamp-2 ${
                              !notification.isRead ? "font-semibold" : ""
                            }`}
                          >
                            {notification.title}
                          </p>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-gray-400 mt-2">
                            {notification.timestamp}
                          </p>
                        </div>

                        {/* Unread indicator */}
                        <div className="flex items-center space-x-2 ml-2">
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                          <button className="p-1 hover:bg-gray-200 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreHorizontal className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="p-3 border-t border-gray-100 bg-gray-50 rounded-b-lg">
            <div className="flex items-center justify-between">
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150"
                disabled={unreadCount === 0}
              >
                Mark all as read
              </button>
              <button
                onClick={() => {
                  // Navigate to notifications page
                  console.log("Navigate to notifications page");
                  setIsOpen(false);
                }}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-150"
              >
                See all
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsDropdown;
