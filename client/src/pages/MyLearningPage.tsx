import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";
import MyLearningCard from "@/components/MyLearningCard";
import useMyLearningStore from "@/stores/useMyLearningStore";
import { useQuery } from "@tanstack/react-query";
import { getMyCourses, getWishlist } from "@/lib/apiRoutes";
import Loader from "@/components/Loader";
import ErrorThrower from "@/components/ErrorThrower";

const MyLearningPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [instructorFilter, setInstructorFilter] = useState("");

  const { activeTab, setActiveTab } = useMyLearningStore();

  const handleReset = () => {
    setCategoryFilter("all");
    setInstructorFilter("all");
    setSearchQuery("");
  };

  const {
    data: myCourses = [],
    isLoading: isMyCoursesLoading,
    isError: isMyCoursesError,
    error: myCoursesError,
  } = useQuery({
    queryKey: ["my-courses"],
    queryFn: getMyCourses,
    enabled: activeTab === "my-courses",
  });

  const {
    data: wishlists = [],
    isLoading: isWishlistLoading,
    isError: isWishlistError,
    error: wishlistError,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: getWishlist,
    enabled: activeTab === "wishlist",
  });

  const courses = activeTab === "my-courses" ? myCourses : wishlists;
  const isLoading =
    activeTab === "my-courses" ? isMyCoursesLoading : isWishlistLoading;
  const isError =
    activeTab === "my-courses" ? isMyCoursesError : isWishlistError;
  const error = activeTab === "my-courses" ? myCoursesError : wishlistError;

  // Filter courses based on search query and selected filters
  const filteredCourses = courses?.filter((item) => {
    // Filter by search query
    if (
      searchQuery &&
      !item.course.title?.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    // Filter by category
    if (
      categoryFilter &&
      categoryFilter !== "all" &&
      item.course.category !== categoryFilter
    ) {
      return false;
    }

    // Filter by instructor
    if (
      instructorFilter &&
      instructorFilter !== "all" &&
      !item.course.instructor.user.username.includes(instructorFilter)
    ) {
      return false;
    }

    return true;
  });

  // Find unique categories for filter
  const categories = [...new Set(courses?.map((item) => item.course.category))];

  // Find unique instructors for filter
  const instructors = [
    ...new Set(courses?.map((item) => item.course.instructor.user.username)),
  ];

  return isLoading ? (
    <div className="min-h-screen flex items-center justify-center">
      <Loader />
    </div>
  ) : isError ? (
    <ErrorThrower isError={isError} error={error as { message: string }} />
  ) : (
    <div className="min-h-screen bg-gray-50">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab as any}
        className="w-full"
      >
        <div className="bg-gray-900 text-white py-6 px-18">
          <h1 className="text-4xl font-serif font-light mb-6">My learning</h1>
          <TabsList className="bg-transparent border-b border-gray-700 w-full justify-start space-x-8 rounded-none h-auto pb-0">
            <TabsTrigger
              value="my-courses"
              className="text-gray-300 cursor-pointer data-[state=active]:text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none bg-transparent h-auto pb-2 px-0"
            >
              My courses
            </TabsTrigger>
            <TabsTrigger
              value="wishlist"
              className="text-gray-300 cursor-pointer data-[state=active]:text-gray-700 data-[state=active]:border-b-2 data-[state=active]:border-white rounded-none bg-transparent h-auto pb-2 px-0"
            >
              Wishlist
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="container mx-auto">
          {myCourses?.length > 0 ? (
            <TabsContent value="my-courses" className="mt-0 px-0">
              {/* Filter and search area */}
              <div className="pt-8 pb-4 px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Sort by</p>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-56 border-purple-200 focus:ring-purple-500">
                        <SelectValue placeholder="Newest" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="oldest">Oldest</SelectItem>
                        <SelectItem value="title-asc">Title: A-Z</SelectItem>
                        <SelectItem value="title-desc">Title: Z-A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="mt-4 sm:mt-0">
                    <p className="text-sm text-gray-500 mb-1">Filter by</p>
                    <div className="flex flex-wrap gap-2">
                      <Select
                        value={categoryFilter}
                        onValueChange={setCategoryFilter}
                      >
                        <SelectTrigger className="w-40 border-purple-200 focus:ring-purple-500">
                          <SelectValue placeholder="Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select
                        value={instructorFilter}
                        onValueChange={setInstructorFilter}
                      >
                        <SelectTrigger className="w-40 border-purple-200 focus:ring-purple-500">
                          <SelectValue placeholder="Instructor" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Instructors</SelectItem>
                          {instructors.map((instructor) => (
                            <SelectItem key={instructor} value={instructor}>
                              {instructor.length > 20
                                ? `${instructor.substring(0, 20)}...`
                                : instructor}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button
                        variant="default"
                        className="text-white hover:text-purple-700"
                        onClick={handleReset}
                      >
                        Reset
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="relative w-full md:w-auto">
                  <Input
                    type="text"
                    placeholder="Search my courses"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border-purple-200 focus:ring-purple-500 w-full md:w-64"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Courses grid */}
              <div className="px-8 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredCourses?.map((item) => (
                    <MyLearningCard
                      course={item.course}
                      key={item.course._id}
                    />
                  ))}
                </div>

                {filteredCourses?.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      No courses found matching your filters.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 text-gray-700"
                      onClick={handleReset}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          ) : (
            <TabsContent value="my-courses" className="mt-0 px-0">
              <div className="p-8 text-center">
                <h2 className="text-2xl font-medium mb-2">No Courses Found</h2>
                <p className="text-gray-500">
                  You have not enrolled in any courses yet.
                </p>
                <p className="text-gray-500">
                  If you think this is an error, please contact{" "}
                  <span className="text-blue-500 underline">Support</span>
                </p>
              </div>
            </TabsContent>
          )}

          {wishlists && wishlists.length > 0 ? (
            <TabsContent value="wishlist" className="mt-0 px-0">
              <div className="pt-8 pb-4 px-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4"></div>

                <div className="relative w-full md:w-auto">
                  <Input
                    type="text"
                    placeholder="Search my courses"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 border-purple-200 focus:ring-purple-500 w-full md:w-64"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Courses grid */}
              <div className="px-8 py-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredCourses?.map((item) => (
                    <MyLearningCard
                      course={item.course}
                      key={item.course._id}
                    />
                  ))}
                </div>

                {filteredCourses?.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">
                      No courses found matching your filters.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 text-gray-700"
                      onClick={handleReset}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
          ) : (
            <div className="container mx-auto">
              <TabsContent value="wishlist" className="mt-0 px-0">
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-medium mb-2">Wishlist</h2>
                  <p className="text-gray-500">
                    Courses you've saved for later
                  </p>
                </div>
              </TabsContent>
            </div>
          )}
        </div>
      </Tabs>
    </div>
  );
};

export default MyLearningPage;
