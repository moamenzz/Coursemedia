import { CourseResponse } from "@/lib/apiRoutes";

export const formatDuration = (
  courseCurriculum: CourseResponse["curriculum"]
) => {
  const totalMinutes =
    courseCurriculum
      .map((lec) => lec.duration)
      .reduce((a, b) => (a as number) + (b as number), 0) || 0;

  if (totalMinutes < 60) {
    return `${totalMinutes} minute${totalMinutes === 1 ? "" : "s"} Total`;
  }
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (minutes === 0) {
    return `${hours} hour${hours === 1 ? "" : "s"} Total`;
  }
  return `${hours} hour${hours === 1 ? "" : "s"}, ${minutes} minute${
    minutes === 1 ? "" : "s"
  } Total`;
};
