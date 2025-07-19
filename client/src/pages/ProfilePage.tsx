import React, { useState } from "react";
import {
  User,
  Edit3,
  BookOpen,
  Star,
  Heart,
  Linkedin,
  Twitter,
  Youtube,
  Globe,
} from "lucide-react";

// Types
interface User {
  id: string;
  name: string;
  title: string;
  bio: string;
  avatar: string;
  role: "instructor" | "learner";
  totalLearners?: number;
  totalReviews?: number;
  rating?: number;
  socialLinks?: {
    website?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
}

interface Course {
  id: string;
  title: string;
  thumbnail: string;
  students: number;
  rating: number;
  price: number;
  level: string;
}

interface WishlistItem {
  id: string;
  title: string;
  instructor: string;
  thumbnail: string;
  price: number;
  rating: number;
}

const ProfilePage: React.FC = () => {
  // Mock data - replace with your API calls
  const [user, setUser] = useState<User>({
    id: "1",
    name: "Dr. Angela Yu",
    title: "Developer and Lead Instructor",
    bio: "I'm Angela, I'm a developer with a passion for teaching. I'm the lead instructor at the London App Brewery, London's leading Programming Bootcamp. I've helped hundreds of thousands of students learn to code and change their lives by becoming a developer. I've been invited by companies such as Twitter, Facebook and Google to teach their employees.\n\nMy first foray into programming was when I was just 12 years old, wanting to build my own Space Invader game. Since then, I've made hundreds of websites, apps and games. But most importantly, I realised that my greatest passion is teaching.\n\nI spend most of my time researching how to make learning to code fun and make hard concepts easy to understand. I apply everything I discover into my bootcamp courses. In my courses, you'll find lots of geeky humour but also lots of explanations and animations to make sure everything is easy to understand.\n\nI'll be there for you every step of the way.",
    avatar:
      "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    role: "instructor",
    totalLearners: 3222121,
    totalReviews: 984474,
    rating: 4.7,
    socialLinks: {
      website: "https://angelayu.com",
      linkedin: "https://linkedin.com/in/angela-yu",
      twitter: "https://twitter.com/yu_angela",
      youtube: "https://youtube.com/angelayu",
    },
  });

  const [courses] = useState<Course[]>([
    {
      id: "1",
      title: "The Complete 2024 Web Development Bootcamp",
      thumbnail:
        "https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=300&h=200&fit=crop",
      students: 825000,
      rating: 4.7,
      price: 84.99,
      level: "All Levels",
    },
    {
      id: "2",
      title: "iOS & Swift - The Complete iOS App Development Bootcamp",
      thumbnail:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop",
      students: 275000,
      rating: 4.6,
      price: 89.99,
      level: "Beginner",
    },
    {
      id: "3",
      title: "100 Days of Code: The Complete Python Pro Bootcamp",
      thumbnail:
        "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=300&h=200&fit=crop",
      students: 650000,
      rating: 4.8,
      price: 74.99,
      level: "All Levels",
    },
  ]);

  const [wishlist] = useState<WishlistItem[]>([
    {
      id: "1",
      title: "Advanced React Patterns",
      instructor: "John Doe",
      thumbnail:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=200&fit=crop",
      price: 79.99,
      rating: 4.5,
    },
    {
      id: "2",
      title: "Machine Learning with Python",
      instructor: "Jane Smith",
      thumbnail:
        "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=200&fit=crop",
      price: 94.99,
      rating: 4.7,
    },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    name: user.name,
    title: user.title,
    bio: user.bio,
    website: user.socialLinks?.website || "",
    linkedin: user.socialLinks?.linkedin || "",
    twitter: user.socialLinks?.twitter || "",
    youtube: user.socialLinks?.youtube || "",
  });

  const handleEditSubmit = () => {
    setUser({
      ...user,
      name: editFormData.name,
      title: editFormData.title,
      bio: editFormData.bio,
      socialLinks: {
        website: editFormData.website,
        linkedin: editFormData.linkedin,
        twitter: editFormData.twitter,
        youtube: editFormData.youtube,
      },
    });
    setIsEditModalOpen(false);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(0) + "K";
    }
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full object-cover"
              />
              {user.role === "instructor" && (
                <div className="absolute -top-2 -right-2 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                  Udemy Instructor Partner
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {user.name}
                  </h1>
                  <p className="text-gray-600 text-lg mb-4">{user.title}</p>
                </div>
                <button
                  onClick={() => setIsEditModalOpen(true)}
                  className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors"
                >
                  <Edit3 size={16} />
                  Edit Profile
                </button>
              </div>

              {/* Stats */}
              {user.role === "instructor" && (
                <div className="flex gap-8 mb-6">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatNumber(user.totalLearners!)}
                    </div>
                    <div className="text-gray-600 text-sm">Total learners</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {formatNumber(user.totalReviews!)}
                    </div>
                    <div className="text-gray-600 text-sm">Reviews</div>
                  </div>
                </div>
              )}

              {/* Social Links */}
              {user.socialLinks && (
                <div className="flex gap-3">
                  {user.socialLinks.website && (
                    <a
                      href={user.socialLinks.website}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      <Globe size={20} className="text-gray-600" />
                    </a>
                  )}
                  {user.socialLinks.linkedin && (
                    <a
                      href={user.socialLinks.linkedin}
                      className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Linkedin size={20} className="text-blue-600" />
                    </a>
                  )}
                  {user.socialLinks.twitter && (
                    <a
                      href={user.socialLinks.twitter}
                      className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
                    >
                      <Twitter size={20} className="text-blue-600" />
                    </a>
                  )}
                  {user.socialLinks.youtube && (
                    <a
                      href={user.socialLinks.youtube}
                      className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
                    >
                      <Youtube size={20} className="text-red-600" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* About Me Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">About me</h2>
          <div className="prose max-w-none">
            {user.bio.split("\n\n").map((paragraph, index) => (
              <p key={index} className="text-gray-700 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Dynamic Content Based on User Role */}
        {user.role === "instructor" ? (
          // Instructor Courses
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              My courses ({courses.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star
                        size={14}
                        className="fill-yellow-400 text-yellow-400"
                      />
                      <span className="text-sm font-medium">
                        {course.rating}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({formatNumber(course.students)} students)
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-lg">${course.price}</span>
                      <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {course.level}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Learner Content
          <div className="space-y-8">
            {/* My Learning */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen size={20} />
                My Learning
              </h2>
              <p className="text-gray-600">
                Continue where you left off or explore new courses.
              </p>
            </div>

            {/* Wishlist */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Heart size={20} />
                My Wishlist ({wishlist.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border rounded-lg p-4"
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-20 h-14 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        By {item.instructor}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star
                            size={12}
                            className="fill-yellow-400 text-yellow-400"
                          />
                          <span className="text-sm">{item.rating}</span>
                        </div>
                        <span className="font-bold">${item.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={editFormData.name}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={editFormData.title}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        title: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biography
                  </label>
                  <textarea
                    value={editFormData.bio}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, bio: e.target.value })
                    }
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      value={editFormData.website}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          website: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="url"
                      value={editFormData.linkedin}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          linkedin: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://linkedin.com/in/"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter
                    </label>
                    <input
                      type="url"
                      value={editFormData.twitter}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          twitter: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://twitter.com/"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      YouTube
                    </label>
                    <input
                      type="url"
                      value={editFormData.youtube}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          youtube: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://youtube.com/"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleEditSubmit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
