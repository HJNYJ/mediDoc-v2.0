"use client";

import React, { useState } from "react";

const ReviewRating = ({
  rating,
  setRating
}: {
  rating: number | null;
  setRating: (rating: number | null) => void;
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              checked={currentRating === rating}
              onChange={() => setRating(currentRating)}
              className="hidden"
            />
            <div
              className="text-2xl cursor-pointer"
              onMouseEnter={() => setHoverRating(currentRating)}
              onMouseLeave={() => setHoverRating(null)}
              onClick={() => setRating(currentRating)}
            >
              {currentRating <= (hoverRating || rating) ? "⭐" : "☆"}
            </div>
          </label>
        );
      })}
      <p>별점: {rating}점</p>
    </div>
  );
};

export default ReviewRating;
