"use client";

import type { Review, ReviewsProps } from "@/types";

const ReviewRecent = ({ selectedTab }: ReviewsProps) => {
  // 가짜 데이터라고 가정
  const reviews: Review[] = [
    {
      id: 1,
      user_id: "냠냠박사",
      rating: 3,
      content: "좋아요",
      created_at: "2024-04-10"
    },
    {
      id: 2,
      user_id: "쩝쩝박사",
      rating: 4,
      content: "만족합니다",
      created_at: "2024-04-09"
    }
  ];

  const filteredReviews =
    selectedTab === "starRating"
      ? reviews.sort((a, b) => b.rating - a.rating) // 별점 높은 순
      : reviews.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        ); // 최신순

  return (
    <div>
      <h3>{selectedTab === "starRating" ? "별점 높은 순" : "최신순"}</h3>
      <ul>
        {filteredReviews.map((review) => (
          <li key={review.id}>
            <p>{review.content}</p>
            <p>별점: {review.rating}</p>
            <p>날짜: {review.created_at}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewRecent;
