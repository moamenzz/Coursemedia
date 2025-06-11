import React, { useState } from "react";
import { Search, Heart, ShoppingCart, Bell, Menu, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { categories } from "@/types/Categories";
import useMyLearningStore from "@/stores/useMyLearningStore";
import { Separator } from "./ui/separator";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/lib/apiRoutes";

interface NavbarProps {
  username?: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState("3h 51m 37s");
  const [searchParams, setSearchParams] = useState<string>("");
  const navigate = useNavigate();
  const { setActiveTab } = useMyLearningStore();

  const handleSearch = () => {
    if (!searchParams) {
      toast.error("Please enter something to search");
      return;
    }
    navigate("/explore/courses?search=" + searchParams);
  };

  const { mutate: logoutMutation, error } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate("/");
    },
    onError: () => {
      toast.error(error?.message || "Failed to log out");
    },
  });

  return (
    <div className="w-full">
      {/* Sale banner */}
      <div className="w-full h-[3rem] bg-yellow-100 py-2 relative">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center text-center">
          <span className="font-semibold">New courses added regularly</span>
          <span className="mx-2">|</span>
          <span>
            Refresh your skills in the latest topics. Courses start at $99.
          </span>
          <div className="ml-2 font-semibold">Ends in {timeLeft}.</div>
        </div>
        <button className="absolute right-4 top-2 text-gray-600 hover:text-gray-800">
          <X size={20} />
        </button>
      </div>

      {/* Main navbar */}
      <div className="border-b border-gray-200">
        <div className="container mx-auto py-3 px-4">
          <div className="flex items-center justify-between">
            {/* Logo and left section */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <Link to="/explore" className="text-xl font-bold text-gray-800">
                  COURSEMEDIA
                </Link>
              </div>
              <div className="block md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-700"
                >
                  <Menu size={24} />
                </button>
              </div>
            </div>

            {/* Search bar - hide on mobile */}
            <div className="hidden md:flex items-center flex-1 max-w-xl mx-4">
              <div className="relative w-full">
                <Search
                  className="absolute left-3 top-2.5 h-4 w-4 text-gray-400 cursor-pointer scale-100 hover:scale-120 transition-transform duration-200"
                  onClick={handleSearch}
                />
                <Input
                  type="text"
                  placeholder="Search for anything"
                  value={searchParams}
                  onChange={(e) => setSearchParams(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full"
                />
              </div>
            </div>

            {/* Right section */}
            <div className="flex items-center space-x-4">
              <div className="hidden md:block">
                <Link
                  className="text-sm hover:text-blue-600"
                  onClick={() => toast.info("Coming soon!")}
                >
                  Coursemedia Business
                </Link>
              </div>
              <div className="hidden md:block">
                <Link to="/dashboard" className="text-sm hover:text-blue-600">
                  Instructor Dashboard
                </Link>
              </div>
              <div className="hidden md:block">
                <Link to="/my-learning" className="text-sm hover:text-blue-600">
                  My Learning
                </Link>
              </div>

              <Link
                to="/my-learning"
                onClick={() => {
                  setActiveTab("wishlist");
                }}
                className="hidden md:block text-gray-700 cursor-pointer hover:text-red-500 transition-colors duration-200"
              >
                <Heart size={24} />
              </Link>
              <Link
                to="/cart"
                className="hidden md:block text-gray-700 cursor-pointer hover:text-purple-500 transition-colors duration-200"
              >
                <ShoppingCart size={24} />
              </Link>
              <Link
                to="/notifications"
                className="hidden md:block text-gray-700 cursor-pointer hover:text-yellow-500 transition-colors duration-200"
              >
                <Bell size={24} />
              </Link>
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-md dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="my-learning" className="justify-between">
                      My learning
                    </Link>
                  </li>
                  <li>
                    <Link to="/cart">My cart</Link>
                  </li>
                  <li>
                    <Link
                      to="/my-learning"
                      onClick={() => {
                        setActiveTab("wishlist");
                      }}
                    >
                      Wishlist
                    </Link>
                  </li>
                  <Separator />
                  <li>
                    <Link to="/notifications">Notifications</Link>
                  </li>
                  <li>
                    <Link to="/messages">Messages</Link>
                  </li>
                  <Separator />
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <Separator />
                  <li>
                    <a
                      className="text-red-500"
                      onClick={() => logoutMutation()}
                    >
                      Logout
                    </a>
                  </li>
                  <Separator />
                  <li>
                    <a onClick={() => toast.info("Coming soon!")}>
                      Coursemedia Business
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories navbar */}
      <div className="hidden md:block border-b border-gray-200">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto justify-center space-x-6 py-3 px-4">
            {categories.map((category, index) => (
              <Link
                to={`/explore/courses/?category=${category.value}`}
                key={index}
                className="text-sm whitespace-nowrap hover:text-blue-600"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="p-4">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl font-bold text-gray-800">COURSEMEDIA</h1>
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Mobile search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search for anything"
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-full"
                />
              </div>
            </div>

            {/* Mobile links */}
            <div className="space-y-4">
              <a href="#" className="block py-2 hover:text-blue-600">
                Coursemedia Business
              </a>
              <a href="#" className="block py-2 hover:text-blue-600">
                Instructor
              </a>
              <a href="#" className="block py-2 hover:text-blue-600">
                My Learning
              </a>
              <a href="#" className="block py-2 hover:text-blue-600">
                Wishlist
              </a>
              <a href="#" className="block py-2 hover:text-blue-600">
                Cart
              </a>
              <a href="#" className="block py-2 hover:text-blue-600">
                Notifications
              </a>

              <div className="pt-4 mt-4 border-t">
                <h3 className="font-bold mb-2">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <Link
                      to={`/explore/courses/?category=${category.value}`}
                      key={index}
                      className="block cursor-pointer py-1 hover:text-blue-600"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
