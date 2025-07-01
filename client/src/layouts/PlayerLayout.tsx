import ErrorThrower from "@/components/ErrorThrower";
import Loader from "@/components/Loader";
import PlayerNavbar from "@/components/PlayerNavbar";
import { getPlayerCourse } from "@/lib/apiRoutes";
import PlayerPage from "@/pages/PlayerPage";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useCourseStore from "@/stores/useCourseStore";
import { useEffect } from "react";

const PlayerLayout = () => {
  const { courseId } = useParams();
  const { setCourse } = useCourseStore();

  const {
    data: fetchedCourse,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["player-course", courseId],
    queryFn: () => getPlayerCourse(courseId as string),
    enabled: !!courseId, // Or Boolean (courseId)
  });

  useEffect(() => {
    if (fetchedCourse) {
      setCourse(fetchedCourse);
      console.log("Course Set Successfully", fetchedCourse);
    }
  }, [fetchedCourse, setCourse]);

  if (!courseId) {
    return (
      <div className="min-h-screen flex flex-col items-center">
        <h1>The course you are looking for is not found.</h1>
        <p>If this issue persists, please contact support.</p>
      </div>
    );
  }

  return isLoading ? (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader />
    </div>
  ) : isError ? (
    <div>
      {typeof error === "object" &&
      error !== null &&
      "status" in error &&
      (error as any).status === 403 &&
      error.message ===
        "You've not purchased this course. If you think this is a mistake, please contact support." ? (
        <div>
          <Dialog>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Unauthorized.</DialogTitle>
                <DialogDescription>
                  You've not purchased this course. Access unauthorized. If you
                  think this might be a mistake, please contact support.
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      ) : (
        <ErrorThrower isError={isError} error={error as { message: string }} />
      )}
    </div>
  ) : (
    <div className="flex flex-col min-h-screen">
      {/* Player Navbar */}
      <div className="w-full">
        <PlayerNavbar />
      </div>

      {/* Main Content */}
      <div>
        <PlayerPage />
      </div>
    </div>
  );
};

export default PlayerLayout;
