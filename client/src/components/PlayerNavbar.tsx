import {
  ChevronLeft,
  Ellipsis,
  Star,
  Users,
  Globe,
  Clock,
  Award,
  Share2,
  Heart,
  Flag,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Separator } from "./ui/separator";
import { useNavigate } from "react-router-dom";
import UserDropdown from "./UserDropdown";
import useCourseStore from "@/stores/useCourseStore";

const PlayerNavbar = () => {
  const { course } = useCourseStore();
  const navigate = useNavigate();
  const formattedReviews = new Intl.NumberFormat("en-US").format(
    course?.rating as number
  );

  return (
    <nav className="bg-gray-900 text-white border-b border-gray-700">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center space-x-2">
            {/* Back Button */}
            <button
              onClick={() => navigate("/my-learning")}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-2">
              <h1 className="font-bold text-lg">Coursemedia</h1>
            </div>

            <Separator orientation="vertical" className="h-6 bg-gray-700" />

            {/* Course Title */}
            <div className="hidden lg:block">
              <h1 className="text-sm font-medium text-gray-200 max-w-md truncate">
                {course?.title}
              </h1>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center">
            <div className="flex items-center space-x-2 mr-3">
              {/* Course Rating */}
              <div className="hidden sm:flex items-center space-x-1 text-sm">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-yellow-400 font-medium">
                  {course?.rating || 0.0}
                </span>
                <span className="text-gray-400">({formattedReviews || 0})</span>
              </div>

              {/* Students Count */}
              <div className="hidden lg:flex items-center space-x-1 text-sm text-gray-400">
                <Users className="w-4 h-4" />
                <span>{course?.enrollees?.length || 0} students</span>
              </div>
            </div>

            {/* Share Button */}
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Share2 className="w-5 h-5" />
            </button>

            {/* Like Button */}
            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
              <Heart className="w-5 h-5" />
            </button>

            {/* More Options Dropdown */}
            <div className="relative">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                    <Ellipsis className="w-7 h-7" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Globe className="mr-2 h-4 w-4" />
                      <span>Change language</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Playback speed</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Award className="mr-2 h-4 w-4" />
                      <span>Certificate</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Flag className="mr-2 h-4 w-4" />
                    <span>Report</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* User Avatar */}
            <div className="ml-3">
              <UserDropdown textColor="text-black" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PlayerNavbar;
