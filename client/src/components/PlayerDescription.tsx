import React, { useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Star,
  Globe,
  Clock,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import useCourseStore from "@/stores/useCourseStore";
import { formatDuration } from "@/utils/formatDuration";

interface PlayerDescriptionProps {
  title?: string;
  rating?: number;
  totalRatings?: number;
  totalStudents?: number;
  totalHours?: number;
  lastUpdated?: string;
  language?: string;
  skillLevel?: string;
  lectures?: number;
  videoHours?: number;
  languages?: string;
  captions?: boolean;
  certificateAvailable?: boolean;
  availableOn?: string[];
  description?: string;
}

const PlayerDescription: React.FC<PlayerDescriptionProps> = ({
  rating = 4.1,
  totalRatings = 359,
  totalHours = 3,
  lastUpdated = "May 2025",
  videoHours = 3,
  captions = true,
}) => {
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { course } = useCourseStore();

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalf) {
      stars.push(
        <Star
          key="half"
          className="w-4 h-4 fill-yellow-400 text-yellow-400 opacity-50"
        />
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }

    return stars;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  const truncateDescription = (text: string, maxLength: number = 300) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + "...";
  };

  return (
    <div className="flex flex-col mx-auto p-6 bg-white">
      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        {course?.title}
      </h1>

      <div>
        {/* Rating and Stats */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-yellow-600 font-semibold text-lg">
              {course?.rating}
            </span>
            <div className="flex items-center gap-1">{renderStars(rating)}</div>
            <span className="text-gray-600 text-sm">
              {formatNumber(totalRatings)} ratings
            </span>
          </div>

          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <Users className="w-4 h-4" />
            <span>{course?.enrollees?.length} Students</span>
          </div>

          <div className="flex items-center gap-1 text-gray-600 text-sm">
            <Clock className="w-4 h-4" />
            <span>{formatDuration(course?.curriculum || [])}</span>
          </div>
        </div>

        {/* Last Updated and Language */}
        <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>
              {course?.updatedAt
                ? new Date(course.updatedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                  })
                : lastUpdated}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <Globe className="w-4 h-4" />
            <span>
              {course?.courseLanguage.charAt(0).toUpperCase() +
                (course?.courseLanguage?.slice(1) || "")}
            </span>
            <span className="ml-1 px-2 py-1 bg-gray-100 rounded text-xs">
              {course?.courseLanguage.charAt(0).toUpperCase() +
                (course?.courseLanguage?.slice(1) || "")}
              [Auto]
            </span>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <Separator />
      </div>

      {/* Course Details Grid */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* By the numbers */}
        <div>
          <h1 className="font-semibold text-xl text-gray-900 mb-4">
            By the numbers
          </h1>
          <div className="space-y-2 text-sm">
            <div>
              Skill level:{" "}
              <span className="font-medium">
                {course?.level.charAt(0).toUpperCase() +
                  (course?.level?.slice(1) || "")}
              </span>
            </div>
            <div>
              Students:{" "}
              <span className="font-medium">{course?.enrollees?.length}</span>
            </div>
            <div>
              Languages:{" "}
              <span className="font-medium">
                {" "}
                {course?.courseLanguage.charAt(0).toUpperCase() +
                  (course?.courseLanguage?.slice(1) || "")}
              </span>
            </div>
            <div>
              Captions:{" "}
              <span className="font-medium">{captions ? "Yes" : "No"}</span>
            </div>
          </div>
        </div>

        {/* Course Info */}
        <div>
          <div className="space-y-2 text-sm mb-6">
            <div>
              Lectures:{" "}
              <span className="font-medium">{course?.curriculum.length}</span>
            </div>
            <div>
              Video:{" "}
              <span className="font-medium">
                {formatDuration(course?.curriculum || [])}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <Separator />
      </div>

      {/* Description */}
      <div>
        <h1 className="font-semibold text-xl text-gray-900 mb-4">
          Description
        </h1>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {isDescriptionExpanded
              ? course?.description
              : truncateDescription(course?.description as string)}
          </p>

          {course?.description && course?.description?.length > 300 && (
            <button
              onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
              className="inline-flex items-center gap-1 mt-3 text-purple-600 hover:text-purple-700 font-medium text-sm"
            >
              {isDescriptionExpanded ? (
                <>
                  Show less <ChevronUp className="w-4 h-4" />
                </>
              ) : (
                <>
                  Show more <ChevronDown className="w-4 h-4" />
                </>
              )}
            </button>
          )}
        </div>

        {/* Course Objectives */}
        {course?.courseObjectives && course?.courseObjectives?.length > 0 && (
          <div className="mt-8">
            <h1 className="font-semibold text-xl text-gray-900 mb-4">
              What you'll learn
            </h1>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              {course.courseObjectives.map((obj: string, idx: number) => (
                <li key={idx}>{obj}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Course Requirements */}
        {course?.courseRequirements &&
          course?.courseRequirements?.length > 0 && (
            <div className="mt-8">
              <h1 className="font-semibold text-xl text-gray-900 mb-4">
                Requirements
              </h1>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {course.courseRequirements.map((req: string, idx: number) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          )}

        {/* Course Who Is This For */}
        {course?.courseWhoIsThisFor &&
          course?.courseWhoIsThisFor?.length > 0 && (
            <div className="mt-8">
              <h1 className="font-semibold text-xl text-gray-900 mb-4">
                Who is this course for?
              </h1>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {course.courseWhoIsThisFor.map((req: string, idx: number) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          )}
      </div>
    </div>
  );
};

export default PlayerDescription;
