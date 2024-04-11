"use client";

import ReviewRating from "@/components/map/review/ReviewRating";
import React, { useState } from "react";

const ReviewFormPage = () => {
  const [review, setReview] = useState(""); // 리뷰 내용 관리
  const [rating, setRating] = useState<number | null>(null); // 별점 관리

  // 리뷰 제출
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ReviewRating rating={rating} setRating={setRating} />

        <div>
          <label htmlFor="review">리뷰 내용</label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
        </div>
        <div>
          <label>사진 첨부[선택]</label>
        </div>
        <div>
          <label>검사받았던 검진을 선택해 주세요</label>
        </div>
        <button type="submit">리뷰 제출</button>
      </form>
    </div>
  );
};

export default ReviewFormPage;
