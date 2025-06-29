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
        subtitle: "",
        description: "",
        cover: "",
        category: "",
        level: "",
        courseLanguage: "",
        courseObjectives: [""],
        courseRequirements: [""],
        courseWhoIsThisFor: [""],
        courseWelcomeMessage: "",
        price: 0,
        previousPrice: 0,
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
      partialize: (state) => ({
        curriculumFormData: state.curriculumFormData,
        courseLandingFormData: state.courseLandingFormData,
        activeTab: state.activeTab,
      }),
    }
  )
);

export default useDashboardStore;
