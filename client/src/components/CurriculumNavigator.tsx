import React, { useState } from "react";
import {
  Play,
  CheckSquare,
  Square,
  Clock,
  X,
  Bot,
  FileText,
} from "lucide-react";

interface LessonItem {
  id: string;
  title: string;
  duration: string;
  isCompleted: boolean;
  type: "video" | "assignment" | "quiz";
}

interface CurriculumNavigateProps {
  lessons?: LessonItem[];
  currentLessonId?: string;
  onLessonSelect?: (lessonId: string) => void;
  onClose?: () => void;
  isOpen?: boolean;
}

const CurriculumNavigate: React.FC<CurriculumNavigateProps> = ({
  lessons = [
    {
      id: "1",
      title: "Statements",
      duration: "6min",
      isCompleted: false,
      type: "video",
    },
    {
      id: "2",
      title: "Syntax",
      duration: "6min",
      isCompleted: false,
      type: "video",
    },
    {
      id: "3",
      title: "Comments",
      duration: "6min",
      isCompleted: false,
      type: "video",
    },
    {
      id: "4",
      title: "Operators",
      duration: "4min",
      isCompleted: false,
      type: "video",
    },
    {
      id: "5",
      title: "Arithmetic",
      duration: "6min",
      isCompleted: false,
      type: "video",
    },
    {
      id: "6",
      title: "Assignment",
      duration: "7min",
      isCompleted: false,
      type: "assignment",
    },
    {
      id: "7",
      title: "Strings",
      duration: "9min",
      isCompleted: false,
      type: "video",
    },
    {
      id: "8",
      title: "String Methods",
      duration: "13min",
      isCompleted: false,
      type: "video",
    },
    {
      id: "9",
      title: "String Search",
      duration: "7min",
      isCompleted: false,
      type: "video",
    },
    {
      id: "10",
      title: "String Templates",
      duration: "9min",
      isCompleted: false,
      type: "video",
    },
    {
      id: "11",
      title: "Random",
      duration: "8min",
      isCompleted: false,
      type: "video",
    },
    {
      id: "12",
      title: "Booleans",
      duration: "6min",
      isCompleted: false,
      type: "video",
    },
    {
      id: "13",
      title: "Switch",
      duration: "9min",
      isCompleted: false,
      type: "video",
    },
    {
      id: "14",
      title: "Break",
      duration: "5min",
      isCompleted: false,
      type: "video",
    },
  ],
  currentLessonId = "1",
  onLessonSelect = () => {},
  onClose = () => {},
  isOpen = true,
}) => {
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(
    new Set()
  );

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
  };

  const handleLessonClick = (lessonId: string) => {
    onLessonSelect(lessonId);
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

  if (!isOpen) return null;

  return (
    <div className="w-full bg-white border-l border-gray-200 h-full flex flex-col shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="font-semibold text-gray-900">Course content</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
          >
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Lessons List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {lessons.map((lesson, index) => {
            const isCompleted = completedLessons.has(lesson.id);
            const isCurrent = lesson.id === currentLessonId;

            return (
              <div
                key={lesson.id}
                className={`
                  flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                  ${
                    isCurrent
                      ? "bg-blue-50 border border-blue-200"
                      : "hover:bg-gray-50"
                  }
                  ${isCompleted ? "opacity-75" : ""}
                `}
                onClick={() => handleLessonClick(lesson.id)}
              >
                {/* Completion Checkbox */}
                <button
                  className="flex-shrink-0"
                  onClick={(e) => toggleLessonCompletion(lesson.id, e)}
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
                        {lesson.title}
                      </h4>

                      <div className="flex items-center gap-2 mt-1">
                        {getIcon(lesson.type)}
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{lesson.duration}</span>
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
            {completedLessons.size} of {lessons.length} completed
          </span>
          <span className="font-medium text-gray-900">
            {Math.round((completedLessons.size / lessons.length) * 100)}%
          </span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${(completedLessons.size / lessons.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default CurriculumNavigate;
