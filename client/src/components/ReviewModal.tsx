import { FC, useEffect, useState } from "react";
import { Star, Send, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "react-toastify";
import { CourseResponse, getUserReview, submitReview } from "@/lib/apiRoutes";
import Loader from "./Loader";
import { useMutation, useQuery } from "@tanstack/react-query";

interface StarRatingProps {
  rating: number;
  onRatingChange: (newRating: number) => void;
  interactive?: boolean;
  size?: string;
}

const StarRating = ({
  rating,
  onRatingChange,
  interactive = true,
  size = "w-8 h-8",
}: StarRatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          className={`${size} transition-all duration-200 ${
            interactive ? "hover:scale-110 cursor-pointer" : "cursor-default"
          }`}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
          onClick={() => interactive && onRatingChange(star)}
        >
          <Star
            className={`w-full h-full transition-colors duration-200 ${
              star <= (hoverRating || rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-gray-300"
            }`}
          />
        </button>
      ))}
    </div>
  );
};

interface ReviewModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  course: CourseResponse;
}

const ReviewModal: FC<ReviewModalProps> = ({ isOpen, setIsOpen, course }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  // TODO: Check if the user has already reviewed the course, if he has, then make him edit his review, if not, then make him leave a review
  const { data: userReview, isLoading: isReviewLoading } = useQuery({
    queryKey: ["userReview", course._id],
    queryFn: () => getUserReview(course._id as string),
    enabled: isOpen,
  });

  console.log(userReview);

  useEffect(() => {
    if (userReview) {
      setRating(userReview.rating);
      setReview(userReview.comment);
    }
  }, [userReview]);

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setIsExpanded(true);
  };

  const { mutate: submitReviewMutation, isPending: isSubmitting } = useMutation(
    {
      mutationFn: () => submitReview(course._id as string, rating, review),
      onSuccess: () => {
        toast.success("Review submitted successfully");
        setRating(0);
        setReview("");
        setIsExpanded(false);
        setIsOpen(false);
        console.log("Review submitted:", { rating, review });
      },
      onError: () => {
        toast.error("Failed to submit review, please try again later.");
      },
    }
  );

  const handleClose = () => {
    setIsOpen(false);
    setRating(0);
    setReview("");
    setIsExpanded(false);
  };

  const getRatingText = (rating: number) => {
    const texts: Record<number, string> = {
      1: "Terrible",
      2: "Bad",
      3: "Average",
      4: "Good",
      5: "Beyond Expectations",
    };
    return texts[rating] || "";
  };

  return isReviewLoading ? (
    <div className="flex justify-center items-center">
      <Loader />
    </div>
  ) : (
    <div className="p-8">
      {/* Review Modal */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="overflow-hidden">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Review Course</DialogTitle>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </DialogHeader>

          <div className="px-6 py-4">
            {/* Rating Section */}
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                How did you like this course?
              </h3>
              <p className="text-gray-600 mb-4">Click on the starts to rate</p>

              {userReview ? (
                <div className="flex justify-center mb-2">
                  <StarRating
                    rating={userReview.rating}
                    onRatingChange={handleRatingChange}
                    size="w-10 h-10"
                  />
                </div>
              ) : (
                <div className="flex justify-center mb-2">
                  <StarRating
                    rating={rating}
                    onRatingChange={handleRatingChange}
                    size="w-10 h-10"
                  />
                </div>
              )}

              {rating > 0 && (
                <p className="text-sm font-medium text-gray-700">
                  {getRatingText(rating)}
                </p>
              )}
            </div>

            {/* Expanded Review Section */}
            <div
              className={`transition-all duration-300 ease-in-out ${
                isExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tell everyone about your experience
                  </label>
                  <textarea
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    placeholder="What did you like about this course? What could be improved?"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    rows={4}
                    maxLength={500}
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {review?.length}/500 Letters
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => submitReviewMutation()}
                    disabled={rating === 0 || isSubmitting}
                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <Loader />
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Submit Review
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ReviewModal;
