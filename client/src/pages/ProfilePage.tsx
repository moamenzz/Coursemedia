import React, { useState } from "react";
import {
  Edit3,
  Star,
  Heart,
  Linkedin,
  Youtube,
  Globe,
  Github,
  MessageCircle,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getProfile, ProfileResponse, ReviewResponse } from "@/lib/apiRoutes";
import Loader from "@/components/Loader";
import ErrorThrower from "@/components/ErrorThrower";
import UpdateProfileModal from "@/components/UpdateProfileModal";
import { formatCourseRating } from "@/utils/formatCourseRating";
import PlaceholderAvatar from "@/components/PlaceholderAvatar";
import { Link, useNavigate, useParams } from "react-router-dom";
import ConfirmationModal from "@/components/ConfirmationModal";

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useParams();

  const {
    data: profileData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["profile", user],
    queryFn: () => getProfile(user as string),
    enabled: !!user,
  });

  const profile = profileData?.hasProfile;
  const instructor = profileData?.instructor;
  const wishlist = profileData?.profileWishlist || [];

  // TODO: Make a "You are getting redirected" confirmation when user clicks on a link

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmatModalOpen, setIsConfirmationModalOpen] = useState(false);

  return isLoading ? (
    <div className="flex justify-center items-center min-h-full">
      <Loader />
    </div>
  ) : isError ? (
    <ErrorThrower isError={isError} error={error as Error} />
  ) : (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Avatar */}
            {profile?.avatar ? (
              <div className="relative">
                <img
                  src={profile?.avatar}
                  alt={profile?.username + " avatar"}
                  className="w-32 h-32 rounded-full object-cover"
                />
                {instructor && (
                  <div className="absolute -top-2 -right-2 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                    Coursemedia Instructor
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <PlaceholderAvatar
                  w={32}
                  h={32}
                  username={profile?.username as string}
                />

                {instructor && (
                  <div className="absolute -top-2 -right-2 bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium">
                    Coursemedia Instructor
                  </div>
                )}
              </div>
            )}

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {profile?.username}
                  </h1>
                  <p className="text-gray-600 text-lg mb-4">
                    {profile?.headline}
                  </p>
                </div>
                {user === profile?.user ? (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit3 size={16} />
                    Edit Profile
                  </button>
                ) : (
                  <button
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg transition-colors cursor-pointer"
                    onClick={() => navigate(`/messages/${profile?._id}`)}
                  >
                    <MessageCircle size={16} />
                    Send Message
                  </button>
                )}
              </div>

              {/* Stats */}
              {instructor && (
                <div className="flex gap-8 mb-6">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      {instructor.students.length}
                    </div>
                    <div className="text-gray-600 text-sm">Total learners</div>
                  </div>
                  <div>
                    {/* <div className="text-2xl font-bold text-gray-900">
                      {instructor.}
                    </div> */}
                    0<div className="text-gray-600 text-sm">Reviews</div>
                  </div>
                </div>
              )}

              {/* Social Links */}
              {profile?.socialLinks && (
                <div className="flex gap-3">
                  {profile.socialLinks.website && (
                    <a
                      onClick={() => setIsConfirmationModalOpen(true)}
                      className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      <Globe size={20} className="text-gray-600" />
                    </a>
                  )}
                  {profile.socialLinks.linkedin && (
                    <a
                      href={profile.socialLinks.linkedin}
                      className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors cursor-pointer"
                    >
                      <Linkedin size={20} className="text-blue-600" />
                    </a>
                  )}
                  {profile.socialLinks.github && (
                    <a
                      href={profile.socialLinks.github}
                      className="p-2 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors cursor-pointer"
                    >
                      <Github size={20} className="text-blue-600" />
                    </a>
                  )}
                  {profile.socialLinks.youtube && (
                    <a
                      href={profile.socialLinks.youtube}
                      className="p-2 bg-red-100 rounded-lg hover:bg-red-200 transition-colors cursor-pointer"
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
        {profile?.bio && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">About me</h2>
            <div className="prose max-w-none">
              {profile?.bio && (
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {profile?.bio}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Dynamic Content Based on User Role */}
        {instructor ? (
          // Instructor Courses
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              My courses ({instructor.courses.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {instructor.courses.map((course) => (
                <div
                  key={course._id}
                  className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  <img
                    src={course.cover}
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
                        {formatCourseRating(course.reviews as ReviewResponse[])}
                      </span>
                      <span className="text-sm text-gray-500">
                        ({course.enrollees?.length} students)
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
            {/* Wishlist */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Heart size={20} />
                {profileData?.hasProfile.username}'s Wishlist ({wishlist.length}
                )
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {wishlist.map((item) => (
                  <Link
                    key={item._id}
                    className="flex gap-4 border rounded-lg p-4 hover:opacity-80 hover:bg-gray-100 transition-colors"
                    to={`/courses/${item.course._id}`}
                  >
                    <img
                      src={item.course.cover}
                      alt={item.course.title}
                      className="w-20 h-14 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1 line-clamp-2">
                        {item.course.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        By {item.course.instructor?.user.username}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star
                            size={12}
                            className="fill-yellow-400 text-yellow-400"
                          />
                          <span className="text-sm">
                            {formatCourseRating(
                              item.course.reviews as ReviewResponse[]
                            )}
                          </span>
                        </div>
                        <span className="font-bold">${item.course.price}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <UpdateProfileModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        profile={profile as ProfileResponse}
      />

      <ConfirmationModal
        isOpen={isConfirmatModalOpen}
        setIsOpen={setIsConfirmationModalOpen}
        type="Navigation"
        navigationUrl={profile?.socialLinks.website}
      />
    </div>
  );
};

export default ProfilePage;
