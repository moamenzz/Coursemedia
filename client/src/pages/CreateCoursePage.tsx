import CourseCurriculum from "@/components/CourseCurriculum";
import CourseLanding from "@/components/CourseLanding";
import ErrorThrower from "@/components/ErrorThrower";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createCourse, getCourse } from "@/lib/apiRoutes";
import useDashboardStore from "@/stores/useDashboardStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateCoursePage = () => {
  // This here is going to be true if we are editing a course. Meaning that we accessed this CreateCoursePage through the route: /dashboard/create-course/:courseId
  const { courseId } = useParams();
  const { courseLandingFormData, curriculumFormData } = useDashboardStore();
  const navigate = useNavigate();
  const editingCourseId = courseId ? courseId : "";

  const {
    data: editingCourse,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["course"],
    queryFn: () => getCourse(editingCourseId),
    enabled: !!editingCourseId,
  });

  const {
    mutate: createCourseMutation,
    isError: createCourseIsError,
    error: createCourseError,
    isPending: createCourseIsPending,
  } = useMutation({
    mutationFn: createCourse,
    onSuccess: () => {
      toast.success("Course created successfully");
      navigate("/dashboard");
    },
  });

  const isFormValid =
    courseLandingFormData?.title &&
    courseLandingFormData?.description &&
    courseLandingFormData?.cover &&
    courseLandingFormData?.category &&
    courseLandingFormData?.level &&
    courseLandingFormData?.courseLanguage &&
    curriculumFormData &&
    curriculumFormData.length > 0;

  const disabled = !isFormValid || createCourseIsPending;

  const formDataValidation = () => {
    // Validate Landing Page Data
    if (
      !courseLandingFormData.title ||
      courseLandingFormData.title.length < 1
    ) {
      toast.error("Course title is required");
      return false;
    }
    if (
      !courseLandingFormData.description ||
      courseLandingFormData.description.length < 1
    ) {
      toast.error("Course description is required");
      return false;
    }
    if (!courseLandingFormData.cover) {
      toast.error("Course cover image is required");
      return false;
    }
    if (!courseLandingFormData.category) {
      toast.error("Course category is required");
      return false;
    }
    if (!courseLandingFormData.level) {
      toast.error("Course level is required");
      return false;
    }
    if (!courseLandingFormData.courseLanguage) {
      toast.error("Course language is required");
      return false;
    }

    // Validate Curriculum Data
    if (!curriculumFormData || curriculumFormData.length === 0) {
      toast.error("At least one lecture is required");
      return false;
    }

    const hasInvalidLectures = curriculumFormData.some(
      (lecture) => !lecture.title || !lecture.url
    );
    if (hasInvalidLectures) {
      toast.error("All lectures must have a title and video");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!formDataValidation()) return;

    const courseData = {
      ...courseLandingFormData,
      curriculum: curriculumFormData,
    };

    createCourseMutation(courseData);
  };

  return isLoading ? (
    <div className="flex items-center justify-center min-h-screen">
      <Loader />
    </div>
  ) : isError ? (
    <div className="flex items-center justify-center min-h-screen">
      <ErrorThrower isError={isError} error={error} />
    </div>
  ) : (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold mb-5">
          {editingCourseId ? "Edit course" : "Create a new course"}
        </h1>
        <Button
          disabled={createCourseIsPending || disabled}
          onClick={handleSubmit}
          className="text-sm tracking-wider font-bold px-8 cursor-pointer"
        >
          Submit
        </Button>
        {createCourseIsError && (
          <ErrorThrower
            isError={createCourseIsError}
            error={createCourseError}
          />
        )}
      </div>
      <Card>
        <CardContent>
          <div className="container mx-auto p-4">
            <Tabs defaultValue="curriculum" className="space-y-4">
              <TabsList>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="course-landing-page">
                  Course Landing Page
                </TabsTrigger>
              </TabsList>
              <TabsContent value="curriculum">
                <CourseCurriculum editingCourse={editingCourse} />
              </TabsContent>
              <TabsContent value="course-landing-page">
                <CourseLanding />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCoursePage;
