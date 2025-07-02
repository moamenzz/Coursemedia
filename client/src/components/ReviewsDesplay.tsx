import { ChevronDown, Star } from "lucide-react";
import React, { FC, useState } from "react";
import ReviewCard from "./ReviewCard";
import AllReviewsModal from "./AllReviewsModal";
import { ReviewResponse } from "@/lib/apiRoutes";
import { formatCourseRating } from "@/utils/formatCourseRating";

interface StarRatingProps {
  rating: number;
  size?: string;
}

export const StarRating: FC<StarRatingProps> = ({
  rating,
  size = "w-4 h-4",
}) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} ${
            star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};
interface ReviewsDisplayProps {
  reviews: ReviewResponse[];
}

const ReviewsDisplay: React.FC<ReviewsDisplayProps> = ({ reviews }) => {
  const [showAllModal, setShowAllModal] = useState(false);

  const topReviews = reviews.filter((review) => review.rating >= 4).slice(0, 3);
  const averageRating = formatCourseRating(reviews);

  return (
    <div className="mx-auto">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Ratings & Reviews
          </h2>
          <button
            onClick={() => setShowAllModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2"
          >
            Show All Reviews
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Rating Summary */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {averageRating.toFixed(1)}
              </div>
              <StarRating rating={Math.round(averageRating)} size="w-6 h-6" />
              <p className="text-gray-600 mt-2">Course Rating</p>
            </div>

            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {reviews.length}
                  </div>
                  <p className="text-gray-600">Ratings</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(
                      (reviews.filter((r) => r.rating >= 4).length /
                        reviews.length) *
                        100
                    )}
                    %
                  </div>
                  <p className="text-gray-600">Positive Reviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Reviews Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          Top Reviews
        </h3>

        <div className="space-y-4">
          {topReviews.map((review) => (
            <ReviewCard key={review._id} review={review} compact={true} />
          ))}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => setShowAllModal(true)}
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 mx-auto"
          >
            Show {reviews.length - topReviews.length} More Reviews
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* All Reviews Modal */}
      <AllReviewsModal
        isOpen={showAllModal}
        onClose={() => setShowAllModal(false)}
        reviews={reviews as ReviewResponse[]}
      />
    </div>
  );
};

export default ReviewsDisplay;
