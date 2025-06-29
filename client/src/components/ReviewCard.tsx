import { MoreHorizontal, ThumbsUp } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import { FC, useState } from "react";
import { StarRating } from "./ReviewsDesplay";

interface ReviewCardProps {
  review: {
    userAvatar: string;
    userName: string;
    reviewText: string;
    rating: number;
    date: string;
    isTopReview: boolean;
    helpful: number;
  };
  compact?: boolean;
}

const ReviewCard: FC<ReviewCardProps> = ({ review, compact = false }) => {
  const [isHelpful, setIsHelpful] = useState(false);
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);

  const toggleHelpful = () => {
    setIsHelpful(!isHelpful);
    setHelpfulCount((prev) => (isHelpful ? prev - 1 : prev + 1));
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 ${
        compact ? "mb-3" : "mb-4"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* User Avatar */}
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
          {review.userAvatar}
        </div>

        {/* Review Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h4 className="font-medium text-gray-900">{review.userName}</h4>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={review.rating} />
                <span className="text-sm text-gray-500">
                  {formatDate(review.date)}
                </span>
                {review.isTopReview && (
                  <span className="bg-orange-100 text-orange-800 text-xs px-2 py-0.5 rounded-full font-medium">
                    Top Review
                  </span>
                )}
              </div>
            </div>

            {!compact && (
              <button className="text-gray-400 hover:text-gray-600 p-1">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Review Text */}
          <p className="text-gray-700 text-sm leading-relaxed mb-3">
            {review.reviewText}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleHelpful}
              className={`flex items-center gap-2 text-sm transition-colors ${
                isHelpful
                  ? "text-blue-600 hover:text-blue-700"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <ThumbsUp
                className={`w-4 h-4 ${isHelpful ? "fill-current" : ""}`}
              />
              Hilfreich ({helpfulCount})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
