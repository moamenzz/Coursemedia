import React, { useEffect, useState } from "react";
import { Play, CheckSquare, Square, Clock, X, FileText } from "lucide-react";
import useCourseStore from "@/stores/useCourseStore";
import { LectureResponse } from "@/lib/apiRoutes";

const CurriculumNavigate = () => {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );

  const { course, activeLecture, setActiveLecture, setPlayed } =
    useCourseStore();
  const lectures = course?.curriculum;

  const toggleLessonCompletion = (
    lessonId: string,
    event: React.MouseEvent
  ) => {
    event.stopPropagation();
    const newCompleted = new Set(completedLessons);
    if (newCompleted.has(lessonId)) {
      newCompleted.delete(lessonId);
    } else {
      newCompleted.add(lessonId);
    }
    setCompletedLessons(newCompleted);
    localStorage.setItem(
      `completed_lessons_${course?._id}`,
      JSON.stringify([...newCompleted])
    );
  };

  const handleLessonClick = (lecture: LectureResponse) => {
    setActiveLecture(lecture);
    localStorage.setItem(
      `last_lecture_${course?._id}`,
      JSON.stringify(lecture._id)
    );
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "assignment":
        return <FileText className="w-4 h-4 text-blue-600" />;
      case "quiz":
        return <FileText className="w-4 h-4 text-green-600" />;
      default:
        return <Play className="w-4 h-4 text-gray-600" />;
    }
  };

  const getCompletedLessonsKey = (courseId: string) =>
    `completed_lessons_${courseId}`;
  const getLastLectureKey = (courseId: string) => `last_lecture_${courseId}`;
  const getVideoPositionKey = (lectureUrl: string) =>
    `video_position_${lectureUrl}`;

  useEffect(() => {
    if (!course?._id) return;

    try {
      const savedCompleted = localStorage.getItem(
        getCompletedLessonsKey(course._id)
      );

      if (savedCompleted) {
        setCompletedLessons(new Set(JSON.parse(savedCompleted)));
      }
    } catch (error) {
      console.error("Error loading completed lessons:", error);
    }
  }, [course?._id]);

  useEffect(() => {
    if (!course?._id || !lectures?.length) return;

    try {
      const savedLastLecture = localStorage.getItem(
        getLastLectureKey(course._id)
      );

      if (savedLastLecture && !activeLecture) {
        const lastLectureId = JSON.parse(savedLastLecture);
        const lastLecture = lectures?.find((l) => l._id === lastLectureId);

        if (lastLecture) {
          setActiveLecture(lastLecture);
        }
      }
    } catch (error) {
      console.error("Error loading last lecture:", error);
    }
  }, [course?._id, lectures, activeLecture, setActiveLecture]);

  useEffect(() => {
    if (!activeLecture || !activeLecture.url) return;

    try {
      const savedPosition = localStorage.getItem(
        getVideoPositionKey(activeLecture.url)
      );
      console.log(savedPosition);

      if (savedPosition) {
        setPlayed(JSON.parse(savedPosition));
      }
    } catch (error) {
      console.error("Error loading lecture position:", error);
    }
  }, [activeLecture, activeLecture?.url]);

  return (
    <div className="w-full bg-white border-l border-gray-200 h-full flex flex-col shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900">Course content</h3>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-200 rounded transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Lessons List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {lectures &&
            lectures.map((lecture, index) => {
              const isCompleted = completedLessons.has(lecture?._id as string);
              const isCurrent = lecture._id === activeLecture?._id;

              return (
                <div
                  key={lecture?._id}
                  className={`
                  flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                  ${
                    isCurrent
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-gray-50"
                  }
                  ${isCompleted ? "opacity-75" : ""}
                `}
                  onClick={() => handleLessonClick(lecture)}
                >
                  {/* Completion Checkbox */}
                  <button
                    className="flex-shrink-0"
                    onClick={(e) =>
                      toggleLessonCompletion(lecture?._id as string, e)
                    }
                  >
                    {isCompleted ? (
                      <CheckSquare className="w-5 h-5 text-green-600" />
                    ) : (
                      <Square className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                    )}
                  </button>

                  {/* Lesson Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <span className="text-sm font-medium text-gray-700 flex-shrink-0">
                        {index + 1}.
                      </span>
                      <div className="flex-1 min-w-0">
                        <h4
                          className={`
                        text-sm font-medium truncate
                        ${isCurrent ? "text-blue-700" : "text-gray-900"}
                        ${isCompleted ? "line-through text-gray-500" : ""}
                      `}
                        >
                          {lecture?.title}
                        </h4>

                        <div className="flex items-center gap-2 mt-1">
                          {getIcon(lecture?.type as string)}
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{lecture?.duration}min</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Current Lesson Indicator */}
                  {isCurrent && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0"></div>
                  )}
                </div>
              );
            })}
        </div>
      </div>

      {/* Progress Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {completedLessons.size} of {lectures?.length} completed
          </span>
          <span className="font-medium text-gray-900">
            {Math.round(
              (completedLessons.size / (lectures?.length as number)) * 100
            )}
            %
          </span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${
                (completedLessons.size / (lectures?.length as number)) * 100
              }%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumNavigate;
