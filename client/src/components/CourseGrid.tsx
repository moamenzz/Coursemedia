import React from "react";
import CourseCard from "./CourseCard";
import { CourseResponse } from "@/lib/apiRoutes";

interface CourseGridProps {
  title: string;
  courses: CourseResponse[];
}

const CourseGrid: React.FC<CourseGridProps> = ({ title, courses }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {courses.map((course) => (
          <CourseCard key={course._id} course={course} />
        ))}
      </div>
    </div>
  );
};

export default CourseGrid;
