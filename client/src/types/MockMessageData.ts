export const conversations = [
  {
    id: "1",
    sender: {
      name: "PROPER DOT INSTITUTE",
      avatar: "/api/placeholder/40/40",
      institution: "Educational Institute",
    },
    lastMessage:
      "Dear Students, I welcome you all to this excellent course. Ho...",
    timestamp: "1 year ago",
    isUnread: true,
    isStarred: false,
    messages: [
      {
        id: "1",
        content:
          "Dear Students, I welcome you all to this excellent course. Hope learning would be memorable and you will learn to code great things in the CSS, Bootstrap, JavaScript, and PHP Full Stack Crash Course wish you happy learning and please do provide review and feedback for the course Thank you.",
        timestamp: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        isFromUser: false,
      },
    ],
  },
  {
    id: "2",
    sender: {
      name: "MTF Institute of Management, Technology and Finance",
      avatar: "/api/placeholder/40/40",
      institution: "MTF Institute",
    },
    lastMessage:
      "Hello! Thank you for joining of our course! We really appreciat...",
    timestamp: "1 year ago",
    isUnread: false,
    isStarred: true,
    messages: [
      {
        id: "1",
        content:
          "Hello! Thank you for joining of our course! We really appreciate your participation and hope you find the content valuable.",
        timestamp: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
        isFromUser: false,
      },
    ],
  },
];
