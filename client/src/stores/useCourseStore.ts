import { CourseResponse, LectureResponse } from "@/lib/apiRoutes";
import { create } from "zustand";

interface UseCourseStoreProps {
  course: CourseResponse | undefined;
  activeLecture: LectureResponse | undefined;
  setCourse(course: CourseResponse | undefined): void;
  setActiveLecture(lecture: LectureResponse | undefined): void;
}

const useCourseStore = create<UseCourseStoreProps>((set) => ({
  course: undefined,
  activeLecture: undefined,
  setActiveLecture: (lecture: LectureResponse | undefined) =>
    set({ activeLecture: lecture }),
  setCourse: (course: CourseResponse | undefined) => set({ course }),
}));

export default useCourseStore;
