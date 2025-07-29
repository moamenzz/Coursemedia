import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  Star,
  MoreHorizontal,
  Bold,
  Italic,
  Image,
  Code,
} from "lucide-react";
import useMessageStore from "@/stores/useMessageStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteMessage,
  editMessage,
  getConversations,
  getMessages,
  sendMessage,
  starConversation,
} from "@/lib/apiRoutes";
import useAuth from "@/hooks/useAuth";
import formatLatestMessageDate from "@/utils/formatLatestMessageData";
import Loader from "@/components/Loader";
import ErrorThrower from "@/components/ErrorThrower";
import { toast } from "react-toastify";
import queryClient from "@/config/queryClient";

const MessagesPage: React.FC = () => {
  const {
    selectedConversation,
    setSelectedConversation,
    selectedMessage,
    setSelectedMessage,
  } = useMessageStore();
  const [filterType, setFilterType] = useState<"all" | "unread" | "starred">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [isEditingMessage, setIsEditingMessage] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { user } = useAuth();

  const {
    data: conversations,
    isLoading: isLoadingConversations,
    isError: isErrorConversations,
    error: errorConversations,
  } = useQuery({
    queryKey: ["conversations"],
    queryFn: getConversations,
  });

  const {
    data: messages,
    isLoading: isLoadingMessages,
    isError: isErrorMessages,
    error: errorMessages,
  } = useQuery({
    queryKey: ["messages", selectedConversation],
    queryFn: () => getMessages(selectedConversation),
    enabled: !!selectedConversation,
  });

  const filteredConversations = conversations?.filter((conv) => {
    const sender = conv.participants.find((p) => p.username !== user?.username);

    const unread = conv.unreadBy.find((p) => p._id === user?._id);
    const isStarred = conv.starredBy.find((p) => p._id === user?._id);

    const matchesSearch =
      sender?.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.latestMessage.message
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    switch (filterType) {
      case "unread":
        return unread && matchesSearch;
      case "starred":
        return isStarred && matchesSearch;
      case "all":
      default:
        return matchesSearch;
    }
  });

  const selectedConv = conversations?.find(
    (conv) => conv._id === selectedConversation
  );
  const unreadConvos = conversations?.filter((conv) =>
    conv.unreadBy.find((p) => p._id === user?._id)
  );

  const { mutate: starConversationMutation, isPending: isStarPending } =
    useMutation({
      mutationFn: starConversation,
      onError: () => {
        toast.error("Failed to star conversation");
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["conversations"] });
      },
    });

  const { mutate: sendMessageMutation, isPending: isMessagePending } =
    useMutation({
      mutationFn: sendMessage,
      onError: () => {
        toast.error("Failed to send message");
      },
      onSuccess: () => {
        setNewMessage("");
      },
    });

  const { mutate: editMessageMutation, isPending: isEditPending } = useMutation(
    {
      mutationFn: editMessage,
      onError: () => {
        toast.error("Failed to edit message");
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["messages", selectedConversation],
        });
      },
    }
  );

  const { mutate: unsendMessageMutation } = useMutation({
    mutationFn: deleteMessage,
    onError: () => {
      toast.error("Failed to unsend message");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["messages", selectedConversation],
      });
    },
  });

  // const markAsRead = (convId: string) => {};

  const isPending = isMessagePending || isStarPending;
  const isError = isErrorConversations || isErrorMessages;
  const error = errorConversations || errorMessages;

  return isLoadingConversations ? (
    <div className="flex justify-center items-center min-h-screen">
      <Loader />
    </div>
  ) : isError ? (
    <div className="flex justify-center items-center">
      <ErrorThrower isError={isError} error={error as { message: string }} />
    </div>
  ) : (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-sm text-gray-600 mb-4">
            You have {unreadConvos?.length} unread conversation
            {unreadConvos?.length !== 1 ? "s" : ""}.
          </p>

          {/* Controls */}
          <div className="flex mb-4">
            <select
              value={filterType}
              onChange={(e) =>
                setFilterType(e.target.value as "unread" | "all" | "starred")
              }
              className="w-full p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Messages</option>
              <option value="unread">Unread</option>
              <option value="starred">Starred</option>
            </select>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations?.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>No conversations found</p>
            </div>
          ) : (
            filteredConversations?.map((conversation) => (
              <div
                key={conversation._id}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation._id
                    ? "bg-blue-50 border-l-4 border-l-blue-500"
                    : ""
                } ${
                  conversation.unreadBy.find((p) => p._id === user?._id)
                    ? "bg-blue-25"
                    : ""
                }`}
                onClick={() => {
                  setSelectedConversation(conversation._id);
                  // markAsRead(conversation.id);
                }}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <img
                      src={
                        conversation.participants.find(
                          (p) => p._id !== user?._id
                        )?.avatar
                      }
                      alt={
                        conversation.participants.find(
                          (p) => p._id !== user?._id
                        )?.username
                      }
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {conversation.unreadBy.find((p) => p._id === user?._id) && (
                      <div className="w-3 h-3 bg-purple-600 rounded-full -mt-2 ml-8 border-2 border-white"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium text-gray-900 truncate ${
                            conversation.unreadBy.find(
                              (p) => p._id === user?._id
                            )
                              ? "font-semibold"
                              : ""
                          }`}
                        >
                          {
                            conversation.participants.find(
                              (p) => p._id !== user?._id
                            )?.username
                          }
                        </p>
                        <p className="text-xs text-gray-500 mb-1">
                          {formatLatestMessageDate(
                            conversation.latestMessage.createdAt
                          )}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {conversation.latestMessage.message}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-1 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            starConversationMutation(conversation._id);
                          }}
                          className={`p-1 hover:bg-gray-200 rounded ${
                            conversation.starredBy.find(
                              (p) => p._id === user?._id
                            )
                              ? "text-yellow-500"
                              : "text-gray-400"
                          }`}
                        >
                          <Star
                            className="w-4 h-4"
                            fill={
                              conversation.starredBy.find(
                                (p) => p._id === user?._id
                              )
                                ? "currentColor"
                                : "none"
                            }
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Main Content */}
      {isLoadingMessages ? (
        <div className="flex flex-1 flex-col justify-center items-center min-h-full">
          <Loader />
        </div>
      ) : (
        <div className="flex-1 flex flex-col">
          {selectedConv ? (
            <>
              {/* Message Header */}
              <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={
                      selectedConv.participants.find((p) => p._id !== user?._id)
                        ?.avatar
                    }
                    alt={
                      selectedConv.participants.find((p) => p._id !== user?._id)
                        ?.username
                    }
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h2 className="font-semibold text-gray-900">
                      {
                        selectedConv.participants.find(
                          (p) => p._id !== user?._id
                        )?.username
                      }
                    </h2>
                    {/* <p className="text-sm text-gray-500">
                    {selectedConv.participants.find((p) => p._id !== user?._id)?.institution}
                  </p> */}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => starConversationMutation(selectedConv._id)}
                    className={`p-2 hover:bg-gray-100 rounded ${
                      selectedConv.starredBy.find((p) => p._id === user?._id)
                        ? "text-yellow-500"
                        : "text-gray-400"
                    }`}
                  >
                    <Star
                      className="w-5 h-5"
                      fill={
                        selectedConv.starredBy.find((p) => p._id === user?._id)
                          ? "currentColor"
                          : "none"
                      }
                    />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded text-gray-400">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages?.map((message) => (
                  <div
                    key={message._id}
                    className={`flex ${
                      message.sender._id === user?._id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-lg px-4 py-3 rounded-lg ${
                        message.sender._id === user?._id
                          ? "bg-purple-600 text-white"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      <p className="text-sm">
                        {message.unsent ? (
                          <span className="animate-pulse">
                            This message was unsent by sender.
                          </span>
                        ) : (
                          message.message
                        )}
                      </p>
                      <div className="flex items-center justify-between">
                        {/* Message */}
                        <div>
                          <p
                            className={`text-xs mt-2 ${
                              message.sender._id === user?._id
                                ? "text-purple-200"
                                : "text-gray-500"
                            }`}
                          >
                            {formatLatestMessageDate(message.createdAt)}
                            {message.edited && " | Edited"}
                          </p>
                        </div>

                        {/* More Actions */}
                        <div
                          className={`dropdown flex items-center cursor-pointer ${
                            message.sender._id === user?._id
                              ? "dropdown-left"
                              : "dropdown-bottom"
                          }`}
                        >
                          <button
                            className="px-2 hover:bg-gray-100 rounded text-gray-400 cursor-pointer"
                            tabIndex={0}
                            role="button"
                          >
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                          <ul
                            tabIndex={0}
                            className="dropdown-content menu bg-gray-700 text-white rounded-box z-1 w-52 p-2 shadow-sm"
                          >
                            {message.sender._id === user?._id && (
                              <div>
                                <li
                                  onClick={() => {
                                    setIsEditingMessage(true);
                                    setSelectedMessage(message._id);
                                    setNewMessage(message.message);
                                    setTimeout(() => {
                                      inputRef.current?.scrollIntoView({
                                        behavior: "smooth",
                                        block: "center",
                                      });
                                      inputRef.current?.focus();
                                    }, 100); // give state a moment to update
                                  }}
                                >
                                  <a>Edit Message</a>
                                </li>
                                <li
                                  className="text-red-500"
                                  onClick={() =>
                                    unsendMessageMutation(message._id)
                                  }
                                >
                                  <a>Unsend Message</a>
                                </li>
                              </div>
                            )}
                            {message.sender._id !== user?._id && (
                              <li className="text-red-500">
                                <a>Report Message</a>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 bg-white border-t border-gray-200">
                {/* Formatting Toolbar */}
                <div className="flex items-center space-x-2 mb-3 pb-3 border-b border-gray-200">
                  <button className="p-1 hover:bg-gray-100 rounded text-gray-600 cursor-pointer">
                    <Image className="w-4 h-4" />
                  </button>
                </div>

                {/* Message Input */}
                <div className="flex items-center space-x-3">
                  <div className="flex-1">
                    {/* Message Input */}
                    <textarea
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Consider reviewing course Q&A before sending a new message to an instructor"
                      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={3}
                      ref={inputRef}
                    />
                  </div>

                  {isEditingMessage ? (
                    <div className="flex flex-col items-center space-y-3">
                      <button
                        onClick={() => {
                          editMessageMutation({
                            messageId: selectedMessage,
                            data: { message: newMessage },
                          });
                          setIsEditingMessage(false);
                          setNewMessage("");
                        }}
                        className="px-6 py-3 cursor-pointer bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                      >
                        {isEditPending ? <Loader /> : "Edit"}
                      </button>

                      <button
                        onClick={() => {
                          setIsEditingMessage(false);
                          setNewMessage("");
                        }}
                        className="px-4 py-3 cursor-pointer border-gray-400 text-black rounded-lg hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() =>
                        sendMessageMutation({
                          receiverId: selectedConv.participants.find(
                            (p) => p._id !== user?._id
                          )?._id as string,
                          data: { message: newMessage },
                        })
                      }
                      disabled={!newMessage.trim() || isPending}
                      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                    >
                      {isMessagePending ? <Loader /> : "Send"}
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-lg font-medium">Select a conversation</p>
                <p className="text-sm">
                  Choose a chat head from the sidebar to start a conversation!
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
