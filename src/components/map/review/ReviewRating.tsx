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
    <div className="flex justify-center align-center">
      <div>
        <label>리뷰</label>
      </div>

      <div className="flex w-[208px] h-[40px] ">
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
                className="hidden w-[40px] h-[40px] text-3xl"
              />
              <div
                className="w-[40px] h-[40px] text-3xl text-yellow-400 cursor-pointer"
                // onMouseEnter={() => setHoverRating(currentRating)}
                onMouseLeave={() => setHoverRating(null)}
                onClick={() => setRating(currentRating)}
              >
                {currentRating <= (hoverRating || rating) ? "⭐" : "⛤"}
              </div>
            </label>
          );
        })}

        <p className="hidden">별점: {rating}점</p>
      </div>
    </div>
  );
};

export default ReviewRating;
