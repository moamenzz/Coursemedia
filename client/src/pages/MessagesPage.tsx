import React, { useState } from "react";
import {
  Search,
  Star,
  MoreHorizontal,
  Bold,
  Italic,
  Image,
  Code,
} from "lucide-react";
import { conversations } from "@/types/MockMessageData";

const MessagesPage: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string>("1");
  const [filterType, setFilterType] = useState<"all" | "unread" | "starred">(
    "unread"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const filteredConversations = conversations.filter((conv) => {
    const matchesSearch =
      conv.sender.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());

    switch (filterType) {
      case "unread":
        return conv.isUnread && matchesSearch;
      case "starred":
        return conv.isStarred && matchesSearch;
      case "all":
      default:
        return matchesSearch;
    }
  });

  const selectedConv = conversations.find(
    (conv) => conv.id === selectedConversation
  );
  const unreadCount = conversations.filter((conv) => conv.isUnread).length;

  // const toggleStar = (convId: string) => {};

  // const markAsRead = (convId: string) => {};

  const sendMessage = () => {};

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-96 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Messages</h1>
          <p className="text-sm text-gray-600 mb-4">
            You have {unreadCount} unread message{unreadCount !== 1 ? "s" : ""}.
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
          {filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <p>No messages found</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedConversation === conversation.id
                    ? "bg-blue-50 border-l-4 border-l-blue-500"
                    : ""
                } ${conversation.isUnread ? "bg-blue-25" : ""}`}
                onClick={() => {
                  setSelectedConversation(conversation.id);
                  // markAsRead(conversation.id);
                }}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <img
                      src={conversation.sender.avatar}
                      alt={conversation.sender.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    {conversation.isUnread && (
                      <div className="w-3 h-3 bg-purple-600 rounded-full -mt-2 ml-8 border-2 border-white"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p
                          className={`text-sm font-medium text-gray-900 truncate ${
                            conversation.isUnread ? "font-semibold" : ""
                          }`}
                        >
                          {conversation.sender.name}
                        </p>
                        <p className="text-xs text-gray-500 mb-1">
                          {conversation.timestamp}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {conversation.lastMessage}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-1 ml-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            // toggleStar(conversation.id);
                          }}
                          className={`p-1 hover:bg-gray-200 rounded ${
                            conversation.isStarred
                              ? "text-yellow-500"
                              : "text-gray-400"
                          }`}
                        >
                          <Star
                            className="w-4 h-4"
                            fill={
                              conversation.isStarred ? "currentColor" : "none"
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
      <div className="flex-1 flex flex-col">
        {selectedConv ? (
          <>
            {/* Message Header */}
            <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedConv.sender.avatar}
                  alt={selectedConv.sender.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h2 className="font-semibold text-gray-900">
                    {selectedConv.sender.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {selectedConv.sender.institution}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  // onClick={() => toggleStar(selectedConv.id)}
                  className={`p-2 hover:bg-gray-100 rounded ${
                    selectedConv.isStarred ? "text-yellow-500" : "text-gray-400"
                  }`}
                >
                  <Star
                    className="w-5 h-5"
                    fill={selectedConv.isStarred ? "currentColor" : "none"}
                  />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded text-gray-400">
                  <MoreHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConv.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.isFromUser ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-lg px-4 py-3 rounded-lg ${
                      message.isFromUser
                        ? "bg-purple-600 text-white"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-2 ${
                        message.isFromUser ? "text-purple-200" : "text-gray-500"
                      }`}
                    >
                      {message.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              {/* Formatting Toolbar */}
              <div className="flex items-center space-x-2 mb-3 pb-3 border-b border-gray-200">
                <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                  <Bold className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                  <Italic className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                  <Image className="w-4 h-4" />
                </button>
                <button className="p-1 hover:bg-gray-100 rounded text-gray-600">
                  <Code className="w-4 h-4" />
                </button>
              </div>

              {/* Message Input */}
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <textarea
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Review course Q&A before sending a new message to the instructor"
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                  />
                </div>
                <button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Send
                </button>
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
    </div>
  );
};

export default MessagesPage;
