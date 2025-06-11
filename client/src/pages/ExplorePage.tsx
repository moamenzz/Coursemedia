import CourseGrid from "@/components/CourseGrid";
import ErrorThrower from "@/components/ErrorThrower";
import Hero from "@/components/HeroComponent";
import Loader from "@/components/Loader";
import { getExplorePageCourses } from "@/lib/apiRoutes";
import formatCategory from "@/utils/formatCategory";
import { useQuery } from "@tanstack/react-query";

const ExplorePage = () => {
  const {
    data: explorePageCourses,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["explore-page-courses"],
    queryFn: getExplorePageCourses,
  });

  return isLoading ? (
    <div className="flex justify-center items-center min-h-screen">
      <Loader />
    </div>
  ) : isError ? (
    <div className="flex justify-center items-center">
      <ErrorThrower isError={isError} error={error as { message: string }} />
    </div>
  ) : (
    <div className="container mx-auto px-4 py-16 md:py-10">
      <Hero />
      {/* Business banner */}
      <div className="bg-black text-white w-full py-3 px-4 mt-12 flex justify-between items-center">
        <p className="text-sm">
          Training 5 or more people? Get your team access to Coursemedia's top
          22,000+ courses
        </p>
        <div className="flex gap-2">
          <button className="bg-white text-black px-3 py-1 text-sm">
            Get Coursemedia Business
          </button>
          <button className="border border-white px-3 py-1 text-sm">
            Dismiss
          </button>
        </div>
      </div>

      <h1 className="text-3xl font-bold mt-8">What to learn next</h1>

      {Object.entries(explorePageCourses?.[0] || {}).map(
        ([category, courses]) => {
          // Only render course grid if courses array is not empty
          if (courses.length > 0) {
            return (
              <div className="space-y-3">
                <CourseGrid
                  key={category}
                  title={`Top courses in ${formatCategory(category)}`}
                  courses={courses}
                />
              </div>
            );
          }
          return null;
        }
      )}
    </div>
  );
};

export default ExplorePage;
