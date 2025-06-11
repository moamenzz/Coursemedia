import { FormDataProps } from "@/components/CourseLanding";
import { LectureResponse } from "@/lib/apiRoutes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface DashboardStore {
  curriculumFormData: LectureResponse[];
  courseLandingFormData: FormDataProps;
  activeTab: "dashboard" | "courses" | "logout";
  setCurriculumFormData: (curriculumFormData: LectureResponse[]) => void;
  setCourseLandingFormData: (courseLandingFormData: FormDataProps) => void;
  setActiveTab: (activeTab: DashboardStore["activeTab"]) => void;
}
const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      curriculumFormData: [],
      courseLandingFormData: {
        title: "",
        description: "",
        cover: "",
        category: "",
        level: "",
        courseLanguage: "",
        courseObjectives: "",
        courseRequirements: "",
        courseWelcomeMessage: "",
        price: 0,
      },
      activeTab: "dashboard",
      setCurriculumFormData: (curriculumFormData) =>
        set({ curriculumFormData }),
      setCourseLandingFormData: (courseLandingFormData) =>
        set({ courseLandingFormData }),
      setActiveTab: (activeTab) => set({ activeTab }),
    }),
    {
      name: "dashboard-storage",
    }
  )
);

export default useDashboardStore;
