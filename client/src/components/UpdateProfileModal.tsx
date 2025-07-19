import { ProfileResponse, updateProfile } from "@/lib/apiRoutes";
import { FC, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loader from "./Loader";

interface UpdateProfileProps {
  isOpen: boolean;
  setIsOpen: (setIsOpen: boolean) => void;
  profile: ProfileResponse;
}

const UpdateProfileModal: FC<UpdateProfileProps> = ({
  isOpen,
  setIsOpen,
  profile,
}) => {
  const [editFormData, setEditFormData] = useState<ProfileResponse>({
    username: profile?.username || "",
    avatar: profile?.avatar || "",
    headline: profile?.headline || "",
    bio: profile?.bio || "",
    socialLinks: {
      website: profile?.socialLinks?.website || "",
      linkedin: profile?.socialLinks?.linkedin || "",
      github: profile?.socialLinks?.github || "",
      youtube: profile?.socialLinks?.youtube || "",
    },
  });

  const { mutate: updateProfileMutation, isPending } = useMutation({
    mutationFn: updateProfile,
    onError: () => {
      toast.error("Failed to update profile, please try again.");
    },
    onSuccess: () => {
      setIsOpen(false);
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl w-full max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 border-b">
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={editFormData.username}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Headline
              </label>
              <input
                type="text"
                name="headline"
                value={editFormData.headline}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Biography
              </label>
              <textarea
                name="bio"
                value={editFormData.bio}
                onChange={handleInputChange}
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
                  name="website"
                  value={editFormData.socialLinks.website}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      socialLinks: {
                        ...editFormData.socialLinks,
                        website: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://your-website.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  name="linkedin"
                  value={editFormData.socialLinks.linkedin}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      socialLinks: {
                        ...editFormData.socialLinks,
                        linkedin: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://linkedin.com/in/"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Github
                </label>
                <input
                  type="url"
                  name="github"
                  value={editFormData.socialLinks.github}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      socialLinks: {
                        ...editFormData.socialLinks,
                        github: e.target.value,
                      },
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://github.com/"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  YouTube
                </label>
                <input
                  type="url"
                  name="youtube"
                  value={editFormData.socialLinks.youtube}
                  onChange={(e) =>
                    setEditFormData({
                      ...editFormData,
                      socialLinks: {
                        ...editFormData.socialLinks,
                        youtube: e.target.value,
                      },
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
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => updateProfileMutation(editFormData)}
              disabled={isPending}
              className={`px-4 py-2 bg-blue-600 text-white ${
                isPending ? "opacity-50 cursor-not-allowed" : ""
              } rounded-lg hover:bg-blue-700 transition-colors`}
            >
              {isPending ? (
                <div className="flex justify-center items-center">
                  <Loader />
                </div>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileModal;
