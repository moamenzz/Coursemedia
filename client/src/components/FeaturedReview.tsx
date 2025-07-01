import { ReviewResponse } from "@/lib/apiRoutes";
import { featuredReviewData } from "@/types/MockReviewsData";
import { formatDate } from "@/utils/formatDate";
import { Star, ThumbsDown, ThumbsUp } from "lucide-react";
import { FC, useState } from "react";
import PlaceholderAvatar from "./PlaceholderAvatar";

interface StarRatingProps {
  rating: number;
  size?: string;
}

const StarRating: FC<StarRatingProps> = ({ rating, size = "w-4 h-4" }) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${size} ${
            star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

interface FeaturedReviewProps {
  featuredReview: ReviewResponse;
}

const FeaturedReview: FC<FeaturedReviewProps> = ({ featuredReview }) => {
  const [review] = useState(featuredReviewData);
  const [helpfulCount, setHelpfulCount] = useState(review.helpful);
  const [notHelpfulCount, setNotHelpfulCount] = useState(review.notHelpful);
  const [isHelpfulClicked, setIsHelpfulClicked] = useState(false);
  const [isNotHelpfulClicked, setIsNotHelpfulClicked] = useState(false);

  const handleHelpfulClick = () => {
    if (isNotHelpfulClicked) {
      setIsNotHelpfulClicked(false);
      setNotHelpfulCount((prev) => prev - 1);
    }

    if (isHelpfulClicked) {
      setHelpfulCount((prev) => prev - 1);
    } else {
      setHelpfulCount((prev) => prev + 1);
    }

    setIsHelpfulClicked(!isHelpfulClicked);
  };

  const handleNotHelpfulClick = () => {
    if (isHelpfulClicked) {
      setIsHelpfulClicked(false);
      setHelpfulCount((prev) => prev - 1);
    }

    if (isNotHelpfulClicked) {
      setNotHelpfulCount((prev) => prev - 1);
    } else {
      setNotHelpfulCount((prev) => prev + 1);
    }

    setIsNotHelpfulClicked(!isNotHelpfulClicked);
  };

  const handleReport = () => {
    // Hier würdest du die Report-Funktionalität implementieren
    console.log("Review reported");
    alert("Review wurde gemeldet");
  };

  return (
    <div className="">
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Featured review
          </h2>

          {/* User Info */}
          <div className="flex items-start gap-4">
            {/* User Avatar */}
            <div className=" rounded-full overflow-hidden flex-shrink-0">
              {featuredReview?.user?.avatar ? (
                <img
                  src={featuredReview.user.avatar}
                  alt={featuredReview.user.username}
                  className="w-16 h-16 object-cover"
                  onError={(e) => {
                    // Fallback zu Initialen falls Bild nicht lädt
                    (e.target as HTMLImageElement).style.display = "none";
                    if (
                      (e.target as HTMLImageElement).nextSibling instanceof
                      HTMLElement
                    ) {
                      (
                        (e.target as HTMLImageElement)
                          .nextSibling as HTMLElement
                      ).style.display = "flex";
                    }
                  }}
                />
              ) : (
                <PlaceholderAvatar
                  w={14}
                  h={14}
                  username={featuredReview?.user?.username}
                />
              )}

              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full hidden items-center justify-center text-white font-bold text-lg">
                {review.userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
            </div>

            {/* User Details */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg mb-1">
                {featuredReview?.user?.username}
              </h3>
              <div className="text-sm text-gray-600 space-y-1">
                <div>{review.coursesCount} courses</div>
                <div>{review.reviewsCount} reviews</div>
              </div>
            </div>
          </div>
        </div>

        {/* Rating and Time */}
        <div className="flex items-center gap-3 mb-4">
          <StarRating rating={featuredReview?.rating} size="w-5 h-5" />
          <span className="text-sm text-gray-600">
            {formatDate(featuredReview?.createdAt)}
          </span>
        </div>

        {/* Review Text */}
        <div className="mb-6">
          <p className="text-gray-800 leading-relaxed">
            {featuredReview.comment}
          </p>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm text-gray-600 mr-3">
                Was this review helpful?
              </span>

              <button
                onClick={handleHelpfulClick}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                  isHelpfulClicked
                    ? "border-blue-500 bg-blue-50 text-blue-600"
                    : "border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
                title="Helpful"
              >
                <ThumbsUp className="w-4 h-4" />
              </button>

              <button
                onClick={handleNotHelpfulClick}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ml-2 ${
                  isNotHelpfulClicked
                    ? "border-red-500 bg-red-50 text-red-600"
                    : "border-gray-300 text-gray-600 hover:border-gray-400"
                }`}
                title="Not helpful"
              >
                <ThumbsDown className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={handleReport}
              className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors duration-200"
            >
              Report
            </button>
          </div>

          {/* Vote Count Display */}
          {(helpfulCount > 0 || notHelpfulCount > 0) && (
            <div className="mt-3 text-xs text-gray-500">
              {helpfulCount > 0 && (
                <span className="mr-4">
                  {helpfulCount}{" "}
                  {helpfulCount === 1 ? "person found" : "people found"} this
                  helpful
                </span>
              )}
              {notHelpfulCount > 0 && (
                <span>
                  {notHelpfulCount}{" "}
                  {notHelpfulCount === 1 ? "person found" : "people found"} this
                  not helpful
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturedReview;
