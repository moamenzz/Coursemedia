import React, { useState } from "react";
import { Bell, Settings, MoreHorizontal } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getNotifications, markAllAsRead, markAsRead } from "@/lib/apiRoutes";
import { toast } from "react-toastify";
import queryClient from "@/config/queryClient";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import ErrorThrower from "./ErrorThrower";
import formatLatestMessageDate from "@/utils/formatLatestMessageData";
import { getNotificationIcon } from "@/utils/getNotificationIcon";

const NotificationsDropdown: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const {
    data: notifications = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: getNotifications,
  });

  const { mutate: markAsReadMutation } = useMutation({
    mutationFn: markAsRead,
    onError: () => {
      toast.error("Failed to mark notification as read");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const { mutate: markAllAsReadMutation } = useMutation({
    mutationFn: markAllAsRead,
    onError: () => {
      toast.error("Failed to mark notifications as read");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const unreadCount = notifications.filter((n) => !n.isRead).length;
  return isLoading ? (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <Loader />
    </div>
  ) : isError ? (
    <ErrorThrower isError={isError} error={error} />
  ) : (
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
                  key={notification._id}
                  className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors duration-150 ${
                    !notification.isRead ? "bg-blue-50" : ""
                  }`}
                  onClick={() => markAsReadMutation(notification._id)}
                >
                  <div className="flex items-start space-x-3">
                    {/* Icon/Avatar */}
                    <div className="flex-shrink-0">
                      {getNotificationIcon(notification.notificationType)}
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
                            {formatLatestMessageDate(notification.createdAt)}
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
                onClick={() => markAllAsReadMutation()}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors duration-150"
                disabled={unreadCount === 0}
              >
                Mark all as read
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  navigate("/notifications");
                }}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium cursor-pointer transition-colors duration-150"
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
