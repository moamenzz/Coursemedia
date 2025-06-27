import { CourseResponse, LectureResponse } from "@/lib/apiRoutes";
import { create } from "zustand";

interface UseCourseStoreProps {
  course: CourseResponse | undefined;
  activeLecture: LectureResponse | undefined;
  played: number;
  setCourse(course: CourseResponse | undefined): void;
  setActiveLecture(lecture: LectureResponse | undefined): void;
  setPlayed: (played: number) => void;
}

const useCourseStore = create<UseCourseStoreProps>((set) => ({
  course: undefined,
  activeLecture: undefined,
  played: 0,
  setActiveLecture: (lecture: LectureResponse | undefined) =>
    set({ activeLecture: lecture }),
  setCourse: (course: CourseResponse | undefined) => set({ course }),
  setPlayed: (played: number) => set({ played }),
}));

export default useCourseStore;
