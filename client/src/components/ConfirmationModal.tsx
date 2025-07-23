import { FC } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CourseResponse, deleteCourse } from "@/lib/apiRoutes";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Loader from "./Loader";

interface ConfirmationModalProps {
  isOpen: boolean;
  setIsOpen: (setIsOpen: boolean) => void;
  course?: CourseResponse;
  type: "Deletion" | "Navigation";
  navigationUrl?: string;
}

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  isOpen,
  setIsOpen,
  course,
  type,
  navigationUrl,
}) => {
  const { mutate: handleDelete, isPending } = useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      toast.success("Successfully deleted course");
      setIsOpen(false);
    },
    onError: () => {
      toast.error("Failed to delete course, please try again.");
    },
  });

  const deleteCourseCommand = () => handleDelete(course?._id as string);
  return (
    <div className="p-8 space-y-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between">
          <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="sm:max-w-[425px]">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-red-600">
                  {type === "Deletion"
                    ? "Delete Course"
                    : "You are getting redirected"}
                </AlertDialogTitle>
                <AlertDialogDescription className="text-gray-600">
                  {type === "Deletion" ? (
                    `Are you sure you want to delete "{${course?.title}}"? This action
                  cannot be undone. All course content, student enrollments, and
                  progress data will be permanently removed. Revenue will not be
                  affected.`
                  ) : (
                    <>
                      You are getting redirected to an external link.
                      <br />
                      Please make sure that the URL is safe and appropriate
                      before proceeding.
                      <br />
                      <br />
                      You are getting redirected to:
                      <br />
                      <span className="break-all">{navigationUrl}</span>
                    </>
                  )}
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel
                  onClick={() => setIsOpen(false)}
                  className="mr-2"
                >
                  Cancel
                </AlertDialogCancel>

                <AlertDialogAction
                  onClick={() => {
                    if (type === "Deletion") {
                      deleteCourseCommand();
                    } else if (navigationUrl) {
                      window.open(navigationUrl as string);
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700 focus:ring-red-600"
                >
                  {isPending ? (
                    <div className="flex justify-center items-center">
                      <Loader />
                    </div>
                  ) : type === "Deletion" ? (
                    "Delete Course"
                  ) : (
                    "Proceed"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
