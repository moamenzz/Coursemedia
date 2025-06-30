import { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { StarRating } from "./ReviewsDesplay";
import { Star, X } from "lucide-react";
import ReviewCard from "./ReviewCard";
import { ReviewResponse } from "@/lib/apiRoutes";
import { formatCourseRating } from "@/utils/formatCourseRating";

interface AllReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: ReviewResponse[];
}

const AllReviewsModal = ({
  isOpen,
  onClose,
  reviews,
}: AllReviewsModalProps) => {
  const [sortBy, setSortBy] = useState("helpful");
  const [filterRating, setFilterRating] = useState(0);

  const filteredAndSortedReviews = reviews
    .filter((review) => filterRating === 0 || review.rating === filterRating)
    .sort((a, b) => {
      if (sortBy === "helpful") return (b.helpful ?? 0) - (a.helpful ?? 0);
      if (sortBy === "newest")
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      if (sortBy === "oldest")
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage:
      (reviews.filter((r) => r.rating === rating).length / reviews.length) *
      100,
  }));

  const averageRating = formatCourseRating(reviews);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="w-full max-w-3xl md:max-w-4xl p-0 overflow-hidden max-h-[90vh] h-[90vh] flex flex-col"
        style={{ maxHeight: "90vh" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200">
          <div>
            <DialogTitle className="text-xl md:text-2xl font-bold text-gray-900">
              All Ratings
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              {reviews.length} Overall Ratings
            </DialogDescription>
          </div>
          <DialogClose asChild>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 p-2"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </DialogClose>
        </div>

        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar with Rating Overview */}
          <div className="w-full md:w-80 p-4 md:p-6 border-b md:border-b-0 md:border-r border-gray-200 bg-gray-50 flex-shrink-0">
            <div className="mb-6">
              <div className="flex flex-col items-center space-y-1 text-center mb-4">
                <div className="text-3xl md:text-4xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </div>
                <StarRating rating={Math.round(averageRating)} size="w-6 h-6" />
                <p className="text-gray-600 mt-2">{reviews.length} Ratings</p>
              </div>

              {/* Rating Distribution */}
              <div className="space-y-2">
                {ratingDistribution.map(({ rating, count, percentage }) => (
                  <div key={rating} className="flex items-center gap-2">
                    <span className="text-sm font-medium w-6">{rating}</span>
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-8">{count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort by
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="helpful">Most Helpful</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="rating">Highest Ratings</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Rating
                </label>
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={0}>All Ratings</option>
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="space-y-4">
              {filteredAndSortedReviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AllReviewsModal;
