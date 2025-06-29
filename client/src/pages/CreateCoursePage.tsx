import CourseCurriculum from "@/components/CourseCurriculum";
import CourseLanding from "@/components/CourseLanding";
import ErrorThrower from "@/components/ErrorThrower";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { createCourse, editCourse, getCourse } from "@/lib/apiRoutes";
import useDashboardStore from "@/stores/useDashboardStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CreateCoursePage = () => {
  // This here is going to be true if we are editing a course. Meaning that we accessed this CreateCoursePage through the route: /dashboard/create-course/:courseId
  const { courseId } = useParams();
  const {
    courseLandingFormData,
    curriculumFormData,
    setCourseLandingFormData,
    setCurriculumFormData,
  } = useDashboardStore();
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
      setCourseLandingFormData({
        title: "",
        subtitle: "",
        description: "",
        cover: "",
        category: "",
        level: "",
        courseLanguage: "",
        courseWelcomeMessage: "",
        courseObjectives: [""],
        courseRequirements: [""],
        courseWhoIsThisFor: [""],
        price: 0,
      });
      setCurriculumFormData([]);
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("An error has occurred, please try again later.");
    },
  });

  const {
    mutate: editCourseMutation,
    isError: editCourseIsError,
    error: editCourseError,
    isPending: editCourseIsPending,
  } = useMutation({
    mutationFn: editCourse,
    onSuccess: () => {
      toast.success("Course edited successfully");
      setCourseLandingFormData({
        title: "",
        subtitle: "",
        description: "",
        cover: "",
        category: "",
        level: "",
        courseLanguage: "",
        courseWelcomeMessage: "",
        courseObjectives: [""],
        courseRequirements: [""],
        courseWhoIsThisFor: [""],
        price: 0,
      });
      setCurriculumFormData([]);
      navigate("/dashboard");
    },
    onError: () => {
      toast.error("An error has occurred, please try again later.");
    },
  });

  useEffect(() => {
    console.log("Course Landing Form Data", courseLandingFormData);
    console.log("Course Curriculum", curriculumFormData);
  }, [courseLandingFormData, curriculumFormData]);

  const isFormValid =
    // Form Data
    courseLandingFormData?.title &&
    courseLandingFormData?.subtitle &&
    courseLandingFormData?.description &&
    courseLandingFormData?.cover &&
    courseLandingFormData?.category &&
    courseLandingFormData?.level &&
    courseLandingFormData?.courseLanguage &&
    courseLandingFormData?.courseWelcomeMessage &&
    courseLandingFormData?.courseObjectives &&
    courseLandingFormData?.courseRequirements &&
    courseLandingFormData?.courseWhoIsThisFor &&
    courseLandingFormData?.price &&
    // Curriculum
    curriculumFormData &&
    curriculumFormData.length > 0;

  console.log("Is Form Valid?", Boolean(isFormValid));

  const disabled = !isFormValid || createCourseIsPending || editCourseIsPending;

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
      !courseLandingFormData.subtitle ||
      courseLandingFormData.subtitle.length < 1
    ) {
      toast.error("Course subtitle is required");
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
    if (!courseLandingFormData.courseObjectives) {
      toast.error("Course objectives is required");
      return false;
    }
    if (!courseLandingFormData.courseRequirements) {
      toast.error("Course requirements is required");
      return false;
    }
    if (!courseLandingFormData.courseWhoIsThisFor) {
      toast.error("Course who is this for is required");
      return false;
    }
    if (!courseLandingFormData.price) {
      toast.error("Course price is required");
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
      language: courseLandingFormData.courseLanguage,
      objectives: courseLandingFormData.courseObjectives,
      requirements: courseLandingFormData.courseRequirements,
      whoIsThisFor: courseLandingFormData.courseWhoIsThisFor,
      welcomeMessage: courseLandingFormData.courseWelcomeMessage,
      price: Number(courseLandingFormData.price),
      previousPrice: Number(courseLandingFormData.previousPrice),
      curriculum: curriculumFormData,
    };

    console.log("Submitted Course", courseData);

    if (editingCourse) {
      editCourseMutation({ data: courseData, courseId: courseId ?? "" });
    } else {
      createCourseMutation(courseData);
    }
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
          {editingCourse ? "Edit course" : "Create a new course"}
        </h1>
        <Button
          disabled={createCourseIsPending || disabled}
          onClick={handleSubmit}
          className="text-sm tracking-wider font-bold px-8 cursor-pointer"
        >
          {createCourseIsPending || editCourseIsPending ? (
            <div className="flex justify-center">
              <Loader />
            </div>
          ) : (
            "Submit"
          )}
        </Button>

        {createCourseIsError ||
          (editCourseIsError && (
            <ErrorThrower
              isError={createCourseIsError || editCourseIsError}
              error={createCourseError || editCourseError}
            />
          ))}
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
                <CourseLanding editingCourse={editingCourse} />
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateCoursePage;
