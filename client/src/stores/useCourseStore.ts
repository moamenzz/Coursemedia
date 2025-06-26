import { CourseResponse } from "@/lib/apiRoutes";
import { create } from "zustand";

interface UseCourseStoreProps {
  course: CourseResponse | undefined;
  setCourse(course: CourseResponse | undefined): void;
}

const useCourseStore = create<UseCourseStoreProps>((set) => ({
  course: undefined,
  setCourse: (course: CourseResponse | undefined) => set({ course }),
}));

export default useCourseStore;
