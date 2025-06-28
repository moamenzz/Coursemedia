// formatCourseRating.ts

import { ReviewResponse } from "@/lib/apiRoutes";

/**
 * Calculates the average rating for a course based on its reviews.
 * @param reviews Array of review objects, each with a `rating` property (number from 1 to 5).
 * @returns The average rating rounded to one decimal place, or 0 if there are no reviews.
 */
export function formatCourseRating(reviews: ReviewResponse[]): number {
  if (!reviews?.length) return 0;

  const reviewsRating = reviews.map((review) => review.rating);

  const total = reviewsRating.reduce((sum, review) => sum + review, 0);
  const average = total / reviewsRating.length;
  return Math.round(average * 10) / 10; // rounded to 1 decimal place
}
