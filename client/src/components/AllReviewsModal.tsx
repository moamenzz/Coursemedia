import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { StarRating } from "./ReviewsDesplay";
import { Star, X } from "lucide-react";
import ReviewCard from "./ReviewCard";

interface AllReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: {
    userAvatar: string;
    userName: string;
    reviewText: string;
    rating: number;
    date: string;
    isTopReview: boolean;
    helpful: number;
  }[];
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
      if (sortBy === "helpful") return b.helpful - a.helpful;
      if (sortBy === "newest")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === "oldest")
        return new Date(a.date).getTime() - new Date(b.date).getTime();
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

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="flex flex-col h-full max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Alle Bewertungen
            </h2>
            <p className="text-gray-600">
              {reviews.length} Bewertungen insgesamt
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar with Rating Overview */}
          <div className="w-80 p-6 border-r border-gray-200 bg-gray-50">
            <div className="mb-6">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-gray-900">
                  {averageRating.toFixed(1)}
                </div>
                <StarRating rating={Math.round(averageRating)} size="w-6 h-6" />
                <p className="text-gray-600 mt-2">
                  {reviews.length} Bewertungen
                </p>
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
                  Sortieren nach
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="helpful">Hilfreichste</option>
                  <option value="newest">Neueste</option>
                  <option value="oldest">Älteste</option>
                  <option value="rating">Höchste Bewertung</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nach Sternen filtern
                </label>
                <select
                  value={filterRating}
                  onChange={(e) => setFilterRating(Number(e.target.value))}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={0}>Alle Bewertungen</option>
                  <option value={5}>5 Sterne</option>
                  <option value={4}>4 Sterne</option>
                  <option value={3}>3 Sterne</option>
                  <option value={2}>2 Sterne</option>
                  <option value={1}>1 Stern</option>
                </select>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              {filteredAndSortedReviews.map((review) => (
                <ReviewCard key={review.date} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AllReviewsModal;
